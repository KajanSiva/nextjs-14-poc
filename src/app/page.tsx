import { FavoriteMoviesResult } from "@/types/movies"

async function getData() {
  const result = await fetch(`${process.env.API_URL}/3/movie/popular?language=fr-FR&page=1`, {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`
    }
  })

  if (!result.ok) {
    throw new Error('Failed to fetch data')
  }

  const formattedResult: FavoriteMoviesResult = await result.json()
  return formattedResult.results
}

export default async function Home() {
  const movies = await getData()
  console.log(movies.length)

  return (
    <div>
      <h2>Les plus populaires</h2>
      <div>
        {movies.map((movie) => (
          <div key={movie.id}>
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
