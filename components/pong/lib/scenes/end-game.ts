import { Color, Container, FillGradient, Graphics, Text, TextStyle, type ContainerChild, type TickerCallback } from 'pixi.js';
import type { Scene } from './types';
import { Button } from '@pixi/ui';
import type { Coordinator } from '../coordinator';
import { SingleGameplay } from './single-gameplay';

export class EndGame implements Scene {
	view: Container = new Container();
	playAgen: Button;
	title: Text;

	constructor(
		protected coordinator: Coordinator,
		scores: number[]
	) {
		this.playAgen = this.createPlayAgen();
		this.title = this.createTitle(scores);
	}

	private createTitle(scores: number[]) {
		const text = new Text({
			text: `${scores[0] >= 5 ? 'Left' : 'Right'} player win! ${scores.join(' - ')}`,
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient(0, 0, 0, 0).addColorStop(0, Color.shared.setValue(0xffffff)),
			}),
		});
		text.x = (this.coordinator.pixiApp.canvas.width - text.width) / 2;
		text.y = this.coordinator.pixiApp.canvas.height / 3;

		return text;
	}

	private createPlayAgen() {
		const text = new Text({
			text: 'play agen',
			style: new TextStyle({
				fontFamily: 'New Amsterdam',
				fontSize: 64,
				fill: new FillGradient(0, 0, 0, 0).addColorStop(0, Color.shared.setValue(0xffffff)),
			}),
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});

		const button = new Button(wrapper);

		button.press = this.handlePressPlayAgen.bind(this);

		return button;
	}

	handlePressPlayAgen() {
		this.coordinator.goToScene(new SingleGameplay(this.coordinator));
	}

	onStart(): void {
		if (!this.playAgen) return;
		this.coordinator.pixiApp.stage.addChild(this.title, this.playAgen.view);
	}

	onTick() {
	};

	onFinish(): void {
	}
}