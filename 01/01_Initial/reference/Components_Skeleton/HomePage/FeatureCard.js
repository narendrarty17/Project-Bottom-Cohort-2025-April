export default function FeatureCard({ image, title, description }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-left text-left">
        
        {/* Card Image */}
        <img src="" alt={title} className="w-16 h-16 mb-4" />
        
        {/* Card Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2"></h3>
        
        {/* Card Description */}
        <p className="text-sm text-gray-600"></p>
      </div>
    );
  }
  