// app/gemini-predict/page.js
'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/homepage/Header'; // Assuming you have a shared Header
import Footer from '../components/homepage/Footer'; // Assuming you have a shared Footer

export default function GeminiPredictPage() {
    const [stockInput, setStockInput] = useState('');
    const [prediction, setPrediction] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stockInput.trim()) {
            setError('Please enter a stock symbol or query.');
            return;
        }

        setIsLoading(true);
        setError('');
        setPrediction(null);

        try {
            const response = await fetch('/api/gemini-stock-predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: stockInput }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Error: ${response.status}`);
            }

            const result = await response.json();
            setPrediction(result.prediction); // Adjust based on actual API response structure

        } catch (err) {
            console.error("Prediction error:", err);
            setError(err.message || 'Failed to get prediction. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        console.log("Prediction: ", prediction);
    },[prediction])

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-12">
                <div className="w-full max-w-xl p-8 space-y-6 bg-white rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold text-center text-gray-800">
                        Gemini Stock Prediction
                    </h1>
                    <p className="text-center text-sm text-gray-600">
                        Enter a stock symbol or related query to get a potential outlook.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="stockInput"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Stock Symbol / Query
                            </label>
                            <input
                                type="text"
                                id="stockInput"
                                name="stockInput"
                                value={stockInput}
                                onChange={(e) => setStockInput(e.target.value)}
                                required
                                disabled={isLoading}
                                className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:opacity-70 disabled:bg-gray-200"
                                placeholder="e.g., AAPL, GOOG, or 'Future of EV stocks'"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? 'Getting Prediction...' : 'Get Prediction'}
                            </button>
                        </div>
                    </form>

                    {error && (
                        <p className="text-sm text-center text-red-600 mt-4 p-3 bg-red-100 rounded-md">
                            {error}
                        </p>
                    )}

                    {prediction && (
                        <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow">
                            <h2 className="text-xl font-semibold text-gray-800 mb-3">Prediction Result:</h2>
                            {/* Adjust how you display the prediction based on the actual
                                structure of the 'prediction' object from your API.
                                It could be a string, an object with multiple fields, etc.
                                Example:
                                <p className="text-gray-700 whitespace-pre-wrap">{typeof prediction === 'string' ? prediction : JSON.stringify(prediction, null, 2)}</p>
                            */}
                            <div className="text-gray-700 whitespace-pre-wrap">
                                {renderPrediction(prediction)}
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center text-xs text-gray-500 border-t pt-4">
                        <p><strong>Disclaimer:</strong> Stock predictions are speculative and provided for informational purposes only. They do not constitute financial advice. Investing in the stock market involves risk, and you should conduct your own research or consult with a qualified financial advisor before making any investment decisions.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

// Helper function to render prediction based on its type
// You might want to make this more sophisticated
function renderPrediction(predictionData) {
    if (typeof predictionData === 'string') {
        return predictionData;
    }
    if (typeof predictionData === 'object' && predictionData !== null) {
        // Example for a structured prediction object
        // return (
        //     <>
        //         <p><strong>Outlook:</strong> {predictionData.outlook}</p>
        //         <p><strong>Confidence:</strong> {predictionData.confidence}</p>
        //         <p><strong>Analysis:</strong> {predictionData.analysis}</p>
        //     </>
        // );
        return JSON.stringify(predictionData, null, 2); // Default for other objects
    }
    return "No prediction data available or format not recognized.";
}