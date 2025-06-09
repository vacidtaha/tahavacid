import HeroSection from '@/components/HeroSection';
import Image from "next/image";
import Link from "next/link";

export default function NeuronalGeneTherapyPage() {
  return (
    <div>
      {/* Secondary Header - Fixed */}
      <div 
        className="fixed top-0 left-0 right-0 z-60 bg-white/20"
        style={{
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-0">
          <div className="flex items-center justify-between h-12 sm:h-12 md:h-14 max-w-7xl mx-auto lg:relative lg:max-w-none">
            <h1 className="text-sm sm:text-base md:text-lg lg:text-xl text-white lg:absolute lg:left-[25%] lg:-translate-x-1/2">
              <span className="font-semibold">Brain and Spinal Cord Injury</span>
            </h1>
            <div className="flex items-center lg:absolute lg:right-[25%] lg:translate-x-1/2">
              <Link href="/" prefetch={true} className="cursor-pointer">
                <Image
                  src="/logo.svg"
                  alt="Tahavacid Logo"
                  width={60}
                  height={12}
                  className="h-3 md:h-4 w-auto max-w-none"
                  style={{
                    objectFit: 'contain',
                    filter: 'invert(1)'
                  }}
                />
              </Link>
              <span className="text-xs sm:text-sm md:text-sm lg:text-base text-white font-light hidden xl:inline">
                Advanced Technology Institute
              </span>
            </div>
          </div>
          <div className="w-full h-px bg-white/20 max-w-7xl mx-auto"></div>
        </div>
      </div>

      <HeroSection 
        backgroundImage="/neuron.jpg"
        title="Our Neural Regeneration Solution"
      />
      
      {/* White Space Section */}
      <div className="bg-white py-24 sm:py-32 md:py-48 lg:py-64">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-0 lg:ml-[27%] lg:mr-[27%]">
          {/* Content will be added here */}
        </div>
      </div>
    </div>
  )
} 