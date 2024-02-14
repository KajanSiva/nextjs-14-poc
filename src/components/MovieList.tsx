import { MovieListItem } from "@/types/movies"
import MovieCard from "./MovieCard"
import { DisplayMode } from "@/types/ui"

type MovieListProps = {
  movies: MovieListItem[],
  displayMode: DisplayMode
}

export default function MovieList({ movies, displayMode }: MovieListProps) {
  const gridClasses = 'flex flex-wrap gap-4 justify-start mb-6'
  const listClasses = 'flex flex-col gap-4 mb-6'

  return (
    <>
      <div className={displayMode === 'grid' ? gridClasses : listClasses}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} displayMode={displayMode} />
        ))}
      </div>
    </>
  )
}