<template>
  <div class="logs-section">
    <RecycleScroller
      class="scroller"
      :items="logs"
      :item-size="60"
      key-field="id"
      v-slot="{ item }"
    >
      <div class="log-entry">
        <div class="log-time">{{ item.time }}</div>
        <div class="log-message">{{ item.message }}</div>
      </div>
    </RecycleScroller>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { RecycleScroller } from 'vue3-virtual-scroller';
import 'vue3-virtual-scroller/dist/vue3-virtual-scroller.css';

export default {
  components: {
    RecycleScroller
  },
  setup() {
    const logs = ref([]);
    let ws = null;
    let reconnectTimeout = null;
    let reconnectAttempts = 0;

    const connectWebSocket = () => {
      ws = new WebSocket(`ws://${window.location.host}`);

      ws.onopen = () => {
        console.log('WebSocket connection established');
        reconnectAttempts = 0;
      };

      ws.onmessage = (event) => {
        const logMessage = event.data;
        const time = new Date().toLocaleTimeString();

        logs.value.push({
          id: Date.now(),
          time,
          message: logMessage
        });

        // Limit logs to the latest 1000 entries
        if (logs.value.length > 1000) {
          logs.value = logs.value.slice(-1000);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket connection closed');
        reconnect();
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    const reconnect = () => {
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      const delay = Math.min(30000, Math.pow(2, reconnectAttempts) * 1000);
      reconnectTimeout = setTimeout(() => {
        reconnectAttempts++;
        connectWebSocket();
      }, delay);
    };

    onMounted(() => {
      connectWebSocket();
    });

    onUnmounted(() => {
      if (ws) {
        ws.close();
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    });

    return {
      logs
    };
  }
};
</script>

<style scoped>
.logs-section {
  background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
  height: 400px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.scroller {
  height: 100%;
  padding-right: 10px;
  overflow-y: auto;
}

/* Styling for each log entry */
.log-entry {
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  border-bottom: 1px solid #444;
  border-radius: 6px;
  background-color: #232323;
  color: #f0f0f0;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.log-entry:hover {
  background-color: #2e2e2e;
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Styling for alternating log background */
.log-entry:nth-child(odd) {
  background-color: #1e1e1e;
}

.log-time {
  font-size: 0.85rem;
  color: #a0a0a0;
}

.log-message {
  font-size: 1rem;
  color: #e0e0e0;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2d2d2d;
}

::-webkit-scrollbar-thumb {
  background: #555;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #777;
}

@media (max-width: 768px) {
  .logs-section {
    height: 300px;
  }
  .log-entry {
    font-size: 0.9rem;
  }
}
</style>
