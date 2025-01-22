import API_URL from "./config";

const fetchPrediction = async (inputData) => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inputData),
  });

  if (!response.ok) {
    throw new Error("Error fetching prediction");
  }

  const data = await response.json();
  return data;
};
