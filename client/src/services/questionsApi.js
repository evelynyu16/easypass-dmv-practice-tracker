import { apiUrl } from "./config";

// Get one random question
export async function getRandomQuestion() {
  try {
    const response = await fetch(apiUrl("/api/questions/random"));

    if (!response.ok) {
      throw new Error("Failed to fetch random question");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}

export async function getQuestionMeta() {
  try {
    const response = await fetch(apiUrl("/api/questions/meta"));

    if (!response.ok) {
      throw new Error("Failed to fetch question meta");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching question meta:", error);
    throw error;
  }
}

export async function getQuestions({
  topic = "",
  difficulty = "",
  q = "",
  page = 1,
  limit = 20,
} = {}) {
  try {
    const params = new URLSearchParams();
    if (topic) params.set("topic", topic);
    if (difficulty) params.set("difficulty", difficulty);
    if (q) params.set("q", q);
    if (page) params.set("page", String(page));
    if (limit) params.set("limit", String(limit));

    const response = await fetch(apiUrl(`/api/questions?${params.toString()}`));

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}