import CanvasView from "~/view/CanvasView";
import GameManager from "./GameManager";
import PlaneController from "./PlaneController";
import BoatController from "./BoatController";
import ParachutistController from "./ParachutistController";
import PlaneModel from "./PlaneModel";
import BoatModel from "./BoatModel";

export default class Game {
  private currentTime: number | 0;
  private startTime: number | 0;
  private elapsedTime: number | 0;
  private lastSpawned: number | 0;

  private planeController: PlaneController | null;
  private boatController: BoatController | null;
  private parachutistController: ParachutistController | null;

  private planeModel: PlaneModel | null;
  private boatModel: BoatModel | null;

  private view: CanvasView | null;
  private gameManager: GameManager | null;

  private SEA_POSITION: number = 0;

  constructor() {
    this.currentTime = 0;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.lastSpawned = 0;

    this.view = null;
    this.gameManager = null;

    this.planeController = null;
    this.boatController = null;
    this.parachutistController = null;

    this.planeModel = null;
    this.boatModel = null;
  }

  Init(): void {
    this.view = new CanvasView("viewport");
    this.gameManager = new GameManager();
    this.gameManager.Setup(this.view);
    this.SEA_POSITION = this.view.canvas.width - 150;

    this.planeController = this.gameManager.GetPlaneController();
    this.boatController = this.gameManager.GetBoatController();
    this.parachutistController = this.gameManager.GetParachutistController();

    if (this.planeController && this.boatController) {
      this.planeModel = this.planeController?.GetPlaneModel();
      this.boatModel = this.boatController?.GetBoatModel();
    }

    this.view.Init();
  }

  GameLoop(): void {
    if (!this.gameManager || !this.view) return;

    if (this.startTime === 0) this.startTime = Date.now();
    this.currentTime = Date.now();
    this.elapsedTime = (this.currentTime - this.startTime) / 1000;

    this.view.Clear();
    this.view.DrawElement(this.planeModel);
    this.view.DrawElement(this.boatModel);

    // Spawn check
    let spawnRate = Math.random() * 8 + 1;

    if (
      this.elapsedTime > 1 &&
      this.elapsedTime - this.lastSpawned > spawnRate - this.elapsedTime / 50
    ) {
      if (
        this.planeModel &&
        this.planeModel.pos.x > 0 &&
        this.planeModel.pos.x < this.view.canvas.width
      ) {
        this.parachutistController?.CreateParachutist(this.planeModel.pos.x);
        this.lastSpawned = this.elapsedTime;
        this.elapsedTime = 0;
      }
    }

    this.view.DrawElements(this.parachutistController?.GetParachutistList());

    // Movement
    this.planeController?.MovePlane();
    this.parachutistController?.MoveParachutist();
    this.boatController?.Move();

    // Game State
    this.gameManager.ManageScoreAndLives(this.SEA_POSITION);
    if (this.gameManager.IsGameOver()) return;

    requestAnimationFrame(() => this.GameLoop());
  }
}
