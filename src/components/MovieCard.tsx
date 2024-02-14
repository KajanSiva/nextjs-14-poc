import Image from 'next/image'
import { MovieListItem } from "@/types/movies"

type MovieCardProps = {
  movie: MovieListItem
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${movie.poster_path}`

  return (
    <div>
      <div className='w-[160px] h-[250px] relative'>
        <Image
          src={posterUrl}
          alt={`${movie.title} movie poster`}
          fill
        />
      </div>
      <p>{movie.title}</p>
      <div>
        {movie.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
      <p>Rating : {movie.vote_average.toFixed(2)}/10</p>
    </div>
  )
}