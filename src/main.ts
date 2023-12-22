import './lib/shared/style/global.css'
import App from './App.svelte'

/** Mount point of the app */
let rootElemet = document.getElementById('app');

/** Create mount point if there is not currently in dom */
if (!rootElemet) {
  const container = document.createElement('div');
  container.id = 'app';
  document.body.appendChild(container);
  rootElemet = container;
}

const app = new App({
  target: rootElemet,
})

export default app
