import { Player } from '../../components/player';
import type { Coordinator } from '../../coordinator';
import { Gameplay } from './interface';

export class MultiplayerLocalGameplay extends Gameplay {
	constructor(coordinator: Coordinator, protected playerControl: 'mouse' | 'keyboard') {
		super(coordinator);
		this.players = this.createPlayers();
	}

	override createPlayers() {
		return [
			new Player({
				x: this.paddleSideGap,
				y: 0,
				width: this.paddleWidth,
				height: this.paddleHeight,
				maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
				controller: this.getController(this.playerControl),
			}),
			new Player({
				x:
					this.coordinator.pixiApp.canvas.width
					- this.paddleWidth
					- this.paddleSideGap,
				y: 0,
				width: this.paddleWidth,
				height: this.paddleHeight,
				maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
				controller: this.getController(this.playerControl === 'mouse' ? 'keyboard' : 'mouse'),
			}),
		];
	}

	override onTick = () => {
		this.players.forEach(player => player.onTick(this.ball));
		this.checkBallHitPlayer();
		this.checkBallHitSide();
		this.ball.onTick();
		this.markup.onTick();
		this.checkGoal();
	};
}
