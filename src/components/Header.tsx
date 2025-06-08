import Image from "next/image";

export default function Header() {
  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 border-b border-gray-200/50"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', // Safari desteği için
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex-shrink-0">
            <Image
              src="/logo.svg"
              alt="Tahavacid Logo"
              width={100}
              height={20}
              className="h-5 w-auto max-w-none"
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
        </div>
      </div>
    </header>
  )
} 