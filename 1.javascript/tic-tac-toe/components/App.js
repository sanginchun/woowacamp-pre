import Message from './Message.js';
import Players from './Players.js';
import GameBoard from './GameBoard.js';
import ButtonGroup from './ButtonGroup.js';

import { getGameResult } from '../others/helper.js';

const INITIAL_STATE = {
  currentPlayer: null,
  score: { X: 0, O: 0 },
  gameStatus: new Array(9).fill(''),
  statusHistory: [new Array(9).fill('')],
  isGameEnded: false,
  linesMade: [],
};

class App {
  constructor($app) {
    this.state = { ...INITIAL_STATE };

    this.players = new Players({
      $app,
      initialState: {
        currentPlayer: this.state.currentPlayer,
        score: this.state.score,
      },
      onClick: this.onPlayerClick.bind(this),
    });

    this.message = new Message({
      $app,
      initialState: {
        currentPlayer: this.state.currentPlayer,
        isGameEnded: this.state.isGameEnded,
        linesMadeCount: this.state.linesMade.length,
      },
    });

    this.gameBoard = new GameBoard({
      $app,
      initialState: {
        gameStatus: this.state.gameStatus,
        linesMade: this.state.linesMade,
      },
      onClick: this.onGameBoardClick.bind(this),
    });

    this.buttonGroup = new ButtonGroup({
      $app,
      initialState: {
        disableUndoButton:
          this.state.statusHistory.length === 1 || this.state.isGameEnded,
        disableRestartButton: this.state.statusHistory.length === 1,
      },
      onClick: this.onButtonClick.bind(this),
    });
  }

  setState(nextState) {
    this.state = nextState;

    this.players.setState({
      currentPlayer: this.state.currentPlayer,
      score: this.state.score,
    });

    this.message.setState({
      currentPlayer: this.state.currentPlayer,
      isGameEnded: this.state.isGameEnded,
      linesMadeCount: this.state.linesMade.length,
    });

    this.gameBoard.setState({
      gameStatus: this.state.gameStatus,
      isGameEnded: this.state.isGameEnded,
      linesMade: this.state.linesMade,
    });

    this.buttonGroup.setState({
      disableUndoButton:
        this.state.statusHistory.length === 1 || this.state.isGameEnded,
      disableRestartButton: this.state.statusHistory.length === 1,
    });
  }

  onPlayerClick(e) {
    if (this.state.currentPlayer) return;

    const $clickedPlayer = e.target.closest('.players__list__player');
    if (!$clickedPlayer) return;

    this.setState({
      ...this.state,
      currentPlayer: $clickedPlayer.dataset.player,
    });
  }

  onGameBoardClick(e) {
    if (this.state.isGameEnded) return;

    const $clickedCell = e.target.closest('.cell');
    if (!$clickedCell || $clickedCell.dataset.mark.length) return;

    // if clicked without selecting player
    if (!this.state.currentPlayer) this.state.currentPlayer = 'X';

    const gameStatus = [...this.state.gameStatus];
    gameStatus[+$clickedCell.dataset.index] = this.state.currentPlayer;

    const { isGameEnded, linesMade } = getGameResult(gameStatus);

    const score = { ...this.state.score };
    if (linesMade.length) score[this.state.currentPlayer] += linesMade.length;

    // update next player if game not ended
    const nextPlayer = isGameEnded
      ? this.state.currentPlayer
      : this.state.currentPlayer === 'X'
      ? 'O'
      : 'X';

    this.setState({
      ...this.state,
      gameStatus,
      statusHistory: [...this.state.statusHistory, gameStatus],
      score,
      currentPlayer: nextPlayer,
      isGameEnded,
      linesMade,
    });
  }

  onButtonClick(e) {
    if (e.target.closest('.restart-button')) {
      if (this.state.statusHistory.length === 1) return;

      this.setState({ ...INITIAL_STATE, score: this.state.score });
      return;
    }

    if (e.target.closest('.undo-button')) {
      if (this.state.statusHistory.length === 1 || this.state.isGameEnded)
        return;

      const prevStatusHistory = this.state.statusHistory.slice(
        0,
        this.state.statusHistory.length - 1
      );

      this.setState({
        ...this.state,
        gameStatus: prevStatusHistory[prevStatusHistory.length - 1],
        statusHistory: prevStatusHistory,
        currentPlayer: this.state.currentPlayer === 'X' ? 'O' : 'X',
      });

      return;
    }
  }
}

export default App;
