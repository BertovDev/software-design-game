export default class ScoreManager {
  private lives: number;
  private score: number;

  constructor() {
    this.lives = 3;
    this.score = 0;
  }

  IncreaseScore(): void {
    this.score += 10;
  }

  DecreaseLives(): void {
    this.lives -= 1;
  }

  GetScore(): number {
    return this.score;
  }

  Getlives(): number {
    return this.lives;
  }
}
