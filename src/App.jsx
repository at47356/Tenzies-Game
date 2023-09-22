import { useEffect, useState } from "react";
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'




export default function App() {

  const [randomDiceNumbers, setRandomDiceNumber] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = randomDiceNumbers.every(die => die.isHeld )
    const allEqual = randomDiceNumbers.every(die => die.value == randomDiceNumbers[0].value)
    if(allEqual && allHeld){
      setTenzies(true)
      console.log("You Won!!")
    }
  },[randomDiceNumbers])

  function hold(id) {
    setRandomDiceNumber(
      oldDice => oldDice.map(die => (
          die.id === id ? {...die, isHeld: !die.isHeld} : die
      ))
  )
  }

  const dies = randomDiceNumbers.map((object, index) => (
    <Die 
      key={index} 
      value={object.value}
      isHeld={object.isHeld}
      hold={()=> hold(object.id)}
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
    setTenzies(false)
    setRandomDiceNumber(oldDice => oldDice.map(die => (
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    )))
  }
  

  return (
    <div className="main">
      <div className="confetti">
      {tenzies && <Confetti/>}
      </div>
      <main>
          
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

