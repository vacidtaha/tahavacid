"use client"

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isRDPage = pathname === '/research-development';
  const isNeuronalPage = pathname === '/neuronal-gene-therapy';

  // Neuronal gene therapy sayfasında header'ı gizle
  if (isNeuronalPage) {
    return null;
  }

  return (
    <header 
      className={`${isRDPage ? 'absolute' : 'fixed'} top-0 left-0 right-0 z-50 ${
        isRDPage ? 'bg-black/20' : 'bg-white/95'
      }`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)', // Safari desteği için
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="cursor-pointer">
              <Image
                src="/logo.svg"
                alt="Taha Vacid Logo"
                width={100}
                height={20}
                className="h-5 w-auto max-w-none"
                style={{
                  objectFit: 'contain',
                  filter: isRDPage ? 'invert(1)' : 'none' // RD sayfasında beyaz logo, diğerlerinde siyah
                }}
                priority={true}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
} 