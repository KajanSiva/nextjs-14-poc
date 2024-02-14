import DisplaySwitch from "@/components/DisplaySwitch"
import MovieList from "@/components/MovieList"
import Pagination from "@/components/Pagination"
import { PopularMoviesRawResult, Genre, MovieListItem, MovieGenresResult, RawMovieListItem, PopularMoviesResult } from "@/types/movies"
import { DisplayMode } from "@/types/ui"

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

async function fetchWithAuth<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json()
}

async function getData(currentPage: number): Promise<PopularMoviesResult> {
  const popularMoviesUrl = `${process.env.API_URL}/3/discover/movie?include_adult=false&include_video=false&language=fr-FR&page=${currentPage}`
  const genresUrl = `${process.env.API_URL}/3/genre/movie/list`

  const [moviesResult, genresResult] = await Promise.all([
    fetchWithAuth<PopularMoviesRawResult>(popularMoviesUrl),
    fetchWithAuth<MovieGenresResult>(genresUrl)
  ]);

  return {
    page: moviesResult.page,
    totalPages: Math.min(moviesResult.total_pages, 500), // The API doesn't work with more than 500 pages.
    totalResults: moviesResult.total_results,
    results: addGenreDetailsToMovieResults(moviesResult.results, genresResult.genres)
  }
}

type HomeProps = {
  searchParams?: {
    page?: string,
    display?: DisplayMode
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams?.page) || 1
  const displayMode = searchParams?.display || 'grid'

  const { results: movies, totalPages } = await getData(currentPage)

  return (
    <div>
      <h2 className="text-2xl mb-8">Les plus populaires</h2>
      <div className="flex justify-end">
        <DisplaySwitch displayMode={displayMode} />
      </div>
      <MovieList movies={movies} displayMode={displayMode} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
