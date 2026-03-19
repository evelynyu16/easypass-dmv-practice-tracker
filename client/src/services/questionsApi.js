// Get one random question
export async function getRandomQuestion() {
  try {
    const response = await fetch("/api/questions/random");

    if (!response.ok) {
      throw new Error("Failed to fetch random question");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}