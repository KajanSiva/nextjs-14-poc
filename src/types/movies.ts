export type DetailedMovie = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  }
};

type Collection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type CrewMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
};

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

type MovieParticipedAsCast = RawMovieListItem & {
  character: string;
  credit_id: string;
  order: number;
};

type MovieParticipedAsCrew = RawMovieListItem & {
  credit_id: string;
  department: string;
  job: string;
};

export type DetailedPerson = {
  adult: boolean;
  also_known_as: string[];
  biography: string | null;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string | null;
  credits: {
    cast: MovieParticipedAsCast[];
    crew: MovieParticipedAsCrew[];
  }
};