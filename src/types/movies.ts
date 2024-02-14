export type RawMovieListItem = {
  "adult": boolean,
  "backdrop_path": string,
  "genre_ids": number[],
  "id": number,
  "original_language": string,
  "original_title": string,
  "overview": string,
  "popularity": number,
  "poster_path": string,
  "release_date": string,
  "title": string,
  "video": boolean,
  "vote_average": number,
  "vote_count": number
}

export type MovieListItem = RawMovieListItem & {
  genres: Genre[]
}

export type PopularMoviesRawResult = {
  "page": number,
  "results": RawMovieListItem[],
  "total_pages": number,
  "total_results": number
}

export type PopularMoviesResult = {
  "page": number,
  "results": MovieListItem[],
  "totalPages": number,
  "totalResults": number
}


export type Genre = {
  id: number,
  name: string
}

export type MovieGenresResult = {
  genres: Genre[]
}