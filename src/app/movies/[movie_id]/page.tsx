import Image from 'next/image'
import { DetailedMovie } from "@/types/movies";
import { defaultLanguage, fetchWithAuth } from "@/utils/dataFetching";
import Link from 'next/link';

async function getData(movieId: number): Promise<DetailedMovie> {
  const movieDetailUrl = `${process.env.API_URL}/3/movie/${movieId}?language=${defaultLanguage}&append_to_response=credits`

  const movie = await fetchWithAuth<DetailedMovie>(movieDetailUrl);

  return movie
}

type MovieDetailProps = {
  params: {
    movie_id: string
  }
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const movieId = Number(params.movie_id)

  const movie = await getData(movieId)

  const releaseYear = movie.release_date.slice(0, 4)
  const genresString = movie.genres.map((genre) => genre.name).join(', ')
  const posterUrl = `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${movie.poster_path}`
  const director = movie.credits.crew.find((member) => member.job === 'Director');

  let credits = []
  if (director) {
    credits.push(director)
  }
  credits.push(...movie.credits.cast)
  credits = credits.slice(0, 5)

  return (
    <div>
      <h2 className="text-2xl mb-8">{movie.title} ({releaseYear}) - {genresString}</h2>

      <div className='flex justify-start mb-8'>
        <div className="w-[160px] h-[250px] relative mr-8 shrink-0">
          <Image
            src={posterUrl}
            alt={`${movie.title} movie poster`}
            fill
            unoptimized
            />
        </div>
        <div className='shrink'>
          <p>{movie.tagline}</p>
          <p className='max-w-[500px]'>Résumé du film: {movie.overview}</p>
          {movie.homepage ? <p><a className='text-blue-400' href={movie.homepage} target='_blank'>Lien vers le site du film</a></p> : null}
          <p><a className='text-blue-400' href={`https://www.imdb.com/title/${movie.imdb_id}`} target='_blank'>Lien vers la page IMDB du film</a></p>

          <p>Rating : {movie.vote_average.toFixed(2)} / 10</p>
        </div>
      </div>

      <h3 className="text-xl mb-4">Crédits</h3>
      <div className='flex gap-4'>
        {credits.map((credit) => {
          const profileImageUrl = credit.profile_path ? `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${credit.profile_path}` : null
          return (
            <Link key={credit.id} className='w-[160px] h-[220px] relative group' href={`/people/${credit.id}`}>
              {profileImageUrl ? (
                <div className="">
                  <Image
                    src={profileImageUrl}
                    alt={credit.name}
                    fill
                    unoptimized
                    />
                </div>
              ) : null}
              <div
                className={
                  `transition w-full h-full absolute bg-black bg-opacity-70 group-hover:opacity-100 duration-500 flex justify-center items-center ${!profileImageUrl ? 'opacity-100' : 'opacity-0'}`
                }
              >
                <span className='text-white text-lg text-center'>{credit.name}</span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}
