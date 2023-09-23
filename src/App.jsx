import { useEffect, useState } from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'




export default function App() {

  const [randomDiceNumbers, setRandomDiceNumber] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const [timer, setTimer] = useState({
    millisec: 0,
    seconds: 0,
    minutes: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [gameStarted, setGameStarted] = useState(false)

  useEffect(() => {
    const allHeld = randomDiceNumbers.every(die => die.isHeld )
    const allEqual = randomDiceNumbers.every(die => die.value == randomDiceNumbers[0].value)
    if(allEqual && allHeld){
      setTenzies(true)
      console.log("You Won!!")
      // clearInterval(timerId);
      // setTimerId(null);
    }
    tenzies && clearInterval(timerId);
    
  },[randomDiceNumbers, tenzies, timerId])



  function startTimer() {
    if (gameStarted == false) {
      setGameStarted(true)
      // Clear any previous interval
      clearInterval(timerId);

      // Set the timer to increment every 10 milliseconds
      const newTimerId = setInterval(() => {
        setTimer((prevTimer) => {
          let { millisec, seconds, minutes } = prevTimer;
          millisec += 10;

          millisec === 1000 && (millisec = 0, seconds++);
          seconds === 60 && (seconds = 0, minutes++); 
          return {
            minutes,
            seconds,
            millisec,
          };
        });
      }, 10);

      // Save the timer ID in state for later use
      setTimerId(newTimerId);
    }
  }



  function hold(id) {
    setRandomDiceNumber(
      oldDice => oldDice.map(die => (
          die.id === id ? {...die, isHeld: !die.isHeld} : die
      ))
    )
    if (gameStarted == false) {
      startTimer();
    }   
  }

  const dies = randomDiceNumbers.map((object, index) => (
    <Die 
      key={index} 
      value={object.value}
      isHeld={object.isHeld}
      hold={()=> hold(object.id)}
      onClick={() => handleDieClick(object.id)}
    />
  ));

  function allNewDice() {
    const numberArray = []
    for(let i=0 ; i<10 ; i++){
        numberArray.push({ 
          value: Math.ceil(Math.random() * 6), 
          isHeld: false,
          id: nanoid()
        }) 
    }
    return numberArray
  }

  function rollDice() {
    setRandomDiceNumber(oldDice => oldDice.map(die => (
        die.isHeld ? die : {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    )));
  }

  function newGame() {
    setGameStarted(false)
    setTenzies(false)
    setRandomDiceNumber(oldDice => oldDice.map(die => (
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    )))
    clearInterval(timerId);
    setTimerId(null);
    setTimer({
      millisec: 0,
      seconds: 0,
      minutes: 0,
    })
  }
  

  return (
    <div className="main">
      <div className="confetti">
      {tenzies && <Confetti/>}
      </div>
      <main>
          <div className="timer">
            <span className="ms">{timer.minutes < 10 ? `0${timer.minutes}` : timer.minutes}</span>:
            <span className="sec">{timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}</span>:
            <span className="min">{timer.millisec < 10 ? `00${timer.millisec}` : timer.millisec < 100 ? `0${timer.millisec}` : timer.millisec}</span>
          </div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice--container">
              {dies}
          </div>
          <button className="roll-Button" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </div>
  )
}

