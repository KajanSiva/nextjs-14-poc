import DisplaySwitch from "@/components/DisplaySwitch"
import MovieList from "@/components/MovieList"
import Pagination from "@/components/Pagination"
import SortDropdown from "@/components/SortDropdown"
import { DisplayMode, SortCriteria } from "@/types/ui"
import { fetchMoviesList } from "@/utils/MovieService"

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

  const { results: movies, totalPages } = await fetchMoviesList(currentPage, sortCriteria)

  return (
    <div>
      <h2 className="text-2xl mb-8">Les plus populaires</h2>
      <div className="flex justify-end items-center gap-4">
        <SortDropdown sortCriteria={sortCriteria} />
        <DisplaySwitch displayMode={displayMode} />
      </div>
      <MovieList movies={movies} displayMode={displayMode} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
