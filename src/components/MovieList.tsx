import { MovieListItem } from "@/types/movies"
import MovieCard from "./MovieCard"

type MovieListProps = {
  movies: MovieListItem[]
}

export default function MovieList({ movies }: MovieListProps) {
  return (
    <>
      <div className="flex flex-wrap gap-4 justify-start mb-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  )
}