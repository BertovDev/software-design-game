import GameObject from "./GameObject";
import { Vector } from "~/types";

export default class BoatModel extends GameObject {
  constructor(
    width: number,
    height: number,
    position: Vector,
    speed: number,
    image: string
  ) {
    super(width, height, position, speed, image);
  }
}
