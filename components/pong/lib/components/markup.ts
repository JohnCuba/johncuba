import { Color, Container, FillGradient, Graphics, Text, TextStyle } from "pixi.js";

interface MarkupConfig {
	endX: number
	endY: number
	width: number
}

export class Markup {
	private middleLine: Graphics;
	score: number[] = [0, 0];
	private scoreLeft: Text;
	private scoreRight: Text;

	constructor(
		protected config: MarkupConfig
	) {
		this.middleLine = this.createMiddleLine();
		[this.scoreLeft, this.scoreRight] = this.createScore();
	}
	
	private createMiddleLine() {
		const view = new Graphics().rect(
			(this.config.endX - this.config.width) / 2,
			0,
			this.config.width,
			this.config.endY,
		)
		.fill('#fff');

		return view;
	}

	private createScore() {
		const scoreLeft = new Text({
			text: this.score[0],
			y: 50,
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient(0, 0, 0, 0).addColorStop(0, Color.shared.setValue(0xffffff)),
			})
		});
		scoreLeft.x = (this.config.endX / 2) - 50 - scoreLeft.width;

		const scoreRight = new Text({
			text: this.score[1],
			y: 50,
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient(0, 0, 0, 0).addColorStop(0, Color.shared.setValue(0xffffff)),
			})
		});
		scoreRight.x = (this.config.endX / 2) + 50;

		return [scoreLeft, scoreRight];
	}

	onTick() {
		this.scoreLeft.text = this.score[0];
		this.scoreRight.text = this.score[1];
	}

	render(stage: Container) {
		stage.addChild(this.middleLine, this.scoreLeft, this.scoreRight);
	}
}