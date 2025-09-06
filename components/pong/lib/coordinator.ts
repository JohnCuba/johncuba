import type { Application, Renderer } from 'pixi.js';
import type { Scene } from './scenes/types';

type Options = {
	controlBy: 'keyboard' | 'mouse';
};

const defaultOptions: Options = {
	controlBy: 'mouse',
};

export class Coordinator {
	currentScene: Scene | undefined;

	constructor(
		public pixiApp: Application<Renderer>,
		protected _options: Options = defaultOptions,
	) {}

	get options() {
		return this._options;
	}

	setOptions(options: Partial<Options>) {
		this._options = {
			...this.options,
			...options,
		};
	}

	goToScene(scene: Scene) {
		if (this.currentScene) {
			this.currentScene.onFinish();
			this.pixiApp.ticker.remove(this.currentScene.onTick);
			this.pixiApp.stage.removeChildren();
		}

		this.currentScene = scene;
		this.currentScene.onStart();
		this.pixiApp.stage.addChild(scene.view);
		this.pixiApp.ticker.add(this.currentScene.onTick);
	}
}
