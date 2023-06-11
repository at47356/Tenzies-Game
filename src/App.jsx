import { useState } from "react";
import Die from "./Die"



export default function App() {

  const [randomDiceNumbers, setRandomDiceNumber] = useState(allNewDice)
  const dies = randomDiceNumbers.map((number, index) => (
  <Die key={index} value={number} />
  ));

  function allNewDice() {
    const numberArray = []
    for(let i=0 ; i<10 ; i++){
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        numberArray.push(randomNumber) 
    }
    return numberArray
  }

  function rollDice(){
    setRandomDiceNumber(allNewDice())
}




  return (
      <main>
          <div className="dice--container">
              {dies}
          </div>
          <button className="roll-Button" onClick={rollDice}>Roll</button>
      </main>
  )
}

