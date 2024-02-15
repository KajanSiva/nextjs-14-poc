import Image from 'next/image'
import { MovieListItem } from "@/types/movies"
import { DisplayMode } from '@/types/ui'
import Link from 'next/link'
import Rating from './Rating'

type MovieCardProps = {
  movie: MovieListItem,
  displayMode: DisplayMode
}

export default function MovieCard({ movie, displayMode }: MovieCardProps) {
  const posterUrl = movie.poster_path ? `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${movie.poster_path}` : null

  const gridDisplayModeClasses = {
    wrapper: 'border-gray-700 border-2 rounded w-[300px] p-4',
    image: 'w-[160px] h-[250px] relative mx-auto mb-4'
  }

  const listDisplayModeClasses = {
    wrapper: 'flex justify-start border-gray-700 border-b-2 rounded p-4',
    image: 'w-[160px] h-[250px] relative mr-8'
  }

  return (
    <Link href={`/movies/${movie.id}`} className={displayMode === 'grid' ? gridDisplayModeClasses.wrapper : listDisplayModeClasses.wrapper}>
      <div className={displayMode === 'grid' ? gridDisplayModeClasses.image : listDisplayModeClasses.image}>
        {posterUrl ?
          <Image
            src={posterUrl}
            alt={`${movie.title} movie poster`}
            fill
            style={{objectFit:"contain"}}
            unoptimized
          /> : null
        }
      </div>
      <div>
        <p className='text-lg'>{movie.title}</p>
        <div className='flex flex-wrap gap-1'>
          {movie.genres.map((genre) => (
            <span key={genre.id}>{genre.name}</span>
          ))}
        </div>
        <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
      </div>
    </Link>
  )
}