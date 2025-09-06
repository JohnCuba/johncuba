import { type Container, Graphics } from 'pixi.js';
import type { Controller } from '../controller/interface';
import type { Ball } from './ball';

export type RunDirections = null | 'up' | 'down';

export interface PlayerConfig {
	x: number;
	y: number;
	maxY: number;
	width: number;
	height: number;
	speed?: number;
	controller: Controller;
}

export class Player {
	private view: Graphics = new Graphics();
	x: number;
	y: number;
	width: number;
	height: number;
	private maxY: number;
	private speed = 5;
	score = 0;
	controller: Controller;

	get centerY() {
		return this.y + this.height / 2;
	}

	constructor(config: PlayerConfig) {
		this.maxY = config.maxY;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.speed = config.speed || 5;
		this.controller = config.controller;
	}

	onTick(ball: Ball) {
		switch (this.controller.getDirection(this, ball)) {
			case 'up': {
				this.y = Math.max(this.y - this.speed, 0);
				break;
			}
			case 'down': {
				this.y = Math.min(this.y + this.speed, this.maxY);
				break;
			}
			default:
				break;
		}

		this.view
			.clear()
			.rect(this.x, this.y, this.width, this.height)
			.fill('#fff');
	};

	public render(stage: Container): void {
		stage.addChild(this.view);
	}

	public destroy(): void {
		this.controller.destroy();
		this.view.destroy();
	}
}
