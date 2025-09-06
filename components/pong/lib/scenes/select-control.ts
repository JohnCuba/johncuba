import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import type { Scene } from './types';

export class SelectControl implements Scene {
	view: Container = new Container();

	constructor(
		protected coordinator: Coordinator,
		protected onSelect: (selected: 'mouse' | 'keyboard') => void,
	) {
		this.createKeyboardButton();
		this.createMouseButton();
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

		button.press = () => this.onSelect('keyboard');

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

		button.press = () => this.onSelect('mouse');

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
