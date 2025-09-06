import type { Player } from '../components/player';
import { Controller } from './interface';

export class KeyboardController extends Controller {
	runDirection: null | 'up' | 'down' = null;

	constructor() {
		super();
		document.addEventListener('keydown', this.handleKeyDown);
		document.addEventListener('keyup', this.handleKeyUp);
	}

	handleKeyUp = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
			this.runDirection = null;
		}
	};

	override getDirection = (_player: Player): null | 'up' | 'down' => {
		return this.runDirection;
	};

	handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === 'ArrowUp') {
			this.runDirection = 'up';
		}
		else if (event.key === 'ArrowDown') {
			this.runDirection = 'down';
		}
	};

	override destroy() {
		document.removeEventListener('keydown', this.handleKeyDown);
		document.removeEventListener('keyup', this.handleKeyUp);
	}
}
