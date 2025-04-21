// app/components/dashboard/PopularStockCard.js
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

export default function PopularStockCard({ name, price, changePercent, description }) {
  const isPositive = changePercent >= 0;
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const ArrowIcon = isPositive ? FiArrowUp : FiArrowDown;

  // Format change percentage
  const formattedChangePercent = `${isPositive ? '+' : '-'}${changePercent.toFixed(2)}%`;
  // Format price as Indian Rupees (₹)
  const formattedPrice = `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between h-full hover:shadow-lg transition-shadow duration-200">
      {/* Top section: Name and Change */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-800">{name}</h3>
        <span className={`flex items-center text-sm font-semibold ${colorClass} whitespace-nowrap`}>
          <ArrowIcon className="w-4 h-4 mr-1 flex-shrink-0" />
          {formattedChangePercent}
        </span>
      </div>

      {/* Middle section: Price */}
      <div className="mb-3">
        <p className="text-xl sm:text-2xl font-semibold text-gray-900">{formattedPrice}</p>
      </div>

      {/* Bottom section: Description */}
      <p className="text-xs text-gray-500 line-clamp-2">{description}</p> {/* Limits description to 2 lines */}
    </div>
  );
}