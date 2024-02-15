import { PopularMoviesRawResult, Genre, MovieListItem, MovieGenresResult, RawMovieListItem, PopularMoviesResult, DetailedMovie, DetailedPerson } from "@/types/movies"
import { SortCriteria } from "@/types/ui"

export function constructFullImageUrl(path: string | null) {
  return path ? `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${path}` : null
}

async function fetchWithAuth<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` }
  });
  if (!response.ok) throw new Error('Failed to fetch data');
  return response.json()
}

const defaultLanguage = 'fr-FR'

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

function formatSortCriteria(sortCriteria: SortCriteria) {
  switch(sortCriteria) {
    case 'popularity':
      return 'popularity.desc'
    case 'title':
      return 'title.asc'
  }
}

export async function fetchMoviesList(currentPage: number, sortCriteria: SortCriteria): Promise<PopularMoviesResult> {
  let sortBy = formatSortCriteria(sortCriteria);

  const popularMoviesUrl = `${process.env.API_URL}/3/discover/movie?include_adult=false&include_video=false&language=${defaultLanguage}&page=${currentPage}&sort_by=${sortBy}`
  const genresUrl = `${process.env.API_URL}/3/genre/movie/list?language=${defaultLanguage}`

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

export async function fetchMovie(movieId: number): Promise<DetailedMovie> {
  const movieDetailUrl = `${process.env.API_URL}/3/movie/${movieId}?language=${defaultLanguage}&append_to_response=credits`

  const movie = await fetchWithAuth<DetailedMovie>(movieDetailUrl);

  return movie
}

export async function fetchPerson(personId: number): Promise<DetailedPerson> {
  const personDetailUrl = `${process.env.API_URL}/3/person/${personId}?language=${defaultLanguage}&append_to_response=credits`

  const person = await fetchWithAuth<DetailedPerson>(personDetailUrl);

  return person
}
