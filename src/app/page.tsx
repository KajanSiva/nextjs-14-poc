import MovieCard from "@/components/MovieCard"
import { PopularMoviesResult, Genre, MovieListItem, MovieGenresResult, RawMovieListItem } from "@/types/movies"

function addGenreDetailsToMovieResults(movies: RawMovieListItem[], genres: Genre[]): MovieListItem[] {
  const genreMap: { [key: number]: string } = genres.reduce((map: { [key: number]: string }, genre) => {
    map[genre.id] = genre.name
    return map
  }, {})
  
  return movies.map(movie => ({
    ...movie,
    genres: movie.genre_ids
      .map(id => ({ id, name: genreMap[id] || 'Unknown' }))
      .filter(genre => genre.name !== 'Unknown')
  }));
}

async function fetchWithAuth(url: string): Promise<any> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json()
}

async function getData() {
  const popularMoviesUrl = `${process.env.API_URL}/3/movie/popular?language=fr-FR&page=1`
  const genresUrl = `${process.env.API_URL}/3/genre/movie/list`

  const [moviesResult, genresResult]: [PopularMoviesResult, MovieGenresResult] = await Promise.all([
    fetchWithAuth(popularMoviesUrl),
    fetchWithAuth(genresUrl)
  ]);

  return addGenreDetailsToMovieResults(moviesResult.results, genresResult.genres)
}
export default async function Home() {
  const movies = await getData()

  return (
    <div>
      <h2>Les plus populaires</h2>
      <div>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
