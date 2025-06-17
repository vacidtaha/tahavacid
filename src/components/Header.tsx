import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center items-center py-4 md:py-6">
          {/* Logo - Mobilde küçük, masaüstünde büyük */}
          <Link href="/" className="flex items-center mb-3">
            <div className="relative w-32 h-8 sm:w-40 sm:h-10 md:w-48 md:h-12 lg:w-56 lg:h-14">
              <Image
                src="/logo.png"
                alt="Logo"
                fill
                className="object-contain filter brightness-0 invert"
                priority
              />
            </div>
          </Link>
          
          {/* Romantic Message */}
          <div className="text-center">
            <p className="text-white/90 text-xs md:text-sm font-light tracking-wide">
              <span className="bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/20">
                ✨ Sadece Melike için oluşturuldu • Sevgiler Taha 💖
              </span>
            </p>
          </div>
        </div>
      </div>
    </header>
  )
} 