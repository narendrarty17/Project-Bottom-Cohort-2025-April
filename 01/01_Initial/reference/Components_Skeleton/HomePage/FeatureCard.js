export default function FeatureCard({ image, title, description }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-left text-left">
        <img src={image} alt={title} className="w-16 h-16 mb-4" />
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  }
  