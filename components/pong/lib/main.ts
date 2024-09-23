import { Application, type Renderer } from 'pixi.js';
import { Coordinator } from './coordinator';
import { MainMenuScene } from './scenes/main-menu';

export class PongGame {
	private pixiApp: Application<Renderer>;
	private coordinator: Coordinator;

	constructor() {
		this.pixiApp = new Application();
		this.coordinator = new Coordinator(this.pixiApp);
		// @ts-expect-error -- devtools
		window.__PIXI_APP__ = this.pixiApp;
	}

	async init(rootElem?: HTMLDivElement) {
		if (!rootElem) return;

		await this.pixiApp.init({
			resizeTo: rootElem,
			preference: 'webgpu',
		});

		rootElem.appendChild(this.pixiApp.canvas);

		this.coordinator.goToScene(new MainMenuScene(this.coordinator));
	}
}
