import ParachutistModel from "./ParachutistModel";

export default class ParachutistController {
  private parachutistList: Array<ParachutistModel> | null;

  constructor() {
    this.parachutistList = [];
  }

  GetParachutistList(): Array<ParachutistModel> | null {
    return this.parachutistList;
  }

  MoveParachutist(): void {
    if (!this.parachutistList) return;
    for (let parachutist of this.parachutistList) {
      parachutist.pos.y += parachutist.GetSpeed();
    }
  }

  CreateParachutist(posX: number): void {
    const newPos = { x: posX, y: 0 };
    const newParachutist = new ParachutistModel(
      50,
      50,
      newPos,
      5,
      "parachute.png"
    );
    this.parachutistList?.push(newParachutist);
  }

  RemoveParachutist(parachutist: ParachutistModel): void {
    if (!this.parachutistList) return;
    const index = this.parachutistList.indexOf(parachutist);
    if (index > -1) this.parachutistList.splice(index, 1);
  }
}
