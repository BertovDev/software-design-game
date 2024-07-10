import { Vector } from "~/types";
import GameObject from "./GameObject";

export default class PlaneModel extends GameObject {
  private initPosX: number;

  constructor(
    width: number,
    height: number,
    position: Vector,
    speed: number,
    image: string
  ) {
    super(width, height, position, speed, image);
    this.initPosX = position.x;
  }

  get initPositionX(): number {
    return this.initPosX;
  }
}
