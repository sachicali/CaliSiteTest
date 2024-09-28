import { createApp } from 'vue';
import App from './App.vue';
import './assets/global.css'; // If you have global styles

const app = createApp(App);

// Add any global plugins here if needed
// app.use(plugin)

app.mount('#app');
