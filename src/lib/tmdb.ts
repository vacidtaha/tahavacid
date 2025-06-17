const TMDB_API_KEY = '10939701cdfefec2623dba399315b067';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export interface TMDBMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime: number;
  vote_average: number;
  backdrop_path: string;
  poster_path: string;
  genres: Array<{ id: number; name: string }>;
  tagline: string;
}

export interface TMDBCredits {
  cast: Array<{
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
  }>;
  crew: Array<{
    id: number;
    name: string;
    job: string;
    department: string;
  }>;
}

export interface TMDBImages {
  id: number;
  backdrops: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }>;
  posters: Array<{
    aspect_ratio: number;
    height: number;
    iso_639_1: string | null;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }>;
}

export async function getMovieDetails(movieId: number): Promise<TMDBMovie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=tr-TR`
  );
  
  if (!response.ok) {
    throw new Error('Film bilgileri alınamadı');
  }
  
  return response.json();
}

export async function getMovieCredits(movieId: number): Promise<TMDBCredits> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Film kadrosu bilgileri alınamadı');
  }
  
  return response.json();
}

export async function getMovieImages(movieId: number): Promise<TMDBImages> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/images?api_key=${TMDB_API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Film resimleri alınamadı');
  }
  
  return response.json();
}

export function getImageUrl(path: string, size: string = 'original'): string {
  if (!path) return '';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}



// Legend filminin TMDB ID'si
export const LEGEND_MOVIE_ID = 276907; 