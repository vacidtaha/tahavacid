import Link from "next/link";

interface PublicationCardProps {
  title: string;
  description: string;
  theme: 'dark' | 'light' | 'gray-dark' | 'gray-light' | 'charcoal' | 'slate' | 'zinc' | 'neutral';
  rightElement?: React.ReactNode;
  date?: string;
  exploreUrl?: string;
}

export default function PublicationCard({ 
  title, 
  description, 
  theme, 
  rightElement,
  date,
  exploreUrl 
}: PublicationCardProps) {
  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return {
          container: 'bg-gray-900 text-white',
          description: 'text-gray-300',
          link: 'text-gray-200 hover:text-white',
          button: 'bg-white text-gray-900 hover:bg-gray-100 border-white'
        };
      case 'charcoal':
        return {
          container: 'bg-gray-800 text-white',
          description: 'text-gray-300',
          link: 'text-gray-200 hover:text-white',
          button: 'bg-white text-gray-800 hover:bg-gray-100 border-white'
        };
      case 'light':
      default:
        return {
          container: 'bg-gray-100 text-gray-900',
          description: 'text-gray-600',
          link: 'text-gray-700 hover:text-gray-800',
          button: 'bg-gray-900 text-white hover:bg-gray-800 border-gray-900'
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`${themeClasses.container} rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 relative overflow-hidden min-h-48 sm:min-h-60 md:min-h-72 lg:min-h-80`}>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between h-full gap-4 sm:gap-6 md:gap-0">
        <div className="flex-1 md:pr-6">
          {date && (
            <div className={`${themeClasses.description} text-xs mb-2 font-medium`}>
              {date}
            </div>
          )}
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight">{title}</h2>
          <p className={`${themeClasses.description} mb-4 sm:mb-6 md:mb-8 max-w-full md:max-w-md leading-relaxed text-sm sm:text-base line-clamp-3 sm:line-clamp-none`}>
            {description}
          </p>
          <div className="flex flex-row items-center gap-2 sm:gap-3 md:gap-4">
            <button className={`${themeClasses.button} px-3 py-1.5 sm:px-4 sm:py-2 md:py-2.5 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200`}>
              Read Paper
            </button>
            <Link href={exploreUrl || "#"} className={`${themeClasses.link} font-medium text-xs sm:text-sm md:text-base`}>
              Learn More →
            </Link>
          </div>
        </div>
        {rightElement && (
          <div className="flex-1 md:flex md:justify-center md:items-center hidden md:block">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
} 