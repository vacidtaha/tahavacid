import Link from 'next/link'
import { getMovieDetails, LEGEND_MOVIE_ID, getImageUrl } from '@/lib/tmdb'
import Image from 'next/image'

export default async function WatchPage() {
  const movieDetails = await getMovieDetails(LEGEND_MOVIE_ID)
  
  // Video dosyası URL'i - VPS'e film yüklendiğinde bu path kullanılacak
  const videoUrl = "/videos/movie.mp4" // Veya .m3u8 HLS dosyası
  
  return (
    <div className="min-h-screen bg-black relative">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Link 
          href="/"
          className="flex items-center space-x-2 text-white bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-black/70 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Geri Dön</span>
        </Link>
      </div>

      {/* Video Container - iOS Native Player */}
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4">
          <video
            controls
            playsInline
            preload="metadata"
            className="w-full aspect-video max-h-[90vh] bg-black rounded-lg"
            poster={movieDetails.backdrop_path ? getImageUrl(movieDetails.backdrop_path, 'original') : undefined}
          >
            <source src={videoUrl} type="video/mp4" />
            <source src="/videos/movie.m3u8" type="application/vnd.apple.mpegurl" />
            Tarayıcınız video oynatmayı desteklemiyor.
          </video>
        </div>
      </div>

      {/* Movie Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{movieDetails.title}</h1>
          <p className="text-gray-300 text-sm md:text-lg max-w-3xl line-clamp-2">{movieDetails.overview}</p>
          
          <div className="flex items-center space-x-4 md:space-x-6 mt-4 text-xs md:text-sm text-gray-400 flex-wrap">
            <span>{new Date(movieDetails.release_date).getFullYear()}</span>
            <span>{Math.floor(movieDetails.runtime / 60)}s {movieDetails.runtime % 60}dk</span>
            <span>⭐ {movieDetails.vote_average.toFixed(1)}</span>
            <span className="hidden md:inline">{movieDetails.genres.map(g => g.name).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 