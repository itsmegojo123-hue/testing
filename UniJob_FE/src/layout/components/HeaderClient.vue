<template>
  <header class="header-client">
    <div class="header-container">
      <!-- Logo -->
      <router-link to="/" class="logo">
        <div class="logo-icon">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="#c05a4e" />
            <path
              d="M4 10V15C4 15 8 19 12 19C16 19 20 15 20 15V10L12 14L4 10Z"
              fill="#c05a4e"
              fill-opacity="0.7"
            />
          </svg>
        </div>
        <span class="logo-text"
          >Uni<strong style="color: #c05a4e">Job</strong></span
        >
      </router-link>

      <!-- Nav -->
      <nav class="nav-links">
        <router-link to="/" active-class="active" exact-active-class="active"
          >Trang chủ</router-link
        >
        <router-link to="/tim-viec" active-class="active"
          >Tìm việc làm</router-link
        >
        <router-link to="/cong-ty" active-class="active">Công ty</router-link>
        <router-link to="/ho-so-cv" active-class="active"
          >Hồ sơ & CV</router-link
        >
        <router-link to="/dien-dan" active-class="active">Diễn đàn</router-link>
      </nav>

      <!-- Right actions -->
      <div class="header-actions">
        <router-link to="/nha-tuyen-dung" class="view-btn">
          Dành cho Nhà tuyển dụng
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </router-link>

        <!-- Chưa đăng nhập -->
        <template v-if="!isLoggedIn">
          <router-link to="/dang-nhap" class="btn-signin">
            Đăng nhập
          </router-link>

          <router-link to="/dang-ky" class="btn-signup"> Đăng ký </router-link>
        </template>

        <!-- Đã đăng nhập -->
        <template v-else>
          <span class="user-email">
            Xin chào, <span class="user-name">{{ user?.email }}</span>
          </span>

          <button class="btn-signout" @click="handleLogout">Đăng xuất</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const isLoggedIn = ref(false);
const user = ref(null);

// Kiểm tra trạng thái đăng nhập khi Header được load
onMounted(() => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (token) {
    isLoggedIn.value = true;
  }

  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }
});

// Đăng xuất
const handleLogout = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/tai-khoan/dang-xuat",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      console.error("Logout API failed");
    }
  } catch (error) {
    console.error("Không thể kết nối đến máy chủ:", error);
  }

  // Xóa thông tin đăng nhập trên trình duyệt
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  isLoggedIn.value = false;
  user.value = null;

  // Chuyển về trang đăng nhập
  router.push("/dang-nhap");
};
</script>

<style scoped>
.header-client {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(229, 231, 235, 0.5);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
}
.header-container {
  width: 100%;
  padding: 0 40px;
  height: 72px;
  display: flex;
  align-items: center;
  gap: 40px;
  box-sizing: border-box;
}
.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #111827;
  font-size: 1.5rem;
  flex-shrink: 0;
  transition: opacity 0.2s;
}
.logo:hover {
  opacity: 0.9;
}
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.logo-text {
  font-weight: 600;
  letter-spacing: -0.02em;
}
.logo-text strong {
  font-weight: 800;
}
.nav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex: 1;
}
.nav-links a {
  text-decoration: none;
  color: #4b5563;
  font-size: 0.95rem;
  font-weight: 500;
  position: relative;
  transition: all 0.2s ease;
  padding: 8px 0;
}
.nav-links a:hover {
  color: #c05a4e;
}
.nav-links a::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: #c05a4e;
  transition: width 0.3s ease;
}
.nav-links a.active {
  color: #c05a4e;
  font-weight: 600;
}
.nav-links a.active::after {
  width: 100%;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
}
.view-btn {
  text-decoration: none;
  background: transparent;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  color: #4b5563;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s ease;
}
.view-btn:hover {
  color: #c05a4e;
  background: #fdf5f4;
}
.btn-signin {
  text-decoration: none;
  background: #ffffff;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.btn-signin:hover {
  background: #f9fafb;
  border-color: #9ca3af;
  color: #111827;
}
.btn-signup {
  text-decoration: none;
  background: #c05a4e;
  color: #ffffff;
  border: 1px solid #c05a4e;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(192, 90, 78, 0.2);
}
.btn-signup:hover {
  background: #a8493d;
  border-color: #a8493d;
  box-shadow: 0 4px 6px rgba(192, 90, 78, 0.3);
  transform: translateY(-1px);
}
.user-email {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.btn-signout {
  background: #ffffff;
  color: #c05a4e;
  border: 1px solid #c05a4e;
  padding: 8px 18px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-signout:hover {
  background: #c05a4e;
  color: #ffffff;
}
.user-greeting {
  color: #374151;
  font-size: 0.9rem;
  font-weight: 600;
}

.user-name {
  color: #c05a4e !important;
  font-weight: 700;
}
</style>
