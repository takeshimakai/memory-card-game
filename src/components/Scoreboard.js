const Scoreboard = (props) => {
  const { currentScore, highScore } = props;

  return (
    <div id='scoreboard'>
      <p id='currentScore'>Current Score: {currentScore}</p>
      <p id='highScore'>High Score: {highScore}</p>
    </div>
  )
}

export default Scoreboard;
