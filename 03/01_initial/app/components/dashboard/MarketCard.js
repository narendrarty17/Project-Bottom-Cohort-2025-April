import StockListItem from './StockListItem';

// Added 'iconColor' prop for styling consistency if needed, otherwise icon color is set in page.js
export default function MarketCard({ title, icon, stocks, iconColor = "text-gray-500" }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <div className="flex items-center mb-4">
        {/* Render the icon passed as a prop */}
        <span className={`mr-3 ${iconColor}`}>{icon}</span>
        <h2 className="text-xl font-semibold text-gray-700">{title}</h2>
      </div>
      
      <ul className="space-y-1">
        {/* Render list items or a message if no stocks */}
        {stocks && stocks.length > 0 ? (
           stocks.map((stock, index) => (
             <StockListItem key={index} name={stock.name} change={stock.change} />
           ))
         ) : (
            <li className="text-sm text-gray-500 italic">No data available.</li>
         )}
      </ul>
    </div>
  );
}