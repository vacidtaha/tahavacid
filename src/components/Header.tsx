import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16 md:h-20 lg:h-24">
          {/* Logo - Mobilde küçük, masaüstünde büyük */}
          <Link href="/" className="flex items-center">
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
        </div>
      </div>
    </header>
  )
} 