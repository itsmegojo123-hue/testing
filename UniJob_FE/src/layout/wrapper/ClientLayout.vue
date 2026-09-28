<template>
  <div class="client-layout">
    <HeaderClient />
    <main class="main-content">
      <router-view />
    </main>
    <FooterClient />
  </div>
</template>

<script setup>
import HeaderClient from "../components/HeaderClient.vue";
import FooterClient from "../components/FooterClient.vue";
</script>

<style scoped>
.client-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.main-content {
  flex: 1;
  padding-top: 64px; /* height of fixed header */
}
</style>
