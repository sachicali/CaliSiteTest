<template>
  <div class="config-popup">
    <button @click="togglePopup" class="config-button" aria-label="Configuration">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path d="m2.344 15.271 2 3.46a1 1 0 0 0 1.366.365l1.396-.806c.58.457 1.221.832 1.895 1.112V21a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-1.598a8.094 8.094 0 0 0 1.895-1.112l1.396.806c.477.275 1.091.11 1.366-.365l2-3.46a1.004 1.004 0 0 0-.365-1.366l-1.372-.793a7.683 7.683 0 0 0-.002-2.224l1.372-.793c.476-.275.641-.89.365-1.366l-2-3.46a1 1 0 0 0-1.366-.365l-1.396.806A8.034 8.034 0 0 0 15 4.598V3a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1.598A8.094 8.094 0 0 0 7.105 5.71L5.71 4.904a.999.999 0 0 0-1.366.365l-2 3.46a1.004 1.004 0 0 0 .365 1.366l1.372.793a7.683 7.683 0 0 0 0 2.224l-1.372.793c-.476.275-.641.89-.365 1.366zM12 8c2.206 0 4 1.794 4 4s-1.794 4-4 4-4-1.794-4-4 1.794-4 4-4z"/>
      </svg>
    </button>

    <div v-if="isOpen" class="popup-content">
      <h3>Configuration Data</h3>
      <div v-if="configError" class="error-message">{{ configError }}</div>
      <div v-else-if="configData.length">
        <div class="config-entry" v-for="(config, index) in configData" :key="index">
          <strong>{{ config.key }}:</strong> {{ config.value }}
        </div>
      </div>
      <div v-else class="loading">Loading configuration...</div>
    </div>

    <div v-if="showNotification" class="notification">
      <div class="notification-content">
        Running Configurations are here if you wanna check!!
      </div>
      <div class="notification-arrow"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'ConfigPopup',
  setup() {
    const isOpen = ref(false);
    const configData = ref([]);
    const configError = ref(null);
    const showNotification = ref(false);

    const togglePopup = () => {
      isOpen.value = !isOpen.value;
      if (isOpen.value) {
        showNotification.value = true;
        setTimeout(() => {
          showNotification.value = false;
        }, 15000);
      }
    };

    const fetchConfig = async () => {
      try {
        const response = await fetch('/config.json');
        if (!response.ok) throw new Error('Failed to fetch configuration');
        const data = await response.json();
        configData.value = Object.entries(data).map(([key, value]) => ({
          key,
          value
        }));
      } catch (error) {
        configError.value = 'Error fetching configuration';
        console.error('Error fetching config:', error);
      }
    };

    onMounted(fetchConfig);

    return {
      isOpen,
      configData,
      configError,
      togglePopup,
      showNotification
    };
  }
};
</script>

<style scoped>
.config-popup {
  position: fixed;
  top: 15px;
  right: 15px;
  z-index: 1000;
}

.config-button {
  background-color: var(--primary-purple);
  color: var(--background-dark);
  border: none;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.config-button:hover {
  background-color: var(--primary-gold);
  transform: scale(1.1);
  box-shadow: 0 0 10px var(--primary-gold);
}

.popup-content {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background-color: var(--background-dark);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(255, 215, 0, 0.3);
  max-width: 320px;
  max-height: 400px;
  overflow-y: auto;
  color: var(--text-light);
  border: 2px solid var(--primary-gold);
}

.config-entry {
  margin-bottom: 15px;
  padding: 12px;
  background-color: rgba(255, 215, 0, 0.1);
  border-radius: 6px;
  transition: background-color 0.3s ease;
}

.config-entry:hover {
  background-color: rgba(255, 215, 0, 0.3);
}

.error-message {
  color: #cf6679;
  font-weight: bold;
}

.loading {
  color: var(--primary-purple);
}

.notification {
  position: absolute;
  top: 50%;
  right: calc(100% + 15px);
  transform: translateY(-50%);
  z-index: 1001;
}

.notification-content {
  background-color: var(--primary-gold);
  color: var(--background-dark);
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  font-size: 0.9em;
  max-width: 200px;
  text-align: center;
}

.notification-arrow {
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-left: 10px solid var(--primary-gold);
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0; }
  10%, 90% { opacity: 1; }
}

.notification {
  animation: fadeInOut 15s forwards;
}
</style>
