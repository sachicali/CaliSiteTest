<template>
  <div class="footer">
    <div>© 2024 CALI Creatives</div>
    <div>Terms of Service</div>
    <div>Privacy Policy</div>
  </div>
</template>

<script>
export default {
  name: 'Footer'
};
</script>

<style scoped>
.footer {
  background-color: var(--background-dark);
  color: var(--text-light);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  bottom: 0;
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
}

.footer div {
  padding: 10px;
  text-align: center;
  flex: 1;
  transition: color 0.3s ease, transform 0.2s ease;
}

.footer div:hover {
  color: var(--primary-gold);
  transform: translateY(-2px);
}

.footer div:first-child {
  font-weight: bold;
  text-transform: uppercase;
}

@media (max-width: 600px) {
  .footer {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .footer div {
    margin-bottom: 10px;
  }
}
</style>
