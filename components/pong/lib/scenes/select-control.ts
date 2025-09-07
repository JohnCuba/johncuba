import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import type { Scene } from './types';

export class SelectControl implements Scene {
	view: Container = new Container();

	constructor(
		protected coordinator: Coordinator,
	) {
		this.createKeyboardButton();
		this.createMouseButton();
	}

	private onSelect() {
		if (this.coordinator.options.gameplay === 'multi') {
			this.coordinator.options.control[1] = this.coordinator.options.control[0] === 'mouse' ? 'keyboard' : 'mouse';
		}
		this.coordinator.goToGameplay();
	}

	private createKeyboardButton() {
		const text = new StyledText({
			text: 'keyboard',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2,
		});

		const button = new Button(wrapper);

		button.press = () => {
			this.coordinator.options.control[0] = 'keyboard';
			this.onSelect();
		};

		this.view.addChild(button.view);
	}

	private createMouseButton() {
		const text = new StyledText({
			text: 'mouse',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2,
		});

		wrapper.y += wrapper.height * 2;

		const button = new Button(wrapper);

		button.press = () => {
			this.coordinator.options.control[0] = 'mouse';
			this.onSelect();
		};

		this.view.addChild(button.view);
	}

	onStart() {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {}

	onFinish() {
		this.view.destroy();
	}
}
