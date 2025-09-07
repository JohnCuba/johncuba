import { Player } from '../../components/player';
import { Gameplay } from './interface';

export class MultiplayerGameplay extends Gameplay {
	override createPlayers() {
		console.log('BUM');
		return [
			new Player({
				x: this.paddleSideGap,
				y: 0,
				width: this.paddleWidth,
				height: this.paddleHeight,
				maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
				controller: this.getController(this.coordinator.options.control[0]),
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
				controller: this.getController(this.coordinator.options.control[1]),
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
