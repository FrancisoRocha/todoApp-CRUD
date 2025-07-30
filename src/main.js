import './normalize.css';
import { initStore } from './store/todo-store';
import './style.css';
import { App } from './todos/app';

initStore();
App('#app');

