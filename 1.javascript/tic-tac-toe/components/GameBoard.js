class GameBoard {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;

    this.$target = document.createElement('section');
    this.$target.className = 'game-board';

    this.$target.addEventListener('click', onClick);

    this.render();
    $app.appendChild(this.$target);
  }

  render() {
    this.$target.innerHTML = `
      <div class="game-board__game-table">
        ${this.state.gameStatus
          .map(
            (mark, index) =>
              `<div class="cell ${
                this.state.linesMade.flat().includes(index) ? 'fill' : ''
              }" data-index="${index}" data-mark="${mark}">${mark}</div>`
          )
          .join('')}
      </div>
    `;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}

export default GameBoard;
