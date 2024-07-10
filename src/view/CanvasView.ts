import BoatModel from "~/classes/BoatModel";
import ParachutistModel from "~/classes/ParachutistModel";
import PlaneModel from "~/classes/PlaneModel";

export default class CanvasView {
  canvas: HTMLCanvasElement;
  private scoreValueElement: HTMLObjectElement | null;
  private livesValueElement: HTMLObjectElement | null;
  private gameOvereElement: HTMLObjectElement | null;
  private context: CanvasRenderingContext2D | null;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.scoreValueElement = document.querySelector("#scoreValue");
    this.livesValueElement = document.querySelector("#livesValue");
    this.gameOvereElement = document.querySelector("#gameOver");
    this.context = this.canvas.getContext("2d");
  }

  Init(): void {
    this.context?.fillRect(0, this.canvas.height - 150, this.canvas.width, 200);
  }

  DrawElement(
    element: PlaneModel | ParachutistModel | BoatModel | null | undefined
  ): void {
    if (!element || element === null) return;

    const pos = element.GetPosition();

    this.context?.fillRect(
      pos.x,
      pos.y,
      element.GetWidth(),
      element.GetHeight()
    );
  }

  DrawElements(elements: Array<ParachutistModel> | null | undefined): void {
    if (!elements) return;

    for (let element of elements) {
      this.context?.fillRect(
        element.pos.x,
        element.pos.y,
        element.GetWidth(),
        element.GetHeight()
      );
    }
  }

  UpdateScoreboard(score: number, lives: number): void {
    if (this.scoreValueElement)
      this.scoreValueElement.innerHTML = score.toString();
    if (this.livesValueElement)
      this.livesValueElement.innerHTML = lives.toString();
  }

  Clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height - 150);
  }

  ShowGameOver(): void {
    if (this.gameOvereElement) this.gameOvereElement.innerHTML = "Game Over";
  }
}
