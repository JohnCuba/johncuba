import { type Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';

export interface PlayerConfig {
	x: number;
	y: number;
	maxY: number;
	width: number;
	height: number;
	control: Coordinator['options']['controlBy'] | 'target';
	speed?: number;
}

export class Player {
	private view: Graphics = new Graphics();
	x: number;
	y: number;
	width: number;
	height: number;
	private maxY: number;
	private speed = 5;
	runDirection: null | 'up' | 'down' = null;
	score = 0;
	control: PlayerConfig['control'];

	constructor(config: PlayerConfig) {
		this.maxY = config.maxY;
		this.x = config.x;
		this.y = config.y;
		this.width = config.width;
		this.height = config.height;
		this.speed = config.speed || 5;
		this.control = config.control;

		if (config.control === 'keyboard') {
			this.setupControlByKeyboard();
		}
	}

	// Control by mouse start
	private handlePointerMove = (event: PointerEvent) => {
		this.onTick(event.y);
	};

	private setupControlByMouse = () => {
		document.addEventListener('pointermove', this.handlePointerMove);
	};

	private destroyControlByMouse() {
		document.removeEventListener('pointermove', this.handlePointerMove);
	}
	// Control by mouse end

	// Control by keyboard start
	private handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			this.runDirection = 'up';
		} else if (event.key === 'ArrowDown') {
			this.runDirection = 'down';
		}
	};

	private handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			this.runDirection = null;
		}
	};

	private setupControlByKeyboard() {
		document.addEventListener('keydown', this.handleKeyDown);
		document.addEventListener('keyup', this.handleKeyUp);
	}

	private destroyControlByKeyboard() {
		document.removeEventListener('keydown', this.handleKeyDown);
		document.removeEventListener('keyup', this.handleKeyUp);
	}
	// Control by keyboard end

	onTickByTarget(target: number) {
		if (target > this.y) {
			this.runDirection = 'down';
		} else if (target < this.y) {
			this.runDirection = 'up';
		} else {
			this.runDirection = null;
		}

		this.onTick();
	}

	onTick(y?: number) {
		if (y) this.y = y;

		switch (this.runDirection) {
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
	}

	public render(stage: Container): void {
		if (this.control === 'mouse') {
			this.setupControlByMouse();
		}

		stage.addChild(this.view);
	}

	public destroy(): void {
		this.destroyControlByKeyboard();
		this.destroyControlByMouse();
		this.view.destroy();
	}
}
