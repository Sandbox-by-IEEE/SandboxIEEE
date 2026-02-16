import Image from 'next/image';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0102] via-[#190204] to-[#0B0102] flex items-center justify-center px-4 font-['Gemunu_Libre']">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo-sandbox-white.svg"
            alt="The Sandbox Logo"
            width={200}
            height={200}
            className="w-48 h-48 md:w-64 md:h-64"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-wide">
          The Sandbox 3.0
        </h1>

        {/* Subtitle */}
        <p className="text-2xl md:text-4xl font-medium bg-gradient-to-r from-[#FFE4B5] via-[#FFCD8D] to-[#FFE4B5] bg-clip-text text-transparent">
          We Are Cooking! 🔥
        </p>

        {/* Optional: Add a subtle animation */}
        <div className="mt-12 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-[#FFCD8D] rounded-full animate-pulse"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
