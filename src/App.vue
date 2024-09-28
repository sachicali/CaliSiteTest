<!-- <template>
  <div class="app">
    <NavBar />
    <ConfigPopup />
    <div class="content">
      <div class="logo-container">
        <img src="./assets/cali_logo.png" alt="CALI Logo" class="logo" loading="lazy" />
      </div>
      <Suspense>
        <template #default>
          <Logs />
        </template>
        <template #fallback>
          <div class="loading">Loading logs...</div>
        </template>
      </Suspense>
    </div>
    <Footer />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'));
const Logs = defineAsyncComponent(() => import('./components/Logs.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
const ConfigPopup = defineAsyncComponent(() => import('./components/ConfigPopup.vue'));

export default {
  name: 'App',
  components: {
    NavBar,
    Logs,
    Footer,
    ConfigPopup
  }
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: auto;
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: #bb86fc;
}
</style> -->

<template>
  <div class="app">
    <NavBar />
    <ConfigPopup />
    <div class="content">
      <div class="logo-container">
        <img src="./assets/cali_logo.png" alt="CALI Logo" class="logo" loading="lazy" />
      </div>
      <Suspense>
        <template #default>
          <Logs />
        </template>
        <template #fallback>
          <div class="loading">Loading logs...</div>
        </template>
      </Suspense>
    </div>
    <Footer />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

const NavBar = defineAsyncComponent(() => import('./components/NavBar.vue'));
const Logs = defineAsyncComponent(() => import('./components/Logs.vue'));
const Footer = defineAsyncComponent(() => import('./components/Footer.vue'));
const ConfigPopup = defineAsyncComponent(() => import('./components/ConfigPopup.vue'));

export default {
  name: 'App',
  components: {
    NavBar,
    Logs,
    Footer,
    ConfigPopup
  }
};
</script>

<style>
:root {
  --primary-purple: #bb86fc;
  --primary-gold: #FFD700;
  --background-dark: #121212;
  --surface-dark: #1e1e1e;
  --text-light: #e0e0e0;
}

body {
  background-color: var(--background-dark);
  color: var(--text-light);
  font-family: Arial, sans-serif;
}

.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: 20px;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  width: 150px;
  height: auto;
  filter: drop-shadow(0 0 10px var(--primary-gold));
}

.loading {
  text-align: center;
  font-size: 1.2em;
  color: var(--primary-purple);
}

/* Add a subtle gold border to main content areas */
.content > div {
  border: 1px solid var(--primary-gold);
  border-radius: 8px;
  padding: 20px;
  background-color: var(--surface-dark);
}
</style>