import CanvasView from "~/view/CanvasView";
import BoatController from "./BoatController";
import CollisionManager from "./CollisionManager";
import InputManager from "./InputManager";
import PlaneController from "./PlaneController";
import ScoreManager from "./ScoreManager";
import PlaneModel from "./PlaneModel";
import BoatModel from "./BoatModel";
import ParachutistController from "./ParachutistController";

export default class GameManager {
  private collisionManager: CollisionManager | null;
  private scoreManager: ScoreManager | null;
  private inputManager: InputManager | null;
  private boatController: BoatController | null;
  private planeController: PlaneController | null;
  private view: CanvasView | null;
  private parachutistController: ParachutistController | null;

  private BOAT_SPEED: number = 10;
  private PLANE_SPEED: number = 10;

  constructor() {
    this.collisionManager = new CollisionManager();
    this.scoreManager = new ScoreManager();
    this.inputManager = new InputManager();
    this.boatController = new BoatController();
    this.planeController = new PlaneController();
    this.parachutistController = new ParachutistController();
    this.view = null;
  }

  Setup(view: CanvasView): void {
    if (!this.boatController || !this.planeController || !this.inputManager) {
      throw new Error("Missing required components");
      return;
    }

    this.view = view;

    const plane = new PlaneModel(
      100,
      100,
      { x: this.view.canvas.width, y: 0 },
      this.PLANE_SPEED,
      "planeImage"
    );

    const boat = new BoatModel(
      150,
      150,
      { x: this.view.canvas.width / 2 - 75, y: this.view.canvas.height - 250 },
      this.BOAT_SPEED,
      "planeImage"
    );

    this.planeController.SetPlaneModel(plane);
    this.boatController.SetboatModel(boat);
    this.boatController.SetInputManager(this.inputManager);
  }

  ManageScoreAndLives(waterPosition: number): void {
    this.parachutistController?.GetParachutistList()?.forEach((parachutist) => {
      if (
        this.boatController &&
        this.collisionManager?.isCollidingWithBoat(
          parachutist,
          this.boatController?.GetBoatModel()
        )
      ) {
        this.parachutistController?.RemoveParachutist(parachutist);
        this.scoreManager?.IncreaseScore();
      }

      if (
        this.collisionManager?.isCollidingWithWater(parachutist, waterPosition)
      ) {
        this.parachutistController?.RemoveParachutist(parachutist);
        this.scoreManager?.DecreaseLives();
      }
    });

    if (this.scoreManager) {
      this.view?.UpdateScoreboard(
        this.scoreManager?.GetScore(),
        this.scoreManager?.Getlives()
      );
    }
  }

  IsGameOver(): boolean {
    if (this.scoreManager && this.scoreManager?.Getlives() <= 0) {
      console.log("Game Over , try again :D");
      this.view?.ShowGameOver();
      return true;
    }
    return false;
  }

  GetPlaneController(): PlaneController | null {
    return this.planeController;
  }

  GetBoatController(): BoatController | null {
    return this.boatController;
  }
  GetCollisionManager(): CollisionManager | null {
    return this.collisionManager;
  }

  GetParachutistController(): ParachutistController | null {
    return this.parachutistController;
  }
}
