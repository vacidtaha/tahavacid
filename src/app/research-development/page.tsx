import PublicationCard from '@/components/PublicationCard';

export default function ResearchDevelopmentPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Secondary Header - Sticky */}
      <div 
        className="sticky top-0 z-40 bg-black/80"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:ml-[27%] lg:mr-[27%]">
          <div className="flex items-center h-12 sm:h-12 md:h-14">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl text-white">
              <span className="font-semibold">Taha Vacid</span>
              <span className="font-light"> Advanced Technology Institute</span>
            </h1>
          </div>
          <div className="w-full h-px bg-white/20"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-black h-[48rem] sm:h-[52rem] md:h-[56rem] lg:h-[60rem] xl:h-[64rem] w-full -mt-12 sm:-mt-12 md:-mt-14 relative">
        {/* Image Section - Upper Part */}
        <div className="absolute inset-0 flex items-center justify-center pt-0 pb-20 sm:pb-24 md:pb-32">
          <img 
            src="/fil.png" 
            alt="Elephant" 
            className="w-[32rem] h-[32rem] sm:w-[28rem] sm:h-[28rem] md:w-[36rem] md:h-[36rem] lg:w-[48rem] lg:h-[48rem] xl:w-[64rem] xl:h-[64rem] object-contain"
          />
        </div>
        
        {/* Text Section - Bottom Part */}
        <div className="absolute bottom-0 left-0 right-0 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-black sm:font-bold text-white text-center px-4 sm:px-0" 
              style={{ fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif' }}>
            Welcome to<br/>
            Research & Development<br/>
            Department
          </h1>
        </div>
      </div>
      
      <div className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 bg-white">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:ml-[27%] lg:mr-[27%]">
          {/* Section Title */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20 lg:mb-24">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black">Our Publications</h2>
          </div>
          
          {/* Publication Cards */}
          <div className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 mb-[200vh]">
            <PublicationCard
              title="Brain and Spinal Cord Injury"
              description="Our revolutionary CRISPR-Cas9 gene editing solution enables complete brain and spinal cord regeneration. Advanced therapeutic vectors we developed demonstrate significant breakthroughs in neural tissue renewal. Our clinical trials show promising results for paralysis and brain injury recovery."
              date="March 2024"
              theme="charcoal"
              exploreUrl="/neuronal-gene-therapy"
              rightElement={
                <div className="text-6xl font-bold text-white opacity-20">
                  SOLUTION
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  )
} 