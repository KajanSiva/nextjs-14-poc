import { MovieListItem } from "@/types/movies"
import MovieCard from "./MovieCard"
import { DisplayMode } from "@/types/ui"
import clsx from "clsx"

type MovieListProps = {
  movies: MovieListItem[],
  displayMode: DisplayMode
}

export default function MovieList({ movies, displayMode }: MovieListProps) {
  return (
    <>
      <div className={clsx(
        'flex',
        displayMode === 'grid' && 'my-6 flex-col md:flex-row md:flex-wrap md:gap-x-4 md:items-stretch gap-y-4 items-center',
        displayMode === 'list' && 'flex-col gap-4 mb-6',
      )}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} displayMode={displayMode} />
        ))}
      </div>
    </>
  )
}