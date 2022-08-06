import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [draw, setDraw] = useState(0)
  const [turn, setTurn] = useState('O')
  const boxRef = useRef(null)

  function fill(e) {
    const isEmptyField = e.target.innerText === ''

    setDraw (() => {
      if(isEmptyField) {
        e.target.innerText = turn
        setTurn(turn === 'O' ? 'X' : 'O')
      }

    })
    return draw
  }

  function handleReset() {
    let children = boxRef.current.children

    for (const child of children) {
      child.innerText = ' '
    }
  }

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className='grid-container' ref={boxRef}>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
        <div className='box' onClick={fill}></div>
      </div>
      <br/>
      <div className='button-container'>
        <button onClick={handleReset}>New Game</button>
      </div>
    </>
  );
}

export default App;
