import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import type { Scene } from './types';

export class EndGame implements Scene {
	view: Container = new Container();

	constructor(
		protected coordinator: Coordinator,
		scores: [number, number],
	) {
		this.createPlayAgen();
		this.createTitle(scores);
	}

	private createTitle(scores: [number, number]) {
		const text = new StyledText({
			text: `${scores[0] >= 5 ? 'Left' : 'Right'} player win! ${scores.join(' - ')}`,
		});
		text.x = (this.coordinator.pixiApp.canvas.width - text.width) / 2;
		text.y = this.coordinator.pixiApp.canvas.height / 3;

		this.view.addChild(text);
	}

	private createPlayAgen() {
		const text = new StyledText({
			text: 'play agen',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2,
		});

		const button = new Button(wrapper);

		button.press = this.handlePressPlayAgen.bind(this);

		this.view.addChild(button.view);
	}

	async handlePressPlayAgen() {
		this.coordinator.goToGameplay();
	}

	onStart(): void {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {}

	onFinish(): void {
		this.view.destroy();
	}
}
