import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("saved");

  return (
    <div>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === "saved" ? <SavedQuestionsPage /> : <MistakeNotebookPage />}
    </div>
  );
}

export default App;