import Image from 'next/image';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { getMovieDetails, getMovieCredits, getMovieImages, getImageUrl, LEGEND_MOVIE_ID } from '@/lib/tmdb';

export default async function Home() {
  // Mobil cihaz algılama
  const headersList = await headers();
  const userAgent = headersList.get('user-agent') || '';
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  // Mobil cihazdan geliyorsa /mobile sayfasına yönlendir
  if (isMobile) {
    redirect('/mobile');
  }

  // TMDB API'sinden film verilerini çek
  const movieDetails = await getMovieDetails(LEGEND_MOVIE_ID);
  const credits = await getMovieCredits(LEGEND_MOVIE_ID);
  const images = await getMovieImages(LEGEND_MOVIE_ID);
  
  // Farklı backdrop ve poster seç (sabit)
  const selectedBackdrop = images.backdrops[1]?.file_path || movieDetails.backdrop_path;
  const selectedPoster = images.posters[7]?.file_path || movieDetails.poster_path;
  
  // Yönetmeni bul
  const director = credits.crew.find(person => person.job === 'Director');
  
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}s ${mins}dk`;
  };

  const formatReleaseYear = (date: string) => {
    return new Date(date).getFullYear();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Backdrop Image */}
      <div className="absolute inset-0 z-0">
        {selectedBackdrop && (
          <Image
            src={getImageUrl(selectedBackdrop, 'original')}
            alt={movieDetails.title}
            fill
            className="object-cover"
            priority
          />
        )}
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Romantic Message */}
      <div className="relative z-10 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-white/90 text-sm md:text-base font-light tracking-wide">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                ✨ Sadece Melike için oluşturuldu • Sevgiler Taha 💖
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Movie Info */}
            <div className="text-white space-y-8">
              
              {/* Title and Year */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                  {movieDetails.title}
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 font-light">
                  {formatReleaseYear(movieDetails.release_date)}
                </p>
              </div>

              {/* Tagline */}
              {movieDetails.tagline && (
                <p className="text-2xl md:text-3xl font-light text-gray-200 italic">
                  {movieDetails.tagline}
                </p>
              )}

              {/* Movie Details */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <span className="bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full">
                  {movieDetails.genres.map(genre => genre.name).join(', ')}
                </span>
                <span>{formatRuntime(movieDetails.runtime)}</span>
                <span>⭐ {movieDetails.vote_average.toFixed(1)}</span>
              </div>

              {/* Overview */}
              <p className="text-lg leading-relaxed text-gray-200 max-w-2xl">
                {movieDetails.overview}
              </p>

              {/* Director */}
              {director && (
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">
                    Yönetmen
                  </h3>
                  <p className="text-lg text-white">{director.name}</p>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4">
                <button className="bg-white text-black px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center gap-2">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  İzlemeye Başla
                </button>
              </div>
            </div>

            {/* Right Side - Poster */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-[480px] relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                  {selectedPoster && (
                    <Image
                      src={getImageUrl(selectedPoster, 'w500')}
                      alt={`${movieDetails.title} Poster`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>

          {/* Cast Section */}
          <div className="mt-20 pt-12 border-t border-white/10">
            <h2 className="text-2xl font-semibold text-white mb-8">Oyuncular</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {credits.cast.slice(0, 6).map((actor, index) => (
                <div key={index} className="text-center space-y-2">
                  <div className="w-20 h-20 relative rounded-full mx-auto overflow-hidden bg-white/10">
                    {actor.profile_path ? (
                      <Image
                        src={getImageUrl(actor.profile_path, 'w185')}
                        alt={actor.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {actor.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{actor.name}</p>
                    <p className="text-gray-400 text-xs">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
