<template>
  <div class="auth-container">
    <div class="auth-left">
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
      <div class="auth-illustration">
        <h2>Start your career journey today.</h2>
        <p>Join thousands of students connecting with top employers.</p>
      </div>
    </div>

    <div class="auth-right">
      <div class="auth-form-wrapper">
        <h1 class="auth-title">Welcome back</h1>
        <p class="auth-subtitle">Please enter your details to sign in.</p>

        <form @submit.prevent="handleLogin" class="auth-form">
          <div class="form-group">
            <label>Email address</label>
            <input
              v-model="email"
              type="email"
              class="input-field"
              placeholder="Enter your email"
              required
            />
          </div>

          <div class="form-group">
            <div class="flex-between">
              <label>Password</label>
              <router-link to="/quen-mat-khau" class="text-link"
                >Forgot password?</router-link
              >
            </div>
            <input
              v-model="password"
              type="password"
              class="input-field"
              placeholder="••••••••"
              required
            />
          </div>
          <p v-if="errorMessage" class="login-error">
            {{ errorMessage }}
          </p>

          <button type="submit" class="btn-primary w-100 mt-2">
            {{ isLoading ? "Signing in..." : "Sign In" }}
          </button>
        </form>

        <div class="auth-divider">
          <span>or continue with</span>
        </div>

        <button class="btn-social">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z"
            />
          </svg>
          Google
        </button>

        <p class="auth-footer">
          Don't have an account?
          <router-link to="/dang-ky" class="text-link">Sign up</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    const response = await fetch(
      "http://127.0.0.1:8000/api/tai-khoan/dang-nhap",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      errorMessage.value = data.message || "Email hoặc mật khẩu không đúng";
      return;
    }

    // Lưu token để sử dụng cho các API cần đăng nhập
    localStorage.setItem("token", data.token);

    // Lưu thông tin user
    localStorage.setItem("user", JSON.stringify(data.user));

    // Đăng nhập thành công
    router.push("/");
  } catch (error) {
    errorMessage.value = "Không thể kết nối đến máy chủ";
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
}
.auth-left {
  position: relative;
  flex: 1;
  background: rgb(192, 90, 78);
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
}
.logo {
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  border-radius: 8px;
  background: #ffffff;
  color: #111827;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 500;
}
.logo-icon {
  display: flex;
  align-items: center;
}
.logo-text strong {
  font-weight: 800;
}
.auth-illustration {
  text-align: center;
}
.auth-illustration h2 {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 16px;
}
.auth-illustration p {
  font-size: 1.2rem;
  opacity: 0.9;
}
.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-card);
  padding: 40px;
}
.auth-form-wrapper {
  width: 100%;
  max-width: 400px;
}
.auth-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-main);
}
.auth-subtitle {
  color: var(--text-muted);
  margin-bottom: 32px;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.auth-form .btn-primary {
  background-color: rgb(192, 90, 78);
}
.auth-form .btn-primary:hover {
  background-color: rgb(166, 74, 64);
}
.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
  color: var(--text-main);
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.text-link {
  color: rgb(192, 90, 78);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
}
.text-link:hover {
  text-decoration: underline;
}
.w-100 {
  width: 100%;
}
.mt-2 {
  margin-top: 8px;
}

.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.auth-divider::before,
.auth-divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid var(--border-light);
}
.auth-divider span {
  padding: 0 16px;
}
.btn-social {
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-weight: 500;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
}
.btn-social:hover {
  background: var(--bg-input);
}
.auth-footer {
  text-align: center;
  margin-top: 32px;
  font-size: 0.95rem;
  color: var(--text-muted);
}
@media (max-width: 768px) {
  .auth-left {
    display: none;
  }
}
.login-error {
  color: #dc2626;
  font-size: 0.9rem;
  margin: -8px 0 0;
}
</style>
