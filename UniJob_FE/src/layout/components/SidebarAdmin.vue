<template>
  <aside class="sidebar-admin" :class="{ collapsed }">
    <!-- Logo -->
    <div class="sidebar-logo">
      <div class="logo-icon">
        <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="8" fill="var(--accent)" />
          <path d="M7 10h14M7 14h9M7 18h11" stroke="#fff" stroke-width="2" stroke-linecap="round" />
        </svg>
      </div>
      <span v-if="!collapsed" class="logo-text">Uni<strong>Job</strong> Admin</span>
    </div>

    <!-- Menu -->
    <nav class="sidebar-nav">
      <div class="nav-section">
        <p class="nav-label" v-if="!collapsed">Tổng quan</p>
        <router-link to="/admin/tong-quan" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          <span v-if="!collapsed">Dashboard</span>
        </router-link>
      </div>

      <div class="nav-section">
        <p class="nav-label" v-if="!collapsed">Quản lý</p>
        <router-link to="/admin/quan-ly-viec-lam" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2M12 12v4M10 14h4"/></svg>
          <span v-if="!collapsed">Việc làm</span>
        </router-link>
        <router-link to="/admin/quan-ly-nguoi-dung" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span v-if="!collapsed">Người dùng</span>
        </router-link>
        <!--
        <router-link to="/admin/quan-ly-nha-tuyen-dung" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span v-if="!collapsed">Nhà tuyển dụng</span>
        </router-link>
        <router-link to="/admin/quan-ly-danh-muc" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          <span v-if="!collapsed">Danh mục</span>
        </router-link>
        <router-link to="/admin/don-ung-tuyen" class="nav-item">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
          <span v-if="!collapsed">Đơn ứng tuyển</span>
        </router-link>
        -->
      </div>
    </nav>

    <!-- Toggle -->
    <button class="collapse-btn" @click="$emit('toggle')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline v-if="!collapsed" points="15 18 9 12 15 6"/>
        <polyline v-else points="9 18 15 12 9 6"/>
      </svg>
    </button>
  </aside>
</template>

<script setup>
defineProps({ collapsed: Boolean });
defineEmits(["toggle"]);
</script>

<style scoped>
.sidebar-admin {
  width: 240px;
  height: 100vh;
  position: fixed;
  top: 0; left: 0;
  background: var(--bg);
  border-right: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 100;
}
.sidebar-admin.collapsed { width: 64px; }
.sidebar-logo {
  height: 64px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  overflow: hidden;
}
.logo-text { font-size: 0.95rem; font-weight: 600; color: var(--text-h); white-space: nowrap; }
.logo-text strong { color: var(--accent); }
.sidebar-nav { flex: 1; overflow-y: auto; padding: 16px 12px; display: flex; flex-direction: column; gap: 24px; }
.nav-section { display: flex; flex-direction: column; gap: 2px; }
.nav-label { font-size: 0.72rem; font-weight: 600; color: var(--text); text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 6px 8px; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 8px; text-decoration: none;
  color: var(--text); font-size: 0.9rem; transition: all 0.15s; white-space: nowrap;
}
.nav-item:hover { background: var(--accent-bg); color: var(--accent); }
.nav-item.router-link-active { background: var(--accent-bg); color: var(--accent); font-weight: 500; }
.collapse-btn {
  margin: 12px; border: 1px solid var(--border); background: var(--code-bg);
  border-radius: 8px; padding: 8px; cursor: pointer; color: var(--text);
  display: flex; align-items: center; justify-content: center;
  transition: all 0.2s; flex-shrink: 0;
}
.collapse-btn:hover { border-color: var(--accent); color: var(--accent); }
</style>
