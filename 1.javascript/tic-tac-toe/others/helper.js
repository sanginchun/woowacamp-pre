const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getGameResult(gameStatus) {
  const linesMade = getLinesMade(gameStatus);

  return {
    isGameEnded: linesMade.length || gameStatus.every((mark) => mark),
    linesMade,
  };
}

function getLinesMade(gameStatus) {
  return LINES.filter((singleLine) => {
    const marks = singleLine.map((index) => gameStatus[index]);

    if (marks[0] && marks.every((mark) => mark === marks[0])) return true;
    else return false;
  });
}
