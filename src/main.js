import './normalize.css';
import todoStore from './store/todo-store';
import './style.css';
import { App } from './todos/app';

(async () => {
    await todoStore.initStore();
    App('#app');
})();
