import React, { useState } from 'react';
import { Heart } from 'lucide-react';

interface CardioFormData {
  age: number;
  gender: number;
  chestpain: number;
  restingBP: number;
  serumcholestrol: number;
  fastingbloodsugar: number;
  restingrelectro: number;
  maxheartrate: number;
  exerciseangia: number;
  oldpeak: number;
  slope: number;
  noofmajorvessels: number;
}

interface Props {
  onSubmit: (result: { prediction: string; probability: number }) => void;
}

export default function CardioForm({ onSubmit }: Props) {
  const [formData, setFormData] = useState<CardioFormData>({ 
    age: 45,
    gender: 1,  // Changed to numeric representation
    chestpain: 0,
    restingBP: 120,
    serumcholestrol: 200,  // Note the spelling
    fastingbloodsugar: 0,
    restingrelectro: 0,    // Note the spelling
    maxheartrate: 150,
    exerciseangia: 0,
    oldpeak: 0,
    slope: 0,
    noofmajorvessels: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const processedData = {
        age: formData.age,
        gender: formData.gender,  // Directly use numeric gender
        chestpain: formData.chestpain,
        restingBP: formData.restingBP,
        serumcholestrol: formData.serumcholestrol,  // Note the spelling
        fastingbloodsugar: formData.fastingbloodsugar,
        restingrelectro: formData.restingrelectro,  // Note the spelling
        maxheartrate: formData.maxheartrate,
        exerciseangia: formData.exerciseangia,
        oldpeak: formData.oldpeak,
        slope: formData.slope,
        noofmajorvessels: formData.noofmajorvessels
      };

      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error fetching data from backend');
      }

      const result = await response.json();
      onSubmit({ 
        prediction: result.prediction === '1' ? 'high' : 'low',
        probability: result.probability || 0.5
      });
    } catch (err) {
      console.error('Error details:', err);
      setError(err instanceof Error ? err.message : 'There was an error with the request.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'gender' ? (value === 'male' ? 1 : 0) : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <Heart className="w-8 h-8 text-red-500 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Cardiovascular Risk Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender === 1 ? 'male' : 'female'}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Rest of the form remains the same, just update field names to match original dataset */}
        <div>
  <label className="block text-sm font-medium text-gray-700">
    Chest Pain Type
  </label>
  <select
    name="chestpain"
    value={formData.chestpain} // formData.chestpain is expected to hold the numeric value
    onChange={handleChange}
    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
  >
    <option value="0">Asymptomatic (no chest pain)</option>
    <option value="1">Typical angina</option>
    <option value="2">Atypical angina</option>
    <option value="3">Non-anginal pain</option>
  </select>
</div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Resting Blood Pressure</label>
          <input
            type="number"
            name="restingBP"
            value={formData.restingBP}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
    Normal: 90–120 mmHgL
  </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Serum Cholesterol</label>
          <input
            type="number"
            name="serumcholestrol"
            value={formData.serumcholestrol}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
    Normal: &lt;  200 mg/dL | High: ≥ 240 mg/dL
  </p>
        </div>

        {/* Continue with the rest of the form fields, keeping names consistent with original dataset */}
        <div>
  <label className="block text-sm font-medium text-gray-700">
    Fasting Blood Sugar (mg/dL)
  </label>
      <input
      type="number"
        name="fastingbloodsugar"
        value={formData.fastingbloodsugar}
        onChange={handleChange}
        placeholder="Enter value (e.g., 120)"
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
        required
        />
        <p className="mt-1 text-sm text-gray-500">
        Normal: &lt; 120 mg/dL | Diabetic: ≥ 120 mg/dL
        </p>
        </div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Resting ECG (0-2)</label>
          <input
            type="number"
            name="restingrelectro"
            min="0"
            max="2"
            value={formData.restingrelectro}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
           <p className="mt-1 text-sm text-gray-500">
            0 : Normal | 1 : ST-T wave abnormality | 2 : probable or definite left ventricular hypertrophy
            </p>
        </div>

        {/* Remaining form fields... */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Maximum Heart Rate</label>
          <input
            type="number"
            name="maxheartrate"
            value={formData.maxheartrate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
           <p className="mt-1 text-sm text-gray-500">
          Normal: 220 - age
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Angina (0-1)</label>
          <input
            type="number"
            name="exerciseangia"
            min="0"
            max="1"
            value={formData.exerciseangia}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
          0 : No Angina | 1 : Angina Present
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">ST Depression (Old Peak)</label>
          <input
            type="number"
            step="0.1"
            name="oldpeak"
            value={formData.oldpeak}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
          0 : ~0.0 (no depression)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Slope (0-2)</label>
          <input
            type="number"
            name="slope"
            min="0"
            max="2"
            value={formData.slope}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
          0 : Upsloping | 1 : Flat | 2 : Downsloping
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Number of Major Vessels</label>
          <input
            type="number"
            name="noofmajorvessels"
            min="0"
            max="4"
            value={formData.noofmajorvessels}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring focus:ring-red-200"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Normal: 0 (no major vessel blockages)
          </p>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="submit"
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transform transition hover:scale-105"
          disabled={loading}
        >
          {loading ? 'Analyzing...' : 'Analyze Risk'}
        </button>
      </div>

      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}
    </form>
  );
}