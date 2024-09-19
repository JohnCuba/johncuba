import { Container, Graphics, Text } from 'pixi.js';
import type { Scene } from './types';
import { Button } from '@pixi/ui';
import type { Coordinator } from '../coordinator';
import { SingleGameplay } from './single-gameplay';
import { StyledText } from '../shared/styled-text';

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
		const text = new StyledText({
			text: `${scores[0] >= 5 ? 'Left' : 'Right'} player win! ${scores.join(' - ')}`,
		});
		text.x = (this.coordinator.pixiApp.canvas.width - text.width) / 2;
		text.y = this.coordinator.pixiApp.canvas.height / 3;

		return text;
	}

	private createPlayAgen() {
		const text = new StyledText({
			text: 'play agen',
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
		this.view.destroy();
	}
}