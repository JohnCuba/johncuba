import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import type { Scene } from './types';

export class MainMenuScene implements Scene {
	view: Container = new Container();

	constructor(protected coordinator: Coordinator) {
		this.createPlaySingleButton();
		this.createPlayMultiplayerLocalButton();
	}

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

		button.press = () => {
			this.coordinator.options.gameplay = 'single';
			this.coordinator.goToSelectControl();
		};

		this.view.addChild(button.view);
	}

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

		button.press = () => {
			this.coordinator.options.gameplay = 'multi';
			this.coordinator.goToSelectControl();
		};

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
