import './styles/main.css';
import { useEffect, useState } from 'react';
import Scoreboard from './components/Scoreboard';
import Card from './components/Card';
import randomNumGenerator from './scripts/randomNumGenerator';

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(currentScore);
  const [selectedCards, setSelectedCards] = useState([]);
  const [renderedCards, setRenderedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(true);

  useEffect(() => {
    if (!isGameOver) {
      let cards = [];
      while (cards.length < 3) {
        const num = randomNumGenerator(11);
        const color = randomNumGenerator(2) === 0 ? 'black' : 'red';
        const id = `${num}-${color}`;
        console.log(id);
        if (!cards.some((obj) => obj.id === id)) {
          cards.push({ id, num, color });
        }
      }
      if (cards.length === 3 && cards.every((obj) => selectedCards.includes(obj.id))) {
        cards = [];
      } else if (cards.length === 3 && !cards.every((obj) => selectedCards.includes(obj.id))) {
        setRenderedCards(cards);
      }
    }
  }, [isGameOver, selectedCards]);

  useEffect(() => {
    if (currentScore > highScore) {
      setHighScore(currentScore);
    }
  }, [currentScore]);

  useEffect(() => {
    if (currentScore === 22) {
      setIsGameOver(true);
      setSelectedCards([]);
      setCurrentScore(0);
    }
  }, [currentScore]) 

  const compareClickedAndSelected = (e) => {
    const { id } = e.target;
    if (!selectedCards.some((el) => el === id)) {
      setSelectedCards((prevSelection) => [...prevSelection, id]);
      setCurrentScore((prevScore) => prevScore + 1);
    } else if (selectedCards.some((el) => el === id)) {
      setSelectedCards([]);
      setCurrentScore(0);
      setIsGameOver(true);
    }
  }

  const handleGameStartBtn = () => setIsGameOver(false);

  return (
    <div className='App'>
      <header>
        <h1>Memory Card Game</h1>
        <Scoreboard
          currentScore={currentScore}
          highScore={highScore}
        />
      </header>
      <button
        id='start-btn'
        type='button'
        onClick={handleGameStartBtn}
        disabled={isGameOver ? false : true}
      >Start Game
      </button>
      <main id='cards'>
        {!isGameOver
          && renderedCards.map((obj) => {
            return (
              <Card
                key={obj.id}
                id={obj.id}
                num={obj.num}
                color={obj.color}
                compareClickedAndSelected={compareClickedAndSelected}
              />
            )
          })
        }
      </main>
    </div>
  );
}

export default App;
