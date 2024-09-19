import { Container, Graphics } from 'pixi.js';

export interface PlayerConfig {
  x: number
  y: number
  maxY: number
	width: number
	height: number
  control?: KeyboardControl | 'target'
}

export class KeyboardControl {
  keyLeft: string
  keyRight: string

  constructor(keyLeft: string, keyRight: string) {
    this.keyLeft = keyLeft;
    this.keyRight = keyRight;
  }
}

export class Player {
  private view: Graphics = new Graphics();
	x: number;
	y: number;
	width: number;
	height: number;
  private maxY: number;
  private speed: number = 5;
  runDirection: null | 'up' | 'down' = null
  score: number = 0;

  constructor(config: PlayerConfig) {
    this.maxY = config.maxY;
    this.x = config.x;
    this.y = config.y;
    this.width = config.width;
    this.height = config.height;

		this.onTick();

		if (config.control instanceof KeyboardControl) {
			this.controlByKeyboard(config.control);
		}
  }

	private controlByKeyboard(config: KeyboardControl) {
    document.addEventListener('keydown', (event) => {
      if (event.key === config.keyLeft) {
        this.runDirection = 'up';
      } else if (event.key === config.keyRight) {
        this.runDirection = 'down';
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.key === config.keyLeft) {
        this.runDirection = null;
      } else if (event.key === config.keyRight) {
        this.runDirection = null;
      }
    });
	}

  controlByTarget(target: number) {
    if (target > this.y) {
      this.runDirection = 'down';
    } else if (target < this.y) {
      this.runDirection = 'up';
    } else {
      this.runDirection = null;
    }
  }

  onTick() {
    switch (this.runDirection) {
      case('up'): {
        this.y = Math.max(this.y - this.speed, 0);
        break;
      };
      case('down'): {
        this.y = Math.min(this.y + this.speed, this.maxY);
        break;
      };
      default: break;
    }

    this.view.clear().rect(this.x, this.y, this.width, this.height).fill('#fff');
  }

  public render(stage: Container): void {
    stage.addChild(this.view);
  }

  public destroy(): void {
    this.view.destroy();
  }
}