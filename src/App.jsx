import { useState } from 'react';
import './Styles/App.css'
import CreateCards from './Components/Cards.jsx'
import Score from './Components/Scoreboard.jsx'

function App() {
    const [currentScore, setCurrentScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    const updateScore = (result) => {
        if (result === 'reset') {
            if(currentScore > highScore){
                setHighScore(currentScore);
            };
            setCurrentScore(0);
        } else if (result === 'add') {
            setCurrentScore(prevScore => prevScore + 1);
        };
    };

    return (
        <>
            <div id='header'>
                <h1>Memory Card Game</h1>
                <div id='score-container'>
                    <Score currentScore={currentScore} highScore={highScore} />
                </div>
            </div>
            <div id='content'>
                <CreateCards updateScore={updateScore} />
            </div>
        </>
    );
}

export default App;
