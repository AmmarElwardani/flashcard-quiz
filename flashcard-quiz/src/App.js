import React, { useState, useEffect, useRef } from "react";
import FlashcardList from "./FlashcardList";
import "./app.css";
import axios from "axios";
function App() {
  const [flashcards, setFlashcards] = useState([]);
  const categoryEl = useRef();
  const [categories, setCategories] = useState([])
  const amountEl = useRef(); 
  useEffect(()=>{
    axios.get("https://opentdb.com/api_category.php")
      .then((res) => {
        setCategories(res.data.trivia_categories);
      })
  },[])

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }
  function handleSubmit(e){
    e.preventDefault();
    axios.get("https://opentdb.com/api.php",{
      params:  {
        amount: amountEl.current.value,
        category: categoryEl.current.value
      }
    }).then((res) => {
      setFlashcards(
        res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer);
          const options = [
            ...questionItem.incorrect_answers.map((a) => decodeString(a)),
            answer,
          ];
          return {
            id: `${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: answer,
            options: options.sort(() => Math.random() - 0.5),
          };
        })
      );
    });

  }
  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" ref={categoryEl}>
            {categories.map((category)=>{
              return <option value={category.id} key={category.id}>{category.name}</option>
            })}
          </select>
        </div>
        <div className="forgm-group">
          <label htmlFor="amount">Number of Questions</label>
          <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl} />
        </div>
        <div className="form-group">
          <button className="btn">Generate</button>
        </div>
      </form>
      <div className="container">
        <FlashcardList flashcards={flashcards} />
      </div>
    </>
  );
}

// const FLASHCARD_SAMPLE = [
//   {
//     id: 1,
//     question: "What is 2+2 ?",
//     answer: "4",
//     options: ["1", "2", "3", "4"],
//   },
//   {
//     id: 2,
//     question: "Question 2 ?",
//     answer: "Answer 1",
//     options: ["Answer 1", "Answer 2", "Answer 3", "Answer 4"],
//   },
// ];
export default App;
