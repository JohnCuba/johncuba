import { Container, Graphics } from "pixi.js";
import type { Scene } from "./types";
import type { Coordinator } from "../coordinator";
import { StyledText } from "../shared/styled-text";
import { Button } from "@pixi/ui";

export class SelectControl implements Scene {
	view: Container = new Container();

	constructor(
		protected coordinator: Coordinator,
		protected onSelect: (selected: Coordinator['options']['controlBy']) => void
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
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});

		const button = new Button(wrapper);

		button.press = () => this.handleSelect('keyboard');

		this.view.addChild(button.view);
	}
	
	private createMouseButton() {
		const text = new StyledText({
			text: 'mouse',
		});

		const wrapper = new Graphics({
			children: [text],
			x: (this.coordinator.pixiApp.canvas.width - text.width) / 2,
			y: (this.coordinator.pixiApp.canvas.height - text.height) / 2
		});

		wrapper.y += wrapper.height * 2;

		const button = new Button(wrapper);

		button.press = () => this.handleSelect('mouse');

		this.view.addChild(button.view);
	}

	handleSelect(selected: Coordinator['options']['controlBy']) {
		this.coordinator.setOptions({controlBy: selected})
		this.onSelect(selected);
	}

	onStart() {
		this.coordinator.pixiApp.stage.addChild(this.view);
	}

	onTick() {}

	onFinish() {
		this.view.destroy();
	}
}