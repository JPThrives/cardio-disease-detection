import React, { useState } from 'react';
import CardioForm from './components/CardioForm';
import ResultCard from './components/ResultCard';
import { Heart } from 'lucide-react';

interface PredictionResult {
  prediction: string;
  probability: number;
}

function App() {
  const [result, setResult] = useState<PredictionResult | null>(null);

  const handleReset = () => {
    setResult(null);
  };

  const handleFormSubmit = (predictionResult: PredictionResult) => {
    // Convert the prediction string to the risk format expected by ResultCard
    setResult({
      prediction: predictionResult.prediction,
      probability: predictionResult.probability
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-red-500 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">CardioAnalyzer</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Cardiovascular Disease Detection
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enter your health parameters below to receive an AI-powered assessment of your cardiovascular disease risk. This tool uses advanced machine learning to analyze various health indicators.
          </p>
        </div>

        <div className="mt-8">
          {result ? (
            <ResultCard
              risk={result.prediction === 'high' ? 'high' : 'low'}
              probability={result.probability}
              onReset={handleReset}
            />
          ) : (
            <CardioForm onSubmit={handleFormSubmit} />
          )}
        </div>
      </main>

      <footer className="bg-white mt-12 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            Disclaimer: This is a demonstration tool and should not be used as a substitute for professional medical advice.
            Always consult with a qualified healthcare provider for medical diagnosis and treatment.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;