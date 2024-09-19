import { Container, Graphics } from 'pixi.js';

interface BallConfig {
	radius?: number
	x: number
	y: number
	velocityX?: number
	velocityY?: number
}

export class Ball {
	private view: Graphics;
	x: number = 0;
	y: number = 0;
	velocityX: number = 0;
	velocityY: number = 0;
	radius: number = 50;

	constructor(config: BallConfig) {
		this.view = this.createView();
		this.reset(config);
	}

	private createView() {
		const view = new Graphics().rect(
			this.x,
			this.y,
			this.radius,
			this.radius
		)
		.fill('#fff');

		return view;
	}

	reset(config: BallConfig) {
		this.x = config.x;
		this.y = config.y;
		this.radius = config.radius || this.radius;
		this.velocityX = typeof config.velocityX === 'number' ? config.velocityX : this.velocityX;
		this.velocityY = typeof config.velocityY === 'number' ? config.velocityY : this.velocityY;
	}

	render(stage: Container) {
		stage.addChild(this.view);
	}

	onTick() {
    this.x += this.velocityX;
    this.y += this.velocityY;

		this.view.clear().rect(
			this.x,
			this.y,
			this.radius,
			this.radius,
		)
		.fill('#fff');
	}

  public destroy(): void {
    this.view.destroy();
  }
}