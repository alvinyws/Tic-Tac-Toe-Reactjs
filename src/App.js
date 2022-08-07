import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [draw, setDraw] = useState(0)
  const [turn, setTurn] = useState('O')
  const [previousTurn, setPreviousTurn] = useState('')
  const [board, setBoard] = useState(Array(9).fill(''))
  const [winner, setWinner] = useState(false)
  const boxRef = useRef(null)

  function fill(e, boxIndex) {
    const isEmptyField = e.target.innerText === ''

    setDraw(() => {
      const updatedBoard = board

      if (isEmptyField) {
        e.target.innerText = turn
        updatedBoard[boxIndex - 1] = turn
        setBoard(updatedBoard)
        setTurn(turn === 'O' ? 'X' : 'O')
        setPreviousTurn(turn === 'O' ? 'O' : 'X')
      }
    })
    return draw
  }


  function handleReset() {
    let children = boxRef.current.children

    for (const child of children) {
      child.innerText = ''
    }

    setDraw(0)
    setTurn('O')
    setPreviousTurn('')
    setBoard(Array(9).fill(''))
    setWinner()
  }


  useEffect(() => {
    //horizontal winner
    for (let n = 0; n < 7; n += 3) {
      const isWinner = (board[n] === board[n + 1]) && (board[n + 1] === board[n + 2]) && board[n] !== ''
      if (isWinner) {
        setWinner(isWinner)
        break
      }
    }

    //vertical winner
    for (let n = 0; n < 3; n++) {
      const isWinner = (board[n] === board[n + 3]) && (board[n + 3] === board[n + 6]) && board[n] !== ''
      if (isWinner) {
        setWinner(isWinner)
        break
      }
    }

    //forward diagonal winner
    for (let n = 0; n < 9; n += 4) {
      const isWinner = (board[n] === board[n + 4]) && (board[n + 4] === board[n + 8]) && board[n] !== ''
      if (isWinner) {
        setWinner(isWinner)
        break
      }
    }

    //reverse diagonal winner
    for (let n = 2; n < 7; n += 2) {
      const isWinner = (board[n] === board[n + 2]) && (board[n + 2] === board[n + 4]) && board[n] !== ''
      if (isWinner) {
        setWinner(isWinner)
        break
      }
    }
  }

,[JSON.stringify(board)])


  return (
    <>
      <h1>Tic Tac Toe</h1>
      <div className='grid-container' ref={boxRef}>
        <div className='box' onClick={(e) => fill(e, 1)}></div>
        <div className='box' onClick={(e) => fill(e, 2)}></div>
        <div className='box' onClick={(e) => fill(e, 3)}></div>
        <div className='box' onClick={(e) => fill(e, 4)}></div>
        <div className='box' onClick={(e) => fill(e, 5)}></div>
        <div className='box' onClick={(e) => fill(e, 6)}></div>
        <div className='box' onClick={(e) => fill(e, 7)}></div>
        <div className='box' onClick={(e) => fill(e, 8)}></div>
        <div className='box' onClick={(e) => fill(e, 9)}></div>
      </div>
      <br />
      {winner && <div className='winner'> {previousTurn} is the winner! </div>}
      <br />
      <div className='button-container'>
        <button onClick={handleReset}>New Game</button>
      </div>
    </>
  );
}

export default App;
