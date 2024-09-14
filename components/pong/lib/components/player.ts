import { Container, Graphics } from 'pixi.js';

export interface PlayerConfig {
  x: number
  y: number
  maxY: number
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
	static width: number = 25;
	static height: number = 200; 
  private speed: number = 5;
  private config: PlayerConfig;
  runDirection: null | 'up' | 'down' = null
  score: number = 0;

  get x() {
    return this.config.x;
  }

  get y() {
    return this.config.y;
  }

  constructor(config: PlayerConfig) {
    this.config = config;

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
    if (target > this.config.y) {
      this.runDirection = 'down';
    } else if (target < this.config.y) {
      this.runDirection = 'up';
    } else {
      this.runDirection = null;
    }
  }

  onTick() {
    switch (this.runDirection) {
      case('up'): {
        this.config.y = Math.max(this.config.y - this.speed, 0);
        break;
      };
      case('down'): {
        this.config.y = Math.min(this.config.y + this.speed, this.config.maxY);
        break;
      };
      default: break;
    }

    this.view.clear().rect(this.config.x, this.config.y, Player.width, Player.height).fill('#fff');
  }

  public render(stage: Container): void {
    stage.addChild(this.view);
  }

  public destroy(): void {
    this.view.destroy();
  }
}