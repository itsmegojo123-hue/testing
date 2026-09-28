<template>
  <div class="blank-layout">
    <router-view />
  </div>
</template>

<script setup></script>

<style scoped>
.blank-layout {
  min-height: 100vh;
  display: flex;
  background-color: var(--bg-main);
}
</style>
