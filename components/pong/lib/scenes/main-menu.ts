import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import { SingleplayerGameplay } from './gameplay/singleplayer';
import { MultiplayerLocalGameplay } from './gameplay/multiplayer-local';
import { SelectControl } from './select-control';
import type { Scene } from './types';

export class MainMenuScene implements Scene {
	view: Container = new Container();

	constructor(protected coordinator: Coordinator) {
		this.createPlaySingleButton();
		this.createPlayMultiplayerLocalButton();
	}

	private handlePressPlaySingle = () => {
		this.coordinator.goToScene(
			new SelectControl(this.coordinator, control =>
				this.coordinator.goToScene(new SingleplayerGameplay(this.coordinator, control)),
			),
		);
	};

	private createPlaySingleButton() {
		const text = new StyledText({
			text: 'singleplayer',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2,
		});

		const button = new Button(wrapper);

		button.press = this.handlePressPlaySingle;

		this.view.addChild(button.view);
	}

	private handlePressPlayMultiplayerLocal = () => {
		this.coordinator.goToScene(
			new SelectControl(this.coordinator, control =>
				this.coordinator.goToScene(
					new MultiplayerLocalGameplay(this.coordinator, control),
				),
			),
		);
	};

	private createPlayMultiplayerLocalButton() {
		const text = new StyledText({
			text: 'multiplayer',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2,
		});
		wrapper.y += wrapper.height + 10;

		const button = new Button(wrapper);

		button.press = this.handlePressPlayMultiplayerLocal;

		this.view.addChild(button.view);
	}

	onStart(): void {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {}

	onFinish(): void {
		this.view.destroy();
	}
}
