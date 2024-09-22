import { Gameplay } from './gameplay';
import { Player } from '../../components/player';

export class SingleplayerGameplay extends Gameplay {
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
		const npc = new Player({
			x: this.coordinator.pixiApp.canvas.width - this.paddleWidth - this.paddleSideGap,
			y: 0,
			maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
			width: this.paddleWidth,
			height: this.paddleHeight,
			speed: 4,
			control: 'target'
		});
		return npc;
	}

	override onTick = () => {
		this.playerLeft.onTick();
		this.playerRight.onTickByTarget(this.ball.y);
		this.checkBallHitPlayer();
		this.checkBallHitSide();
		this.ball.onTick();
		this.markup.onTick();
		this.checkScore();
	}
}