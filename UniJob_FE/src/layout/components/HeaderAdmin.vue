<template>
  <header class="header-admin">
    <button class="menu-toggle" @click="$emit('toggleSidebar')">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>
      </svg>
    </button>

    <div class="header-title">
      <h1>{{ pageTitle }}</h1>
    </div>

    <div class="header-actions">
      <!-- Notifications -->
      <button class="icon-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"/>
        </svg>
        <span class="badge">3</span>
      </button>

      <!-- Avatar admin -->
      <div class="admin-avatar">
        <div class="avatar">A</div>
        <div class="admin-info">
          <span class="admin-name">Admin</span>
          <span class="admin-role">Quản trị viên</span>
        </div>
      </div>

      <!-- Logout -->
      <router-link to="/admin/dang-nhap" class="logout-link" title="Đăng xuất">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>
        </svg>
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

defineEmits(["toggleSidebar"]);

const route = useRoute();
const titles = {
  "/admin/tong-quan": "Dashboard",
  "/admin/quan-ly-viec-lam": "Quản lý việc làm",
  "/admin/quan-ly-nguoi-dung": "Quản lý người dùng",
  "/admin/quan-ly-nha-tuyen-dung": "Quản lý nhà tuyển dụng",
  "/admin/quan-ly-danh-muc": "Quản lý danh mục",
  "/admin/don-ung-tuyen": "Đơn ứng tuyển",
};
const pageTitle = computed(() => titles[route.path] || "UniJob Admin");
</script>

<style scoped>
.header-admin {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 0 24px;
  background: var(--bg);
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 50;
}
.menu-toggle {
  background: none; border: none; cursor: pointer; color: var(--text);
  padding: 8px; border-radius: 8px; display: flex;
  transition: background 0.15s;
}
.menu-toggle:hover { background: var(--accent-bg); color: var(--accent); }
.header-title { flex: 1; }
.header-title h1 { margin: 0; font-size: 1rem; font-weight: 600; color: var(--text-h); }
.header-actions { display: flex; align-items: center; gap: 12px; }
.icon-btn { position: relative; background: none; border: none; cursor: pointer; color: var(--text); padding: 8px; border-radius: 8px; display: flex; }
.icon-btn:hover { background: var(--accent-bg); color: var(--accent); }
.badge { position: absolute; top: 4px; right: 4px; width: 16px; height: 16px; background: var(--accent); color: #fff; border-radius: 50%; font-size: 0.65rem; display: flex; align-items: center; justify-content: center; font-weight: 700; }
.admin-avatar { display: flex; align-items: center; gap: 10px; }
.avatar { width: 34px; height: 34px; border-radius: 10px; background: var(--accent); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; }
.admin-info { display: flex; flex-direction: column; }
.admin-name { font-size: 0.85rem; font-weight: 600; color: var(--text-h); line-height: 1.2; }
.admin-role { font-size: 0.75rem; color: var(--text); }
.logout-link { color: var(--text); padding: 8px; border-radius: 8px; display: flex; transition: all 0.15s; }
.logout-link:hover { background: rgba(239,68,68,0.1); color: #ef4444; }
</style>
