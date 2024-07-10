import { Vector } from "~/types";

export default abstract class GameObject {
  private image: HTMLImageElement = new Image();

  constructor(
    private width: number,
    private height: number,
    private position: Vector,
    private speed: number,
    image: string
  ) {
    this.height = height;
    this.width = width;
    this.position = position;
    this.speed = speed;
    this.image.src = image;
  }

  GetPosition(): Vector {
    return this.position;
  }

  GetWidth(): number {
    return this.width;
  }
  GetHeight(): number {
    return this.height;
  }

  get pos(): Vector {
    return this.position;
  }

  set pos(newPos: Vector) {
    this.position = newPos;
  }

  GetSpeed(): number {
    return this.speed;
  }

  get currentImage(): HTMLImageElement {
    return this.image;
  }
}
