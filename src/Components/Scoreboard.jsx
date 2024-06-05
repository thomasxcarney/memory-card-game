
function Score({ currentScore, highScore }) {
    return (
        <>
            <p id='score'>Score: {currentScore}</p>
            <p id='high-score'>High Score: {highScore}</p>
        </>
    );
}

export default Score;
