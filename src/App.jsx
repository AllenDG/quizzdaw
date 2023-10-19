import { useState, React, useMemo, useEffect } from 'react';
import './App.css';
import Timer from './components/Timer';
import Trivia from './components/Trivia.jsx';
import Start from './components/Start';

function shuffleArray(array) {
  // Create a copy of the array to avoid modifying the original array
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [username, setUsername] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [stop, setStop] = useState(false);
  const [earned, setEarned] = useState("Congratulations");

  const data = [
    {
      id: 1,
      question: "What is 5 + 3?",
      answers: [
        {
          text: "A) 8",
          correct: true,
        },
        {
          text: "B) 7",
          correct: false,
        },
        {
          text: "C) 6",
          correct: false,
        },
        {
          text: "D) 9",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question: "How many fingers do you have on one hand?",
      answers: [
        {
          text: "A) 6",
          correct: false,
        },
        {
          text: "B) 5",
          correct: true,
        },
        {
          text: "C) 10",
          correct: false,
        },
        {
          text: "D) 4",
          correct: false,
        },
      ],
    },
    {
      id: 3,
      question: "What is 3 multiplied by 4?",
      answers: [
        {
          text: "A) 7",
          correct: false,
        },
        {
          text: "B) 10",
          correct: false,
        },
        {
          text: "C) 12",
          correct: true,
        },
        {
          text: "D) 9",
          correct: false,
        },
      ],
    },
    {
      id: 4,
      question: "How many sides does a triangle have?",
      answers: [
        {
          text: "A) 5",
          correct: false,
        },
        {
          text: "B) 3",
          correct: true,
        },
        {
          text: "C) 4",
          correct: false,
        },
        {
          text: "D) 6",
          correct: false,
        },
      ],
    },
    {
      id: 5,
      question: "If you have 8 apples and you eat 3, how many apples do you have left?",
      answers: [
        {
          text: "A) 6",
          correct: false,
        },
        {
          text: "B) 4",
          correct: false,
        },
        {
          text: "C) 5",
          correct: true,
        },
        {
          text: "D) 2",
          correct: false,
        },
      ],
    },
    {
      id: 6,
      question: "What comes after 9?",
      answers: [
        {
          text: "A) 11",
          correct: false,
        },
        {
          text: "B) 12",
          correct: false,
        },
        {
          text: "C) 8",
          correct: false,
        },
        {
          text: "D) 10",
          correct: true,
        },
      ],
    },
    {
      id: 7,
      question: "What is 7 minus 2?",
      answers: [
        {
          text: "A) 4",
          correct: false,
        },
        {
          text: "B) 3",
          correct: false,
        },
        {
          text: "C) 5",
          correct: true,
        },
        {
          text: "D) 2",
          correct: false,
        },
      ],
    },
    {
      id: 8,
      question: "How many days are there in a week?",
      answers: [
        {
          text: "A) 5",
          correct: false,
        },
        {
          text: "B) 6",
          correct: false,
        },
        {
          text: "C) 7",
          correct: true,
        },
        {
          text: "D) 8",
          correct: false,
        },
        
      ],
    },
    {
      id: 9,
      question: "What is 2 + 4?",
      answers: [
        {
          text: "A) 5",
          correct: false,
        },
        {
          text: "B) 6",
          correct: true,
        },
        {
          text: "C) 7",
          correct: false,
        },
        {
          text: "D) 8",
          correct: false,
        },
      ],
    },
    {
      id: 10,
      question: "How many quarters make a dollar?",
      answers: [
        {
          text: "A) 2",
          correct: false,
        },
        {
          text: "B) 4",
          correct: true,
        },
        {
          text: "C) 3",
          correct: false,
        },
        {
          text: "D) 5",
          correct: false,
        },
      ],
    },
    {
      id: 11,
      question: "If you have 5 apples and you give 2 to your friend, how many apples do you have left?",
      answers: [
        {
          text: "A) 3",
          correct: true,
        },
        {
          text: "B) 4",
          correct: false,
        },
        {
          text: "C) 2",
          correct: false,
        },
        {
          text: "D) 5",
          correct: false,
        },
      ],
    },
    {
      id: 12,
      question: "What is 3 multiplied by 3?",
      answers: [
        {
          text: "A) 6",
          correct: false,
        },
        {
          text: "B) 9",
          correct: true,
        },
        {
          text: "C) 12",
          correct: false,
        },
        {
          text: "D) 5",
          correct: false,
        },
      ],
    },
    {
      id: 13,
      question: "How many sides does a rectangle have?",
      answers: [
        {
          text: "A) 3",
          correct: false,
        },
        {
          text: "B) 4",
          correct: true,
        },
        {
          text: "C) 5",
          correct: false,
        },
        {
          text: "D) 6",
          correct: false,
        },
      ],
    },
    {
      id: 14,
      question: "What comes after 7?",
      answers: [
        {
          text: "A) 8",
          correct: true,
        },
        {
          text: "B) 9",
          correct: false,
        },
        {
          text: "C) 6",
          correct: false,
        },
        {
          text: "D) 10",
          correct: false,
        },
      ],
    },
    {
      id: 15,
      question: "What is 6 divided by 2?",
      answers: [
        {
          text: "A) 2",
          correct: false,
        },
        {
          text: "B) 3",
          correct: true,
        },
        {
          text: "C) 4",
          correct: false,
        },
        {
          text: "D) 5",
          correct: false,
        },
      ],
    },
  ];
  useEffect(() => {
    questionNumber > 15
      ? setEarned("Congratulations")
      : setEarned(""); // Set earned to an empty string when the condition is not met
  }, [questionNumber]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
        <div className="main" >
          {stop ?(  <h1 className='endText' >You earned {earned}</h1>) : (
            <>
              <div className="top" >
              <div className="timer" ><Timer setStop={setStop} questionNumber={questionNumber } /></div>
            </div>
            <div className="bottom" >
              <Trivia data={data} 
                      setStop={setStop} 
                      setQuestionNumber={setQuestionNumber}
                      questionNumber={questionNumber} />
            </div>
            </>
          )}
        </div>
      </>)}  
    </div>
  )
}

export default App;
