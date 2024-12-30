
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  risk: 'high' | 'low';
  probability: number;
  onReset: () => void;
}

export default function ResultCard({ risk, probability, onReset }: Props) {
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {risk === 'high' ? (
            <AlertTriangle className="w-16 h-16 text-red-500" />
          ) : (
            <CheckCircle className="w-16 h-16 text-green-500" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-4">
          {risk === 'high' ? 'High Risk Detected' : 'Low Risk Detected'}
        </h2>

        <div className="mb-6">
          <div className="text-lg mb-2">Risk Probability</div>
          <div className="text-3xl font-bold text-gray-800">
            {(probability * 100).toFixed(1)}%
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 w-full">
          <p className="text-gray-600">
            {risk === 'high'
              ? 'Based on the provided parameters, our analysis indicates a higher risk of cardiovascular disease. We recommend consulting with a healthcare professional.'
              : 'Based on the provided parameters, our analysis indicates a lower risk of cardiovascular disease. However, maintaining a healthy lifestyle is always recommended.'}
          </p>
        </div>

        <button
          onClick={onReset}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform transition hover:scale-105"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
}