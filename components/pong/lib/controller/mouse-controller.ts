import type { Player } from '../components/player';
import { Controller } from './interface';

export class MouseController extends Controller {
	y = 0;
	constructor() {
		super();
		document.addEventListener('pointermove', this.handlePointerMove);
	}

	handlePointerMove = (event: PointerEvent) => {
		this.y = event.y;
	};

	override getDirection = (player: Player): null | 'up' | 'down' => {
		if (player.centerY - this.y < 0) {
			return 'down';
		}
		else {
			return 'up';
		}
	};

	override destroy(): void {
		document.removeEventListener('pointermove', this.handlePointerMove);
	}
}
