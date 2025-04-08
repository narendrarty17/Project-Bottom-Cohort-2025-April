import FeatureCard from './FeatureCard';

export default function FeaturesSection() {
  return (
    <section className="px-4 py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">
          {/* Heading for your features section */}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Display all your features card here */}
        </div>
      </div>
    </section>
  );
}
