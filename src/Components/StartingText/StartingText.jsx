function StartingText({ startGame }) {
  return (
    <div>
      <img
        src="src/assets/Text.png"
        alt="main-text"
        className="relative"
      />
      <img
        src="src/assets/StartBtn.png"
        alt="play button"
        className="absolute left-1/2 -translate-x-2/3 bottom-1/2 translate-y-3/4 cursor-pointer"
        onClick={startGame}
      />
    </div>
  );
}

export default StartingText;
