import PlaneModel from "./PlaneModel";

export default class PlaneController {
  private planeModel: PlaneModel | null;

  constructor() {
    this.planeModel = null;
  }

  SetPlaneModel(model: PlaneModel) {
    this.planeModel = model;
  }

  GetPlaneModel(): PlaneModel | null {
    return this.planeModel;
  }

  ResetPos() {
    if (this.planeModel)
      this.planeModel.pos = { x: this.planeModel.initPositionX + 100, y: 0 };
  }

  MovePlane(): void {
    if (this.planeModel) {
      if (this.planeModel.pos.x < -100) {
        this.ResetPos();
      }
      this.planeModel.pos.x -= this.planeModel.GetSpeed();
    }
  }
}
