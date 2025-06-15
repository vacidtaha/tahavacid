"use client"

import { useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  useEffect(() => {
    // Ana sayfada scroll'u engelle
    document.body.style.overflow = 'hidden';
    
    // Component unmount olduğunda scroll'u geri aç
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* Invisible preload links - diğer sayfaları arka planda yükler */}
      <div className="hidden">
        <Link href="/research-development" prefetch={true}>Research</Link>
        <Link href="/neuronal-gene-therapy" prefetch={true}>Neuronal</Link>
        <Link href="https://contact.tahavacid.com" prefetch={true}>Contact</Link>
      </div>
      
      <div className="text-left px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
        {/* Şiir başlığı */}
        <h1 
          className="text-lg sm:text-xl md:text-2xl text-black font-normal mb-6 sm:mb-8"
          style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
            fontWeight: '400'
          }}
        >
          INVICTUS
        </h1>
        
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-4 sm:space-y-6">
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-xl text-black font-normal leading-relaxed"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                lineHeight: '1.6',
                fontWeight: '400'
              }}
            >
              Out of the night that covers me,<br />
              Black as the pit from pole to pole,<br />
              I thank whatever gods may be<br />
              For my unconquerable soul.
            </p>
            
            <p 
              className="text-base sm:text-lg md:text-xl lg:text-xl text-black font-normal leading-relaxed"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                lineHeight: '1.6',
                fontWeight: '400'
              }}
            >
              It matters not how strait the gate,<br />
              How charged with punishments the scroll.<br />
              I am the master of my fate:<br />
              I am the captain of my soul.
            </p>
          </div>
          
          <div className="pt-2 sm:pt-4">
            <p 
              className="text-xs sm:text-sm text-black"
              style={{ 
                fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
                fontWeight: '300'
              }}
            >
              William Ernest Henley<br />
              1875
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
