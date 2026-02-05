export default function AboutSection() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-gemunu mb-8"
          style={{
            background: 'linear-gradient(90deg, #7B1919 0%, #FFFFFF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          What&apos;s The Sandbox?
        </h2>

        <div className="h-px bg-gradient-to-r from-transparent via-[#E8B4A8]/30 to-transparent mb-6 md:mb-8" />

        <p className="text-white/70 text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto font-gemunu">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla diam nisl, egestas eget sem quis, ultricies fermentum dui.
          Quisque quis libero ut, finibus rhoncus mauris amet, mattis pulvinar mauris. Vivamus mi felis, semper id elementum id eget,
          lobortis dignissim maximus. Aenean nec vehicula dictum condimentum. Duis convallis pretium eu et. Etiam faucibus gravida
          lectus sapien.
        </p>
      </div>
    </section>
  );
}
