import DisplaySwitch from "@/components/DisplaySwitch"
import MovieList from "@/components/MovieList"
import Pagination from "@/components/Pagination"
import SortDropdown from "@/components/SortDropdown"
import { PopularMoviesRawResult, Genre, MovieListItem, MovieGenresResult, RawMovieListItem, PopularMoviesResult } from "@/types/movies"
import { DisplayMode, SortCriteria } from "@/types/ui"
import { defaultLanguage, fetchWithAuth } from "@/utils/dataFetching"

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

async function getData(currentPage: number, sortCriteria: SortCriteria): Promise<PopularMoviesResult> {
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

type HomeProps = {
  searchParams?: {
    page?: string,
    display?: DisplayMode
    sortBy?: SortCriteria
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const currentPage = Number(searchParams?.page) || 1
  const displayMode = searchParams?.display || 'grid'
  const sortCriteria = searchParams?.sortBy || 'popularity'

  const { results: movies, totalPages } = await getData(currentPage, sortCriteria)

  return (
    <div>
      <h2 className="text-2xl mb-8">Les plus populaires</h2>
      <div className="flex justify-end">
        <SortDropdown sortCriteria={sortCriteria} />
        <DisplaySwitch displayMode={displayMode} />
      </div>
      <MovieList movies={movies} displayMode={displayMode} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
