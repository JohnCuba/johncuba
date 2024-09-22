import { Container, Graphics } from 'pixi.js';
import type { Scene } from './types';
import type { Coordinator } from '../coordinator';
import { Button } from '@pixi/ui';
import { SingleGameplay } from './single-gameplay';
import { StyledText } from '../shared/styled-text';
import { SelectControl } from './select-control';

export class MainMenuScene implements Scene {

	view: Container = new Container()

	constructor(
		protected coordinator: Coordinator
	) {
		this.createPlayButton();
	}

	private createPlayButton() {
		const text = new StyledText({
			text: 'play',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});

		const button = new Button(wrapper);

		button.press = this.handlePressPlay.bind(this);

		this.view.addChild(button.view);
	}

	handlePressPlay() {
		this.coordinator.goToScene(
			new SelectControl(
				this.coordinator,
				() => this.coordinator.goToScene(new SingleGameplay(this.coordinator)),
			)
		);
	}

	onStart(): void {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {
	}

	onFinish(): void {
		this.view.destroy();
	}
}