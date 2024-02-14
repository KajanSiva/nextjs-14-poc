import Image from 'next/image'
import { MovieListItem } from "@/types/movies"

type MovieCardProps = {
  movie: MovieListItem
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${movie.poster_path}`

  return (
    <div className='border-gray-700 border-2 rounded w-[300px] p-4'>
      <div className='w-[160px] h-[250px] relative mx-auto mb-4'>
        <Image
          src={posterUrl}
          alt={`${movie.title} movie poster`}
          fill
          unoptimized
        />
      </div>
      <p className='text-lg'>{movie.title}</p>
      <div className='flex flex-wrap gap-1'>
        {movie.genres.map((genre) => (
          <span key={genre.id}>{genre.name}</span>
        ))}
      </div>
      <p>Rating : {movie.vote_average.toFixed(2)}/10</p>
    </div>
  )
}