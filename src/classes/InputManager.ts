export default class InputManager {
  private moveLeft: boolean;
  private moveRight: boolean;

  constructor() {
    this.moveLeft = false;
    this.moveRight = false;

    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  handleKeyUp = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = false;
    if (e.code === "ArrowRight" || e.key === "ArrowRight")
      this.moveRight = false;
  };

  handleKeyDown = (e: KeyboardEvent): void => {
    if (e.code === "ArrowLeft" || e.key === "ArrowLeft") this.moveLeft = true;
    if (e.code === "ArrowRight" || e.key === "ArrowRight")
      this.moveRight = true;
  };

  GetmoveLeft(): boolean {
    return this.moveLeft;
  }

  GetmoveRight(): boolean {
    return this.moveRight;
  }
}
