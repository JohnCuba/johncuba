import type { Ball } from '../components/ball';
import type { Player } from '../components/player';
import { Controller } from './interface';

export class FollowAutoController extends Controller {
	override getDirection(player: Player, ball: Ball): null | 'up' | 'down' {
		if (player.centerY < ball.centerY) {
			return 'down';
		}
		else if (player.centerY > ball.centerY) {
			return 'up';
		}

		return null;
	}
}
