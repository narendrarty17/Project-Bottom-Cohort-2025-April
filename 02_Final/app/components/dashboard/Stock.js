// ../components/dashboard/Stock.js
import React from 'react';

function Stock({ stock }) {
  // Determine text color based on positive/negative change
  const changeColor = stock.changePercent >= 0 ? 'text-green-600' : 'text-red-600';
  // Add a '+' sign for positive changes
  const changePrefix = stock.changePercent >= 0 ? '+' : '';

  return (
    // Card container: background, padding, rounded corners, shadow, width, margin (optional, if gap isn't enough)
    <div className='bg-white p-4 rounded-lg shadow-md w-64 hover:shadow-lg transition-shadow duration-200 ease-in-out'>
        {/* Stock Name: Larger, bold */}
        <h2 className='text-lg font-bold text-gray-800 mb-2 truncate' title={stock.name}>
            {stock.name}
        </h2>

        {/* Stock Details List */}
        <ul className='mb-3 text-sm'>
            {/* Price */}
            <li className='text-gray-700 mb-1'>
                <span className='font-medium text-gray-900'>Price:</span> ₹{stock.price.toFixed(2)} {/* Added Rupee symbol and fixed decimal places */}
            </li>
            {/* Change Percentage: Apply conditional color */}
            <li className={changeColor}>
                <span className='font-medium text-gray-900'>Change:</span>
                <span className={`font-semibold ml-1`}>
                    {changePrefix}{stock.changePercent.toFixed(2)}% {/* Added prefix and fixed decimal places */}
                </span>
            </li>
        </ul>

        {/* Stock Description: Smaller text */}
        <p className='text-xs text-gray-600 leading-snug'>
            {stock.description}
        </p>
    </div>
  );
}

export default Stock;