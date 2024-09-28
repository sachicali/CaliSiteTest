<template>
  <nav class="navbar">
    <div class="container">
      <div class="logo">CALI</div>
      <ul class="nav-links">
        <li class="nav-item"><a href="#">HOME</a></li>
        <li class="nav-item dropdown">
          <a href="#">INFO</a>
          <lazy-dropdown-content :items="infoItems" />
        </li>
        <li class="nav-item dropdown">
          <a href="#">DESIGNS</a>
          <lazy-dropdown-content :items="designItems" />
        </li>
        <li class="nav-item"><a href="#">SERVICES</a></li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue';

const LazyDropdownContent = defineAsyncComponent(() => import('./LazyDropdownContent.vue'));

export default {
  name: 'NavBar',
  components: {
    LazyDropdownContent
  },
  setup() {
    const infoDropdown = ref(null);
    const designsDropdown = ref(null);

    return {
      infoDropdown,
      designsDropdown,
      infoItems: [
        { text: 'About Us', link: '#' },
        { text: 'Team', link: '#' },
        { text: 'Contact', link: '#' }
      ],
      designItems: [
        { text: 'Gallery', link: '#' },
        { text: 'Portfolio', link: '#' }
      ]
    };
  }
};
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.8));
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.3s ease;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
}

.navbar:hover {
  background: linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(0, 0, 0, 0.9));
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.logo {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary-purple);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.nav-links {
  display: flex;
  gap: 40px;
  list-style-type: none;
}

.nav-item a {
  font-weight: 500;
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 8px 0;
  position: relative;
  transition: color 0.3s ease;
}

.nav-item a:hover {
  color: var(--primary-purple);
}

.nav-item a::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary-purple);
  box-shadow: 0px 0px 12px rgba(128, 0, 255, 0.8);
  transition: width 0.3s ease, box-shadow 0.3s ease;
}

.nav-item a:hover::after {
  width: 100%;
  box-shadow: 0px 0px 15px rgba(128, 0, 255, 1);
}

/* Adjustments for mobile */
@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
  }
  
  .nav-links {
    margin-top: 20px;
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }

  .logo {
    font-size: 1.8rem;
  }

  .nav-item a {
    font-size: 1.1rem;
  }
}
</style>
