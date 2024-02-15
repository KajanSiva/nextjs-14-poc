import Image from 'next/image'
import { MovieListItem } from "@/types/movies"
import { DisplayMode } from '@/types/ui'
import Link from 'next/link'
import Rating from './Rating'
import { constructFullImageUrl } from '@/utils/MovieService'
import clsx from 'clsx'

type MovieCardProps = {
  movie: MovieListItem,
  displayMode: DisplayMode
}

export default function MovieCard({ movie, displayMode }: MovieCardProps) {
  const posterUrl = constructFullImageUrl(movie.poster_path)

  return (
    <Link
      href={`/movies/${movie.id}`}
      className={clsx(
        'border-gray-700 p-4',
        displayMode === 'grid' && 'rounded w-[300px] border-2',
        displayMode === 'list' && 'flex justify-start border-b-2',
      )}
    >
      <div className={clsx(
        'w-[160px] h-[250px] relative shrink-0',
        displayMode === 'grid' && 'mx-auto mb-4',
        displayMode === 'list' && 'mr-8',
      )}>
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