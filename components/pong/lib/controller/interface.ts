import type { Ball } from '../components/ball';
import type { Player } from '../components/player';

export abstract class Controller {
	getDirection(_player: Player, _ball: Ball): null | 'up' | 'down' {
		return null;
	}

	destroy() {
	}
};
