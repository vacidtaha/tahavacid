'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getMovieDetails, getMovieCredits, getMovieImages, getImageUrl, LEGEND_MOVIE_ID } from '@/lib/tmdb';

// TMDB API tipleri
interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  runtime: number;
  genres: Array<{ id: number; name: string }>;
  poster_path: string;
}

interface MovieImage {
  file_path: string;
  iso_639_1: string | null;
}

interface MovieImages {
  posters: MovieImage[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

interface MovieCredits {
  cast: CastMember[];
  crew: CrewMember[];
}

export default function MobilePage() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [images, setImages] = useState<MovieImages | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const [movieData, imagesData, creditsData] = await Promise.all([
        getMovieDetails(LEGEND_MOVIE_ID),
        getMovieImages(LEGEND_MOVIE_ID),
        getMovieCredits(LEGEND_MOVIE_ID)
      ]);
      setMovieDetails(movieData);
      setImages(imagesData);
      setCredits(creditsData);
    }
    fetchData();
  }, []);

  if (!movieDetails || !images || !credits) {
    return <div className="min-h-screen bg-black"></div>;
  }

  // En yüksek kaliteli yazısız posteri seç (genellikle ilk poster)
  const cleanPoster = images.posters.find((poster: MovieImage) => !poster.iso_639_1) || images.posters[0];
  
  // Yıl, tür ve süre formatla
  const releaseYear = new Date(movieDetails.release_date).getFullYear();
  const genres = movieDetails.genres.map((genre: { id: number; name: string }) => genre.name).join(', ');
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}dk`;
  };

  // Açıklamayı kısalt
  const shortDescription = movieDetails.overview.length > 180 
    ? movieDetails.overview.substring(0, 180) + '...' 
    : movieDetails.overview;
  
  return (
    <div className="min-h-screen bg-black">
      {/* Legend Film Afişi - %50 boyut, köşeden köşeye, alt vinyet */}
      <div className="relative w-full h-[45vh]">
        {cleanPoster && (
          <Image
            src={getImageUrl(cleanPoster.file_path, 'w780')}
            alt="Legend Film Afişi"
            fill
            className="object-cover object-top"
            priority
          />
        )}
        {/* Alt kısım vinyet efekti */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
        

      </div>
      
      {/* Film Bilgileri Komponenti - Afişin Altında */}
      <div className="bg-black px-6 py-6">
        <div className="flex flex-col items-center space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-wider text-center transform scale-y-110" 
              style={{
                fontFamily: 'serif',
                letterSpacing: '0.2em'
              }}>
            LEGEND
          </h1>
          
          {/* Yıl, Tür ve Süre */}
          <div className="text-white/90 text-sm font-medium" 
               style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            {releaseYear} • {genres} • {formatRuntime(movieDetails.runtime)}
          </div>
          
          {/* İzlemeye Başla Butonu */}
          <Link href="/watch" className="mt-2 bg-white text-black px-16 py-3 rounded-xl font-semibold text-sm hover:bg-gray-100 transition-all duration-300 shadow-lg inline-flex items-center justify-center"
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            İzlemeye Başla
          </Link>
        </div>
      </div>
      
      {/* Kalan alan */}
      <div className="bg-black pl-6 pr-4 pt-2">
        {/* Film Açıklaması - Sol Köşe */}
        <div className="max-w-sm">
          <p className="text-white/70 text-xs leading-relaxed"
             style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
            {isExpanded ? movieDetails.overview : shortDescription}
            {!isExpanded && movieDetails.overview.length > 180 && (
              <button 
                onClick={() => setIsExpanded(true)}
                className="ml-1 text-white hover:text-white/80 transition-colors"
              >
                devamını gör
              </button>
            )}
            {isExpanded && (
              <button 
                onClick={() => setIsExpanded(false)}
                className="ml-1 text-white hover:text-white/80 transition-colors"
              >
                kapat
              </button>
            )}
          </p>
          
          {/* Oyuncu ve Yönetmen Bilgileri */}
          <div className="mt-6 space-y-3">
            {/* Yönetmen */}
            {(() => {
              const director = credits.crew.find((person: CrewMember) => person.job === 'Director');
              return director ? (
                <div className="flex items-start gap-2">
                  <span className="text-white/50 text-xs font-medium min-w-[60px]" 
                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                    Yönetmen:
                  </span>
                  <span className="text-white/80 text-xs" 
                        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                    {director.name}
                  </span>
                </div>
              ) : null;
            })()}
            
            {/* Ana Oyuncular - Fotoğraflarla */}
            <div className="space-y-3">
              <span className="text-white/90 text-sm font-semibold" 
                    style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                Oyuncular ve Ekip
              </span>
              <div className="flex gap-5 overflow-x-auto pb-2">
                {credits.cast.slice(0, 8).map((actor: CastMember, index: number) => (
                  <div key={index} className="flex-shrink-0 text-center space-y-2">
                    <div className="w-20 h-20 relative rounded-full overflow-hidden bg-white/10">
                      {actor.profile_path ? (
                        <Image
                          src={getImageUrl(actor.profile_path, 'w185')}
                          alt={actor.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white font-semibold text-base">
                            {actor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="w-24 space-y-1">
                      <p className="text-white/80 text-xs leading-tight font-medium" 
                         style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                        {actor.name}
                      </p>
                      <p className="text-white/50 text-xs leading-tight" 
                         style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif' }}>
                        {actor.character}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 