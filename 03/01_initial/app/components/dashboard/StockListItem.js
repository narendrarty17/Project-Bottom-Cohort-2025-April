import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

export default function StockListItem({ name, change }) {
  const isPositive = change >= 0;
  // Use green-600 for positive, red-600 for negative
  const colorClass = isPositive ? 'text-green-600' : 'text-red-600';
  const ArrowIcon = isPositive ? FiArrowUp : FiArrowDown;

  // Format change percentage, adding '+' for positive values
  const formattedChange = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;

  return (
    <li className="flex justify-between items-center text-sm py-1 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-800 font-medium">{name}</span>
      <span className={`flex items-center font-semibold ${colorClass}`}>
        <ArrowIcon className="w-4 h-4 mr-1" aria-hidden="true" />
        {formattedChange}
      </span>
    </li>
  );
}