import { Player } from '../../components/player';
import { Gameplay } from './interface';

export class MultiplayerLocalGameplay extends Gameplay {
	override createPlayerLeft() {
		const player = new Player({
			x: this.paddleSideGap,
			y: 0,
			width: this.paddleWidth,
			height: this.paddleHeight,
			maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
			control: this.coordinator.options.controlBy,
		});
		return player;
	}

	override createPlayerRight() {
		const player = new Player({
			x:
				this.coordinator.pixiApp.canvas.width
				- this.paddleWidth
				- this.paddleSideGap,
			y: 0,
			width: this.paddleWidth,
			height: this.paddleHeight,
			maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
			control:
				this.coordinator.options.controlBy === 'keyboard'
					? 'mouse'
					: 'keyboard',
		});
		return player;
	}

	override onTick = () => {
		this.playerLeft.onTick();
		this.playerRight.onTick();
		this.checkBallHitPlayer();
		this.checkBallHitSide();
		this.ball.onTick();
		this.markup.onTick();
		this.checkScore();
	};
}
