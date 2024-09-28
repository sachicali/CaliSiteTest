<template>
    <div class="hero-section">
      <div class="hero-content">
        <img src="@/assets/logo.svg" alt="CALI Logo" class="hero-logo" />
        <h1 class="hero-title">Your Next-Gen Platform</h1>
        <p class="hero-subtitle">Building the Future of Digital Representation</p>
        <button class="cta-button">Discover More</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Hero",
  };
  </script>
  
  <style scoped>
  .hero-section {
    height: 100vh;
    background: radial-gradient(circle at center, var(--background-dark) 30%, #000);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 20px;
  }
  
  .hero-content {
    color: var(--text-light);
  }
  
  .hero-logo {
    width: 180px;
    margin-bottom: 20px;
    animation: fadeInUp 1.5s ease;
  }
  
  .hero-title {
    font-size: 3.5rem;
    color: var(--primary-purple);
    margin-bottom: 10px;
    font-weight: 700;
    letter-spacing: 1.5px;
    animation: fadeInUp 2s ease;
  }
  
  .hero-subtitle {
    font-size: 1.5rem;
    color: var(--primary-gold);
    margin-bottom: 30px;
    animation: fadeInUp 2.5s ease;
  }
  
  .cta-button {
    padding: 14px 28px;
    background-color: var(--primary-gold);
    color: var(--background-dark);
    border: none;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    animation: fadeInUp 3s ease;
  }
  
  .cta-button:hover {
    background-color: var(--primary-purple);
    color: var(--text-light);
    transform: scale(1.05);
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    .hero-subtitle {
      font-size: 1.2rem;
    }
    .cta-button {
      font-size: 1rem;
      padding: 10px 20px;
    }
  }
  </style>
  