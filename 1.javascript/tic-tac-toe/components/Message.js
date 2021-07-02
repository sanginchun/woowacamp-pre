class Message {
  constructor({ $app, initialState }) {
    this.state = initialState;

    this.$target = document.createElement('section');
    this.$target.className = 'message';

    this.render();
    $app.appendChild(this.$target);
  }

  render() {
    if (this.state.currentPlayer === null) {
      this.$target.innerHTML = `<p>Start game or Select player</p>`;
      return;
    }

    if (this.state.isGameEnded) {
      if (this.state.linesMadeCount) {
        this.$target.innerHTML = `<p>Game Over: ${this.state.currentPlayer} wins</p>`;
        return;
      } else {
        this.$target.innerHTML = `<p>Game Over: Draw</p>`;
        return;
      }
    }

    this.$target.innerHTML = `<p>${this.state.currentPlayer}'s Turn</p>`;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}

export default Message;
