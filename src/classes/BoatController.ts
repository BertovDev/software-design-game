import BoatModel from "./BoatModel";
import InputManager from "./InputManager";

export default class BoatController {
  private boatModel: BoatModel | null;
  private inputManager: InputManager | null;

  constructor() {
    this.boatModel = null;
    this.inputManager = null;
  }

  Move(): void {
    if (!this.inputManager || !this.boatModel) return;

    if (this.inputManager.GetmoveLeft())
      this.boatModel.pos.x -= this.boatModel.GetSpeed();
    if (this.inputManager.GetmoveRight())
      this.boatModel.pos.x += this.boatModel.GetSpeed();
  }

  SetboatModel(model: BoatModel) {
    this.boatModel = model;
  }

  SetInputManager(input: InputManager) {
    this.inputManager = input;
  }

  GetBoatModel(): BoatModel | null {
    return this.boatModel;
  }
}
