import Image from 'next/image'
import { DetailedPerson, MovieParticipedAsCast, MovieParticipedAsCrew } from "@/types/movies";
import Carousel from '@/components/Carousel';
import { constructFullImageUrl, fetchPerson } from '@/utils/MovieService';

type PersonDetailProps = {
  params: {
    person_id: string
  }
}

// Some persons can be both in cast and crew of a movie
function deduplicatedCredits(credits: (MovieParticipedAsCast | MovieParticipedAsCrew)[]) {
  const uniqueIds: {
    [key: string]: boolean;
  } = {};

  const deduplicatedCredits = credits.filter(item => {
    if (!uniqueIds[item.id]) {
      uniqueIds[item.id] = true
      return true
    }
    return false
  });

  return deduplicatedCredits
}

function prepareCreditsData(person: DetailedPerson) {
  let credits = [...person.credits.cast, ...person.credits.crew]
  credits = deduplicatedCredits(credits)

  const formattedCredits = credits.map((credit) => ({
    image: constructFullImageUrl(credit.poster_path),
    id: credit.id,
    content: credit.title,
  }))

  return formattedCredits
}

export default async function PersonDetail({ params }: PersonDetailProps) {
  const personId = Number(params.person_id)

  const person = await fetchPerson(personId)

  const photoUrl = constructFullImageUrl(person.profile_path)

  const credits = prepareCreditsData(person)

  return (
    <div>
      <h2 className="text-2xl mb-8">{person.name}</h2>

      <div className='flex justify-start mb-8'>
        <div className="w-[160px] h-[250px] relative mr-8 shrink-0">
          {photoUrl ?
            <Image
              src={photoUrl}
              alt={person.name}
              fill
              style={{objectFit:"contain"}}
              unoptimized
            /> : null
          }
        </div>
        <div className='shrink'>
          <p>{person.birthday} - {person.place_of_birth}</p>
          {person.biography ?
            <p className='max-w-[500px]'>Biographie: {person.biography}</p> :
            null
          }
          <p><a className='text-blue-400' href={`https://www.imdb.com/name/${person.imdb_id}`} target='_blank'>Lien vers la page IMDB de la personne</a></p>
        </div>
      </div>

      <h3 className="text-xl mb-4">Connu pour</h3>
      <Carousel data={credits} linkPath='/movies/' />
    </div>
  );
}
