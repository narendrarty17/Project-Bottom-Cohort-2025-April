import FeatureCard from './FeatureCard';
import { featuresData } from '../../assets/HomePage/featuresData';

export default function FeaturesSection() {
  return (
    <section className="px-4 py-20 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-12">
          Powerful Features for Better Investing
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              image={feature.image}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
