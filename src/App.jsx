import './Styles/App.css'
import CreateCards from './Components/Cards.jsx'

function App(){
    return (
        <>
            <div id='header'>
                <h1>Memory Card Game</h1>
                <div id='score-container'>
                    <p id="score">Score</p>
                    <p id="highScore">High Score</p>
                </div>
            </div>
            <div id='content'>
                <CreateCards />
            </div>
        </>
    )
}

export default App