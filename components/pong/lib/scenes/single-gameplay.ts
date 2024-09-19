import { Container } from 'pixi.js';
import type { Scene } from './types';
import type { Coordinator } from '../coordinator';
import { KeyboardControl, Player } from '../components/player';
import { Ball } from '../components/ball';
import { Markup } from '../components/markup';
import { EndGame } from './end-game';

export class SingleGameplay implements Scene {

	view: Container = new Container();
	markup: Markup;
	player: Player;
	npc: Player;
	ball: Ball;

	paddleSideGap: number = 20;
	paddleHeight: number;
	paddleWidth: number;

	constructor(
		protected coordinator: Coordinator
	) {
		this.paddleHeight = this.coordinator.pixiApp.canvas.height * 0.2;
		this.paddleWidth = this.coordinator.pixiApp.canvas.width * 0.01;
		this.markup = this.createMarkup();
		this.player = this.createPlayer();
		this.npc = this.createNpc();
		this.ball = this.createBall();
	}

	private createMarkup() {
		return new Markup({
			endX: this.coordinator.pixiApp.canvas.width,
			endY: this.coordinator.pixiApp.canvas.height,
			width: 1,
		})
	}

	private createPlayer() {
		const player = new Player({
			x: this.paddleSideGap,
			y: 0,
			width: this.paddleWidth,
			height: this.paddleHeight,
			maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
			control: new KeyboardControl('ArrowUp', 'ArrowDown'),
		});
		return player;
	}

	private createNpc() {
		const npc = new Player({
			x: this.coordinator.pixiApp.canvas.width - this.paddleWidth - this.paddleSideGap,
			y: 0,
			maxY: this.coordinator.pixiApp.canvas.height - this.paddleHeight,
			width: this.paddleWidth,
			height: this.paddleHeight,
		});
		return npc;
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

	checkCollision = (player: Player) => {
		return !(
			this.ball.x + this.ball.radius < player.x ||
			player.x + this.paddleWidth < this.ball.x ||
			this.ball.y + this.ball.radius < player.y ||
			player.y + this.paddleHeight < this.ball.y
		)
	}

	checkBallHitPlayer() {
		const player = [this.player, this.npc].find(this.checkCollision);

		if (player) {
			const playerMiddle = player.y + (this.paddleHeight / 2);
			const ballMiddle = this.ball.y + (this.ball.radius / 2);
			const middleDelta = ballMiddle - playerMiddle;
			this.ball.velocityX = -this.ball.velocityX;
			this.ball.velocityY = middleDelta * 0.08;
		}
	}

	playerPass() {
		this.markup.score[1] += 1;
		this.ball.reset({
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: 4,
			velocityY: 0,
		});
	}

	npcPass() {
		this.markup.score[0] += 1;
		this.ball.reset({
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: -4,
			velocityY: 0,
		});
	}

	checkBallHitSide() {
		if (this.ball.x < 0) {
			this.playerPass();
		};

    if (this.ball.x + this.ball.radius > this.coordinator.pixiApp.canvas.width) {
      this.npcPass();
    }

    if (this.ball.y + this.ball.radius > this.coordinator.pixiApp.canvas.height || this.ball.y < 0) {
      this.ball.velocityY = -this.ball.velocityY;
    }
	}

	checkScore() {
		const score = this.markup.score.find((score) => score >= 5);
		if (!score) return;

		this.coordinator.goToScene(new EndGame(this.coordinator, this.markup.score));
	}

	onStart(): void {
		this.markup.render(this.coordinator.pixiApp.stage);
		this.player.render(this.coordinator.pixiApp.stage);
		this.npc.render(this.coordinator.pixiApp.stage);
		this.ball.render(this.coordinator.pixiApp.stage);
	}

	onTick = () => {
		this.player.onTick();
		this.npc.controlByTarget(this.ball.y);
		this.npc.onTick();
		this.checkBallHitPlayer();
		this.checkBallHitSide();
		this.ball.onTick();
		this.markup.onTick();
		this.checkScore();
	}

	onFinish(): void {
		this.player.destroy();
		this.npc.destroy();
		this.ball.destroy();
	}
}