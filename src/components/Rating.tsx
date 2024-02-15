type RatingProps = {
  voteAverage: number,
  voteCount: number
}

export default function Rating({voteAverage, voteCount}: RatingProps) {
  const ratingString = voteCount > 0 ? `${voteAverage.toFixed(2)}/10` : 'N/A'

  return (
    <p>Rating : {ratingString}</p>
  )
}