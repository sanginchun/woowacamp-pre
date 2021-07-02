class Players {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;

    this.$target = document.createElement('section');
    this.$target.className = 'players';

    this.$target.addEventListener('click', onClick);

    this.render();
    $app.appendChild(this.$target);
  }

  render() {
    // prettier-ignore
    this.$target.innerHTML = `
      <ul class="players__list">
        <li
          class="players__list__player ${this.state.currentPlayer === 'X' ? 'current' : ''}"
          data-player="X"
        >
          <span class="player">X</span>
          <span class="score">${this.state.score.X}</span>
        </li>
        <li
        class="players__list__player ${this.state.currentPlayer === 'O' ? 'current' : ''}"
        data-player="O"
        >
          <span class="player">O</span>
          <span class="score">${this.state.score.O}</span>
        </li>
      </ul>
    `;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}

export default Players;
