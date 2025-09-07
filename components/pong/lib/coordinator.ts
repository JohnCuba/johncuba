import type { Application, Renderer } from 'pixi.js';
import type { Scene } from './scenes/types';

const manualControls = ['mouse', 'keyboard'] as const;
type ManualControl = typeof manualControls[number];
const autoControls = ['follow'] as const;
type AutoControl = typeof autoControls[number];
export type Controls = ManualControl | AutoControl;

type Options = {
	control: [
		Controls,
		Controls,
	];
	gameplay: 'single' | 'multi';
};

export class Coordinator {
	protected currentScene: Scene | undefined;
	protected _options: Options = {
		control: [
			manualControls[0],
			autoControls[0],
		],
		gameplay: 'single',
	};

	get options(): Options {
		return this._options;
	}

	set options(data: Partial<Options>) {
		this._options = {
			...this._options,
			...data,
		};
	}

	constructor(
		public pixiApp: Application<Renderer>,
	) {}

	async goToMenu() {
		const Scene = (await import('./scenes/main-menu')).MainMenuScene;
		this.goToScene(new Scene(this));
	}

	async goToSelectControl() {
		const Scene = (await import('./scenes/select-control')).SelectControl;
		this.goToScene(new Scene(this));
	}

	async goToGameplay() {
		let Scene;

		if (this.options.gameplay === 'single') {
			Scene = (await import('./scenes/gameplay/singleplayer')).SingleplayerGameplay;
		}
		else {
			Scene = (await import('./scenes/gameplay/multiplayer')).MultiplayerGameplay;
		}

		this.goToScene(new Scene(this));
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
