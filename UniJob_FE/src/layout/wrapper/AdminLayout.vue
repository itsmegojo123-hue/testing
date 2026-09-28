<template>
  <div class="admin-layout" :class="{ collapsed }">
    <SidebarAdmin :collapsed="collapsed" @toggle="collapsed = !collapsed" />
    <div class="admin-main">
      <HeaderAdmin @toggle-sidebar="collapsed = !collapsed" />
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import SidebarAdmin from "../components/SidebarAdmin.vue";
import HeaderAdmin from "../components/HeaderAdmin.vue";

const collapsed = ref(false);
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  --sidebar-width: 240px;
}
.admin-layout.collapsed { --sidebar-width: 64px; }
.admin-main {
  flex: 1;
  margin-left: var(--sidebar-width);
  transition: margin-left 0.3s ease;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--code-bg);
}
.admin-content {
  flex: 1;
  padding: 24px;
}
</style>
