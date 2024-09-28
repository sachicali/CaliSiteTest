<template>
  <ul v-show="isVisible" class="dropdown-content">
    <li v-for="item in items" :key="item.text" class="dropdown-item">
      <a :href="item.link">{{ item.text }}</a>
    </li>
  </ul>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'LazyDropdownContent',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  setup() {
    const isVisible = ref(false);

    const show = () => {
      isVisible.value = true;
    };

    const hide = () => {
      isVisible.value = false;
    };

    return {
      isVisible,
      show,
      hide
    };
  }
};
</script>

<style scoped>
.dropdown-content {
  position: absolute;
  background-color: var(--surface-dark);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  list-style-type: none;
  padding: 0;
  margin: 0;
  top: 100%;
  left: 0;
  z-index: 1;
  min-width: 180px;
  border-radius: 8px;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* The dropdown becomes visible with smooth animation */
.dropdown-content[v-show] {
  opacity: 1;
  transform: translateY(0);
}

.dropdown-item {
  padding: 10px;
  text-align: center;
}

.dropdown-content li a {
  display: block;
  color: var(--text-light);
  padding: 12px 20px;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Hover effects */
.dropdown-content li a:hover {
  background-color: var(--primary-gold);
  color: var(--background-dark);
}
</style>
