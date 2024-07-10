import { Vector } from "~/types";
import GameObject from "./GameObject";

export default class ParachutistModel extends GameObject {
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
