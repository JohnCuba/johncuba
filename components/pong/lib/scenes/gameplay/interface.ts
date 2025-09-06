import { Container, type TickerCallback } from 'pixi.js';
import { Ball } from '../../components/ball';
import { Markup } from '../../components/markup';
import type { Player } from '../../components/player';
import type { Coordinator } from '../../coordinator';
import { EndGame } from '../end-game';
import type { Scene } from '../types';
import { FollowAutoController } from '../../controller/follow-auto-controller';
import { KeyboardController } from '../../controller/keyboard-controller';
import { MouseController } from '../../controller/mouse-controller';

export abstract class Gameplay implements Scene {
	view: Container = new Container();
	markup: Markup;
	players: Player[] = [];
	ball: Ball;
	winScore = 5;
	hittedPlayer: Player | null = null;

	paddleSideGap = 20;
	paddleHeight: number;
	paddleWidth: number;

	constructor(protected coordinator: Coordinator) {
		this.paddleHeight = this.coordinator.pixiApp.canvas.height * 0.2;
		this.paddleWidth = this.coordinator.pixiApp.canvas.width * 0.01;
		this.markup = this.createMarkup();
		this.ball = this.createBall();
	}

	protected getController(control: 'mouse' | 'keyboard' | 'followAuto') {
		switch (control) {
			case 'mouse': return new MouseController();
			case 'keyboard': return new KeyboardController();
			case 'followAuto': return new FollowAutoController();
		}
	};

	createMarkup() {
		return new Markup({
			endX: this.coordinator.pixiApp.canvas.width,
			endY: this.coordinator.pixiApp.canvas.height,
			width: 1,
		});
	}

	createPlayers(): Player[] {
		throw new Error('Gameplay: Method createPlayers not implemented.');
	}

	private createBall() {
		const ball = new Ball({
			radius: this.coordinator.pixiApp.canvas.height * 0.06,
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: 4,
		});

		return ball;
	}

	private checkCollision = (player: Player) => {
		return !(
			this.ball.x + this.ball.radius < player.x
			|| player.x + this.paddleWidth < this.ball.x
			|| this.ball.y + this.ball.radius < player.y
			|| player.y + this.paddleHeight < this.ball.y
		);
	};

	protected checkBallHitPlayer() {
		const player = this.players.find(this.checkCollision);

		if (player) {
			this.hittedPlayer = player;
			const ballMiddle = this.ball.y + this.ball.radius / 2;
			const middleDelta = ballMiddle - player.centerY;
			this.ball.velocityX = -this.ball.velocityX;
			this.ball.velocityY = middleDelta * 0.08;
		}
	}

	protected checkBallHitSide() {
		if (
			this.ball.y + this.ball.radius > this.coordinator.pixiApp.canvas.height
			|| this.ball.y < 0
		) {
			this.ball.velocityY = -this.ball.velocityY;
		}
	}

	protected checkGoal() {
		if (this.ball.x >= 0 && this.ball.x <= this.coordinator.pixiApp.canvas.width) return;

		this.ball.reset({
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: this.ball.x <= 0 ? 4 : -4,
			velocityY: 0,
		});

		// Not count miseed ball from game start
		if (!this.hittedPlayer) return;

		++this.hittedPlayer.score;
		const scores = this.players.map(player => player.score) as typeof this.markup.score;
		this.markup.score = scores;

		if (this.hittedPlayer.score < this.winScore) return;

		this.coordinator.goToScene(
			new EndGame(this.coordinator, scores),
		);
	}

	onStart(): void {
		this.markup.render(this.coordinator.pixiApp.stage);
		this.players.forEach(player => player.render(this.coordinator.pixiApp.stage));
		this.ball.render(this.coordinator.pixiApp.stage);
	}

	onTick: TickerCallback<unknown> = () => {
		throw new Error('Method not implemented.');
	};

	onFinish(): void {
		this.players.forEach(player => player.destroy());
		this.ball.destroy();
		this.view.destroy();
	}
}
