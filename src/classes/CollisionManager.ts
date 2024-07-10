import BoatController from "./BoatController";
import BoatModel from "./BoatModel";
import ParachutistController from "./ParachutistController";
import ParachutistModel from "./ParachutistModel";

export default class Collision {
  isCollidingWithBoat(
    parachutist: ParachutistModel,
    boatModel: BoatModel | null
  ): boolean {
    let isColliding = false;
    if (!boatModel) return false;
    if (
      boatModel.pos.x < parachutist.pos.x + parachutist.GetWidth() &&
      boatModel.pos.x + boatModel.GetWidth() > parachutist.pos.x &&
      boatModel.pos.y < parachutist.pos.y + parachutist.GetHeight() &&
      boatModel.pos.y + boatModel.GetHeight() > parachutist.pos.y
    ) {
      isColliding = true;
    }

    return isColliding;
  }

  isCollidingWithWater(
    parachutist: ParachutistModel,
    waterPosition: number
  ): boolean {
    return parachutist.pos.y > waterPosition;
  }
}
