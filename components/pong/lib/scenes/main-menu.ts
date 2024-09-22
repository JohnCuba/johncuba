import { Container, Graphics } from 'pixi.js';
import type { Scene } from './types';
import type { Coordinator } from '../coordinator';
import { Button } from '@pixi/ui';
import { SingleplayerGameplay, MultiplayerLocalGameplay } from './gameplay';
import { StyledText } from '../shared/styled-text';
import { SelectControl } from './select-control';

export class MainMenuScene implements Scene {

	view: Container = new Container()

	constructor(
		protected coordinator: Coordinator
	) {
		this.createPlaySingleButton();
		this.createPlayMultiplayerLocalButton();
	}

	private handlePressPlaySingle = () => {
		this.coordinator.goToScene(
			new SelectControl(
				this.coordinator,
				() => this.coordinator.goToScene(new SingleplayerGameplay(this.coordinator)),
			)
		);
	}
	private createPlaySingleButton() {
		const text = new StyledText({
			text: 'singleplayer',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});

		const button = new Button(wrapper);

		button.press = this.handlePressPlaySingle;

		this.view.addChild(button.view);
	}

	private handlePressPlayMultiplayerLocal = () => {
		this.coordinator.goToScene(
			new SelectControl(
				this.coordinator,
				() => this.coordinator.goToScene(new MultiplayerLocalGameplay(this.coordinator)),
			)
		);
	}
	private createPlayMultiplayerLocalButton() {
		const text = new StyledText({
			text: 'multiplayer',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});
		wrapper.y += wrapper.height + 10;

		const button = new Button(wrapper);

		button.press = this.handlePressPlayMultiplayerLocal;

		this.view.addChild(button.view);
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