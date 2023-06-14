import { useState } from "react";
import Die from "./Die"



export default function App() {

  const [randomDiceNumbers, setRandomDiceNumber] = useState(allNewDice)
  const dies = randomDiceNumbers.map((object, index) => (
    <Die key={index} value={object.value} />
  ));

  function allNewDice() {
    const numberArray = []
    for(let i=0 ; i<10 ; i++){
        numberArray.push({ 
          value: Math.ceil(Math.random() * 6), 
          isHeld: false 
        }) 
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

