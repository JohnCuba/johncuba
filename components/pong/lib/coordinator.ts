import type { Application, Renderer } from "pixi.js";
import type { Scene } from "./scenes/types";

export class Coordinator {
	currentScene: Scene | undefined;

	constructor(
		public pixiApp: Application<Renderer>
	) {}

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
