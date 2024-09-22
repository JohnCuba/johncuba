import { Container, type ContainerChild, type TickerCallback } from "pixi.js";
import type { Scene } from "../types";
import { Markup } from "../../components/markup";
import type { Coordinator } from "../../coordinator";
import { Ball } from "../../components/ball";
import type { Player } from "../../components/player";
import { EndGame } from "../end-game";

export abstract class Gameplay implements Scene {
	view: Container = new Container();
	markup: Markup;
	playerLeft: Player;
	playerRight: Player;
	ball: Ball;

	paddleSideGap: number = 20;
	paddleHeight: number;
	paddleWidth: number;

	constructor(
		protected coordinator: Coordinator,
	) {
		this.paddleHeight = this.coordinator.pixiApp.canvas.height * 0.2;
		this.paddleWidth = this.coordinator.pixiApp.canvas.width * 0.01;
		this.markup = this.createMarkup();
		this.playerLeft = this.createPlayerLeft();
		this.playerRight = this.createPlayerRight();
		this.ball = this.createBall();
	}

	createMarkup() {
		return new Markup({
			endX: this.coordinator.pixiApp.canvas.width,
			endY: this.coordinator.pixiApp.canvas.height,
			width: 1,
		})
	}

	createPlayerLeft(): Player {
		throw new Error("Gameplay: Method createPlayerLeft not implemented.");
	}

	createPlayerRight(): Player {
		throw new Error("Gameplay: Method createPlayerRight not implemented.");
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
			this.ball.x + this.ball.radius < player.x ||
			player.x + this.paddleWidth < this.ball.x ||
			this.ball.y + this.ball.radius < player.y ||
			player.y + this.paddleHeight < this.ball.y
		)
	}

	protected checkBallHitPlayer() {
		const player = [this.playerLeft, this.playerRight].find(this.checkCollision);

		if (player) {
			const playerMiddle = player.y + (this.paddleHeight / 2);
			const ballMiddle = this.ball.y + (this.ball.radius / 2);
			const middleDelta = ballMiddle - playerMiddle;
			this.ball.velocityX = -this.ball.velocityX;
			this.ball.velocityY = middleDelta * 0.08;
		}
	}

	private playerRightPass() {
		this.markup.score[1] += 1;
		this.ball.reset({
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: 4,
			velocityY: 0,
		});
	}

	private playerLeftPass() {
		this.markup.score[0] += 1;
		this.ball.reset({
			x: (this.coordinator.pixiApp.canvas.width - 50) / 2,
			y: (this.coordinator.pixiApp.canvas.height - 50) / 2,
			velocityX: -4,
			velocityY: 0,
		});
	}

	protected checkBallHitSide() {
		if (this.ball.x < 0) {
			this.playerRightPass();
		};

    if (this.ball.x + this.ball.radius > this.coordinator.pixiApp.canvas.width) {
      this.playerLeftPass();
    }

    if (this.ball.y + this.ball.radius > this.coordinator.pixiApp.canvas.height || this.ball.y < 0) {
      this.ball.velocityY = -this.ball.velocityY;
    }
	}

	protected checkScore() {
		const score = this.markup.score.find((score) => score >= 5);
		if (!score) return;

		this.coordinator.goToScene(new EndGame(this.coordinator, this.markup.score));
	}

	onStart(): void {
		this.markup.render(this.coordinator.pixiApp.stage);
		this.playerLeft.render(this.coordinator.pixiApp.stage);
		this.playerRight.render(this.coordinator.pixiApp.stage);
		this.ball.render(this.coordinator.pixiApp.stage);
	}

	onTick: TickerCallback<any> = () => {
		throw new Error("Method not implemented.");
	};

	onFinish(): void {
		this.playerLeft.destroy();
		this.playerRight.destroy();
		this.ball.destroy();
		this.view.destroy();
	}
}