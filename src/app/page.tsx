export default function Home() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center -mt-16 pt-16">
      <div className="text-center px-4">
        <h1 
          className="text-6xl md:text-8xl lg:text-9xl font-bold text-black tracking-tight"
          style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif' }}
        >
          Limits:
          <span 
            className="ml-4 bg-gradient-to-r from-green-400 via-green-500 to-emerald-600 bg-clip-text text-transparent"
          >
            OFF
          </span>
        </h1>
      </div>
    </div>
  );
}
