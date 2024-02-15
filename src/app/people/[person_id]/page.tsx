import Image from 'next/image'
import { DetailedPerson, MovieParticipedAsCast, MovieParticipedAsCrew } from "@/types/movies";
import { defaultLanguage, fetchWithAuth } from "@/utils/dataFetching";
import Carousel from '@/components/Carousel';

async function getData(personId: number): Promise<DetailedPerson> {
  const personDetailUrl = `${process.env.API_URL}/3/person/${personId}?language=${defaultLanguage}&append_to_response=credits`

  const person = await fetchWithAuth<DetailedPerson>(personDetailUrl);

  return person
}

type PersonDetailProps = {
  params: {
    person_id: string
  }
}

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

export default async function PersonDetail({ params }: PersonDetailProps) {
  const personId = Number(params.person_id)

  const person = await getData(personId)

  const photoUrl = `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${person.profile_path}`

  let credits = [...person.credits.cast, ...person.credits.crew]
  credits = deduplicatedCredits(credits)

  const formattedCredits = credits.map((credit) => ({
    image: credit.poster_path ? `${process.env.API_IMAGE_URL}/${process.env.API_IMAGE_POSTER_SIZE}/${credit.poster_path}` : null,
    id: credit.id,
    content: credit.title,
  }))

  return (
    <div>
      <h2 className="text-2xl mb-8">{person.name}</h2>

      <div className='flex justify-start mb-8'>
        <div className="w-[160px] h-[250px] relative mr-8 shrink-0">
          <Image
            src={photoUrl}
            alt={person.name}
            fill
            style={{objectFit:"contain"}}
            unoptimized
            />
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
      <Carousel data={formattedCredits} linkPath='/movies/' />
    </div>
  );
}
