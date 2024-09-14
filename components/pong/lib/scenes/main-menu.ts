import { Color, Container, FillGradient, Graphics, Text, TextStyle } from 'pixi.js';
import type { Scene } from './types';
import type { Coordinator } from '../coordinator';
import { Button } from '@pixi/ui';
import { SingleGameplay } from './single-gameplay';

export class MainMenuScene implements Scene {
	private coordinator: Coordinator;

	view: Container = new Container()

	playButton: Button;

	constructor(coordinator: Coordinator) {
		this.coordinator = coordinator;
		this.playButton = this.createPlayButton();
	}

	private createPlayButton() {
		const text = new Text({
			text: 'play',
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

		button.press = this.handlePressPlay.bind(this);

		return button;
	}

	handlePressPlay() {
		this.coordinator.goToScene(new SingleGameplay(this.coordinator));
	}

	onStart(): void {
		if (!this.playButton) return;
		this.coordinator.pixiApp.stage.addChild(this.playButton.view);
	}

	onTick() {
	}

	onFinish(): void {
	}
}