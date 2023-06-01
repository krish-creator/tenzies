
import React, { useEffect, useState }  from 'react'
import './App.css'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'



function App() {

  const [tenzies, setTenzies] = useState(false)



  const generateNewDie = () => {
    return  {
        id: nanoid(),
        value: Math.ceil(Math.random()*6),
        isHeld:false        
        }
  }

  const allNewDice = () => {
    const diceArray = []

    for(let i = 0; i <10 ; i++ ){
      diceArray.push(generateNewDie())
    }

    return diceArray
  }

  const [newDice, setNewDice] = useState(() => allNewDice())

  const holdDice = (id) => {
    (
      setNewDice((prevDice)=>{
        return(prevDice.map((die) => {
          return(die.id === id ? {...die, isHeld: !die.isHeld} : die)
        }))
      })
    )
  }

  const rollDice = () => {
    if(!tenzies){
      setNewDice(prevDice => {
        return(prevDice.map(die => {
          return (die.isHeld ? die : generateNewDie() )
        }))
      })
    } else {
      setTenzies(false)
      setNewDice(allNewDice)
    }
     
    
  }


  useEffect(() => {
    const allHeld = newDice.every(die => die.isHeld)
    const sameValues = newDice.every(die => die.value === newDice[0].value)

    if(allHeld && sameValues) {
      setTenzies(true)
    }

  },[newDice])

  const dieEl = newDice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />)






  return (
    <>
    {tenzies && <Confetti />}
      <main>
        <div className='header'>
          <h1 className='title'>Tenzies</h1>
          <p className='sub-title'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        </div>
        <div className='die-container'>
          {dieEl}
        </div>
        <button className='roll-btn' onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
    </>
  )
}

export default App
