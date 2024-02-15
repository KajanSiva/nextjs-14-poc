import Image from 'next/image'
import Carousel from '@/components/Carousel';
import Rating from '@/components/Rating';
import { constructFullImageUrl, fetchMovie } from '@/utils/MovieService';
import { DetailedMovie } from '@/types/movies';

type MovieDetailProps = {
  params: {
    movie_id: string
  }
}

function prepareCreditsData(movie: DetailedMovie) {
  const director = movie.credits.crew.find((member) => member.job === 'Director');

  const credits = []
  if (director) {
    credits.push(director)
  }
  credits.push(...movie.credits.cast)

  const formattedCredits = credits.map((credit) => ({
    image: constructFullImageUrl(credit.profile_path),
    id: credit.id,
    content: credit.name,
  }))

  return formattedCredits
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const movieId = Number(params.movie_id)

  const movie = await fetchMovie(movieId)

  const releaseYear = movie.release_date.slice(0, 4)
  const genresString = movie.genres.map((genre) => genre.name).join(', ')
  const posterUrl = constructFullImageUrl(movie.poster_path)
  
  const credits = prepareCreditsData(movie)

  return (
    <div>
      <h2 className="text-2xl mb-8">{movie.title} ({releaseYear}) - {genresString}</h2>

      <div className='flex justify-start mb-8'>
        <div className="w-[160px] h-[250px] relative mr-8 shrink-0">
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
        <div className='shrink'>
          <p>{movie.tagline}</p>
          <p className='max-w-[500px]'>Résumé du film: {movie.overview}</p>
          {movie.homepage ? <p><a className='text-blue-400' href={movie.homepage} target='_blank'>Lien vers le site du film</a></p> : null}
          <p><a className='text-blue-400' href={`https://www.imdb.com/title/${movie.imdb_id}`} target='_blank'>Lien vers la page IMDB du film</a></p>

          <Rating voteAverage={movie.vote_average} voteCount={movie.vote_count} />
        </div>
      </div>

      <h3 className="text-xl mb-4">Crédits</h3>
      <Carousel data={credits} linkPath='/people/' />
    </div>
  );
}
