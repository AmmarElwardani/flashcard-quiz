import React, {useState} from "react";
import FlashcardList from "./FlashcardList";
import "./app.css"

function App() {
  const [flashcards, setFlashcards] = useState(FLASHCARD_SAMPLE);
  return (
    <FlashcardList flashcards = {flashcards} />
  );
}

const FLASHCARD_SAMPLE = [
  {
    id: 1,
    question: "What is 2+2 ?",
    answer: '4',
    options: [
      "1",
      "2",
      "3",
      "4",
    ]
  },
  {
    id: 2,
    question: "Question 2 ?",
    answer: 'Answer 1',
    options: [
      "Answer 1",
      "Answer 2",
      "Answer 3",
      "Answer 4",
    ]
  }
]
export default App;
