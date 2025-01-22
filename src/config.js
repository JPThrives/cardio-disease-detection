const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://cardio-disease-detection.vercel.app/"
    : "http://localhost:5000"; // Local backend for development

export default API_URL;