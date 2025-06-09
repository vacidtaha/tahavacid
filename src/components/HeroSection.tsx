interface HeroSectionProps {
  backgroundImage: string;
  title: string;
  overlay?: boolean;
}

export default function HeroSection({ 
  backgroundImage, 
  title, 
  overlay = true 
}: HeroSectionProps) {
  return (
    <div className="relative h-[80vh] sm:h-[85vh] md:h-screen w-full -mt-12 sm:-mt-12 md:-mt-14">
      {/* Full Screen Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Optional Dark Overlay */}
        {overlay && (
          <div className="absolute inset-0 bg-black/30"></div>
        )}
        
        {/* White Vignette at Bottom with Progressive Blur */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white/40 via-white/25 via-white/15 via-white/8 via-white/4 via-white/2 to-transparent"></div>
        
        {/* Ultra Soft Progressive Blur Layers */}
        <div 
          className="absolute inset-x-0 bottom-0 h-8"
          style={{
            backdropFilter: 'blur(3px)',
            WebkitBackdropFilter: 'blur(3px)'
          }}
        ></div>
        <div 
          className="absolute inset-x-0 bottom-0 h-16"
          style={{
            backdropFilter: 'blur(2.5px)',
            WebkitBackdropFilter: 'blur(2.5px)'
          }}
        ></div>
        <div 
          className="absolute inset-x-0 bottom-0 h-24"
          style={{
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)'
          }}
        ></div>
        <div 
          className="absolute inset-x-0 bottom-0 h-32"
          style={{
            backdropFilter: 'blur(1.5px)',
            WebkitBackdropFilter: 'blur(1.5px)'
          }}
        ></div>
        <div 
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            backdropFilter: 'blur(1px)',
            WebkitBackdropFilter: 'blur(1px)'
          }}
        ></div>
        <div 
          className="absolute inset-x-0 bottom-0 h-48"
          style={{
            backdropFilter: 'blur(0.5px)',
            WebkitBackdropFilter: 'blur(0.5px)'
          }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-end">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 pb-16 sm:pb-20 md:pb-24 lg:pb-32 w-full">
          <div className="flex flex-col sm:flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 md:gap-8 lg:gap-0">
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-none tracking-tight"
              style={{ 
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              {title}
            </h1>
            
            {/* Read Paper Button */}
            <button 
              className="px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-lg transition-all duration-300 hover:bg-white/20 hover:border-white/30 md:mr-16 lg:mr-24 xl:mr-32 self-start md:self-auto text-sm sm:text-base"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif'
              }}
            >
              Read Paper
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 