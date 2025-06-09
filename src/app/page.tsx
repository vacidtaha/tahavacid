"use client"

import { useEffect } from 'react';

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
      <div className="text-left -ml-32">
        <div className="space-y-8">
          <div className="space-y-6">
            <p 
              className="text-xl text-black font-normal leading-relaxed"
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
              className="text-xl text-black font-normal leading-relaxed"
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
          
          <div className="pt-4">
            <p 
              className="text-sm text-black"
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
