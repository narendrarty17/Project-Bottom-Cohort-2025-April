export default function IntroSection() {
    return (
      <section className="w-full flex items-center justify-center text-center py-24 px-4 bg-gray-50">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Smarter Stock Market Analysis
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Track, analyze, and optimize your investments with real-time data and AI-powered insights.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              View Dashboard
            </button>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
              Get Started
            </button>
          </div>
        </div>
      </section>
    );
}
  