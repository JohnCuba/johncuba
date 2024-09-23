import { Button } from '@pixi/ui';
import { Container, Graphics } from 'pixi.js';
import type { Coordinator } from '../coordinator';
import { StyledText } from '../shared/styled-text';
import { SingleplayerGameplay } from './gameplay';
import { SelectControl } from './select-control';
import type { Scene } from './types';

export class EndGame implements Scene {
	view: Container = new Container();

	constructor(
		protected coordinator: Coordinator,
		scores: number[],
	) {
		this.createPlayAgen();
		this.createTitle(scores);
	}

	private createTitle(scores: number[]) {
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

	handlePressPlayAgen() {
		this.coordinator.goToScene(
			new SelectControl(this.coordinator, () =>
				this.coordinator.goToScene(new SingleplayerGameplay(this.coordinator)),
			),
		);
	}

	onStart(): void {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {}

	onFinish(): void {
		this.view.destroy();
	}
}
