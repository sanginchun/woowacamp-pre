class ButtonGroup {
  constructor({ $app, initialState, onClick }) {
    this.state = initialState;

    this.$target = document.createElement('section');
    this.$target.className = 'button-group';

    this.$target.addEventListener('click', onClick);

    this.render();
    $app.appendChild(this.$target);
  }

  render() {
    // prettier-ignore
    this.$target.innerHTML = `
      <button class="button undo-button ${this.state.disableUndoButton ? 'disabled' : ''}">Undo Previous Move</button>
      <button class="button restart-button ${this.state.disableRestartButton ? 'disabled' : ''}">Restart Game</button>
    `;
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }
}

export default ButtonGroup;
