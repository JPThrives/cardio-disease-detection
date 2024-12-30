export interface CardioFormData {
  age: number;
  gender: 'male' | 'female';
  chestpain: number;
  restingBP: number;
  serumcholesterol: number;
  restingelectro: number;
  maxheartrate: number;
  exerciseangia: number;
  oldpeak: number;
  slope: number;
  noofmajorvessels: number;
}

export interface PredictionResult {
  risk: 'high' | 'low';
  probability: number;
}