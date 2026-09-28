<template>
  <div class="auth-container">
    <!-- THÔNG BÁO -->
      <div
          v-if="notification.show"
          class="notification"
          :class="notification.type"
>
          <span class="notification-icon">
              {{ notification.type === 'success' ? '✓' : '!' }}
          </span>

          <span class="notification-message">
              {{ notification.message }}
          </span>
</div>
    <div class="auth-left">
      <div class="auth-brand">
        <div class="logo-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="#fff5f2"/>
            <path d="M4 10V15C4 15 8 19 12 19C16 19 20 15 20 15V10L12 14L4 10Z" fill="#fff5f2" fill-opacity="0.7"/>
          </svg>
        </div>
        <span class="brand-text">Uni<strong>Job</strong></span>
      </div>
      <div class="auth-illustration">
        <h2>Khai phá tiềm năng của bạn</h2>
        <p>Tạo tài khoản và bắt đầu khám phá những cơ hội việc làm dành riêng cho bạn.</p>
      </div>

      <div class="job-illustration" aria-hidden="true">
        <div class="mini-badge badge-top">+120 jobs</div>
        <div class="mini-badge badge-bottom">CV matched</div>

        <div class="artboard">
          <div class="orb orb-one"></div>
          <div class="orb orb-two"></div>
          <div class="document-card">
            <div class="doc-line short"></div>
            <div class="doc-line"></div>
            <div class="doc-line medium"></div>
          </div>
          <div class="search-bubble">
            <span class="search-icon"></span>
          </div>
          <div class="briefcase">
            <span class="handle"></span>
          </div>
        </div>
      </div>
    </div>
    
    <div class="auth-right">
      <div class="auth-form-wrapper">
        <h1 class="auth-title">Đăng ký tài khoản</h1>
        <p class="auth-subtitle">Nhập thông tin của bạn để bắt đầu.</p>
        
        <form @submit.prevent="register" class="auth-form">
          <div class="form-row">
            <div class="form-group">
              <label>Tên</label>
              <input type="text" class="input-field" placeholder="Tram" required />
            </div>
            <div class="form-group">
              <label>Họ</label>
              <input type="text" class="input-field" placeholder="Nguyen" required />
            </div>
          </div>

          <div class="form-group">
            <label>Địa chỉ Email</label>
            <input type="email" class="input-field" placeholder="Nhập địa chỉ email của bạn" v-model="email" required />
          </div>
          
          <div class="form-group">
            <label>Mật khẩu</label>
            <input type="password" class="input-field" placeholder="Tạo mật khẩu" v-model="password" required />
          </div>
          
          <button type="submit" class="btn-primary w-100 mt-2">Đăng ký</button>
        </form>
        
        <div class="auth-divider">
          <span>hoặc đăng ký với</span>
        </div>
        
        <button class="btn-social" type="button">
          <svg class="google-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#4285F4" d="M21.6 12.23c0-.7-.06-1.37-.17-2.03H12v3.84h5.39a4.6 4.6 0 0 1-2 3.02v2.51h3.24c1.9-1.75 2.97-4.33 2.97-7.34Z"/>
            <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.44l-3.24-2.51c-.9.6-2.05.95-3.37.95-2.6 0-4.8-1.76-5.58-4.12H.8v2.6A10 10 0 0 0 12 22Z"/>
            <path fill="#FBBC05" d="M6.42 18.84A6 6 0 0 1 6 15.8V13.2H2.7a9.97 9.97 0 0 0 0 8.96l3.72-2.32Z"/>
            <path fill="#EA4335" d="M12 5.93c1.47 0 2.79.51 3.83 1.52l2.86-2.87C16.96 2.86 14.7 2 12 2a10 10 0 0 0-9.2 5.86l3.72 2.6A6 6 0 0 1 12 5.93Z"/>
          </svg>
          <span>Google</span>
        </button>
        
        <p class="auth-footer">
          Đã có tài khoản? <router-link to="/dang-nhap" class="text-link">Đăng nhập</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

// Thông báo
const notification = ref({
  show: false,
  message: '',
  type: 'success'
})

let notificationTimer = null

const showNotification = (message, type = 'success') => {
  notification.value = {
    show: true,
    message: message,
    type: type
  }

  // Nếu đang có thông báo cũ thì xóa timer cũ
  if (notificationTimer) {
    clearTimeout(notificationTimer)
  }

  // Tự động ẩn sau 3 giây
  notificationTimer = setTimeout(() => {
    notification.value.show = false
  }, 3000)
}

const register = async () => {
  try {
    const response = await fetch(
      'http://127.0.0.1:8000/api/tai-khoan/dang-ky-sinh-vien',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value
        })
      }
    )

    const data = await response.json()

    if (response.ok) {
      showNotification(
        'Đăng ký tài khoản thành công!',
        'success'
      )

      console.log(data)

      // Xóa dữ liệu trong form
      email.value = ''
      password.value = ''

    } else {
      if (data.errors) {
        if (data.errors.email) {
          showNotification(
            'Email này đã được đăng ký. Vui lòng sử dụng email khác.',
            'error'
          )
        } else if (data.errors.password) {
          showNotification(
            'Mật khẩu phải có ít nhất 6 ký tự.',
            'error'
          )
        } else {
          showNotification(
            Object.values(data.errors).flat().join('\n'),
            'error'
          )
        }
      } else {
        showNotification(
          data.message || 'Đăng ký thất bại.',
          'error'
        )
      }
    }

  } catch (error) {
    console.error(error)

    showNotification(
      'Không thể kết nối đến server Laravel.',
      'error'
    )
  }
}
</script>

<style scoped>
/* =========================
   THÔNG BÁO
   ========================= */

.notification {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);

  z-index: 9999;

  min-width: 320px;
  max-width: 420px;

  padding: 16px 20px;

  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 12px;

  color: white;
  font-size: 15px;
  font-weight: 500;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Thông báo thành công */
.notification.success {
  background-color: #2eaf5d;
}

/* Thông báo lỗi */
.notification.error {
  background-color: #dc3545;
}

/* Icon */
.notification-icon {
  width: 24px;
  height: 24px;

  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-shrink: 0;

  font-size: 14px;
  font-weight: 700;
}

/* Nội dung */
.notification-message {
  line-height: 1.4;
}

/* Hiệu ứng xuất hiện 
@keyframes notification-slide-in {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}*/
.auth-container {
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #c75d4e 0%, #b75246 30%, #a84239 64%, #9b3d35 100%);
}
.auth-left {
  flex: 1;
  background: linear-gradient(135deg, #d58569 0%, #c76d59 26%, #bf6353 52%, #b4564b 100%);
  padding: 40px 40px 28px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  color: white;
  position: relative;
  overflow: hidden;
}
.auth-left::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top left, rgba(255,255,255,0.24), transparent 40%);
}
.auth-brand,
.auth-illustration {
  position: relative;
  z-index: 1;
}
.auth-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 36px;
  margin-left: 30px;
}
.auth-brand strong { font-weight: 800; }
.brand-text {
  color: #ffffff;
  letter-spacing: -0.03em;
}
.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 3px 8px rgba(53, 22, 18, 0.18));
}
.auth-illustration {
  max-width: 500px;
  margin-top: 16px;
  margin-left: 30px;
}
.auth-illustration h2 {
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 1.05;
  margin-bottom: 18px;
  letter-spacing: -0.05em;
}
.auth-illustration p {
  font-size: 1.12rem;
  opacity: 0.92;
  line-height: 1.6;
  max-width: 430px;
}

.job-illustration {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 245px;
  margin-top: 4px;
  margin-left: 30px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.artboard {
  position: relative;
  width: 380px;
  height: 210px;
  margin-left: 10px;
  margin-bottom: 8px;
}

.orb {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.orb-one {
  width: 120px;
  height: 120px;
  top: 18px;
  left: 30px;
}

.orb-two {
  width: 84px;
  height: 84px;
  right: 34px;
  bottom: 18px;
}

.document-card {
  position: absolute;
  left: 92px;
  top: 56px;
  width: 150px;
  height: 116px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.22);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 24px rgba(91, 38, 31, 0.12);
  padding: 18px 16px;
}

.doc-line {
  height: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
}

.doc-line.short {
  width: 42%;
}

.doc-line.medium {
  width: 70%;
}

.search-bubble {
  position: absolute;
  right: 32px;
  top: 20px;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: 0 18px 24px rgba(88, 38, 32, 0.14);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-icon {
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
  border: 3px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
}

.search-icon::after {
  content: "";
  position: absolute;
  width: 10px;
  height: 3px;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.9);
  right: -8px;
  bottom: -2px;
  transform: rotate(45deg);
}

.briefcase {
  position: absolute;
  left: 8px;
  bottom: 0;
  width: 128px;
  height: 80px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 16px 24px rgba(92, 41, 33, 0.1);
}

.briefcase::before {
  content: "";
  position: absolute;
  left: 18px;
  right: 18px;
  top: 18px;
  height: 24px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.7);
}

.handle {
  position: absolute;
  left: 34px;
  top: -14px;
  width: 44px;
  height: 24px;
  border: 4px solid rgba(255, 255, 255, 0.7);
  border-bottom: none;
  border-radius: 18px 18px 0 0;
}

.mini-badge {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 116px;
  height: 38px;
  padding: 0 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  backdrop-filter: blur(2px);
  box-shadow: 0 12px 24px rgba(93, 42, 32, 0.12);
}

.badge-top {
  top: 16px;
  left: 18px;
}

.badge-bottom {
  right: 14px;
  bottom: 30px;
}

.auth-right {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #c25d4d 0%, #b8574a 46%, #ab4e43 100%);
  padding: 40px;
}
.auth-form-wrapper {
  width: 100%;
  max-width: 500px;
  background: rgba(255,255,255,0.78);
  border: 1px solid rgba(238, 216, 211, 0.9);
  border-radius: 24px;
  box-shadow: var(--shadow-lg);
  padding: 36px 30px;
  margin-left: -20px;
  backdrop-filter: blur(6px);
}
.auth-title {
  font-size: 2.25rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: var(--text-main);
}
.auth-subtitle {
  color: var(--text-muted);
  margin-bottom: 32px;
  font-size: 1rem;
}
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.form-row {
  display: flex;
  gap: 16px;
}
.form-row .form-group {
  flex: 1;
}
.form-group label {
  display: block;
  font-size: 0.96rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-main);
}
.text-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
}
.text-link:hover { text-decoration: underline; }
.w-100 { width: 100%; }
.mt-2 { margin-top: 8px; }

.auth-divider {
  display: flex;
  align-items: center;
  text-align: center;
  margin: 24px 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
.auth-divider::before, .auth-divider::after {
  content: '';
  flex: 1;
  border-bottom: 1px solid var(--border-light);
}
.auth-divider span {
  padding: 0 16px;
}
.btn-primary {
  font-size: 1.2rem;
  padding: 14px 20px;
}

.btn-social {
  width: 100%;
  padding: 12px;
  background: #fff;
  border: 1px solid var(--border-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--text-main);
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: var(--shadow-sm);
}
.google-icon {
  width: 20px;
  height: 20px;
  display: block;
  flex-shrink: 0;
}
.btn-social:hover {
  background: var(--bg-input);
  transform: translateY(-1px);
}
.auth-footer {
  text-align: center;
  margin-top: 32px;
  font-size: 0.95rem;
  color: var(--text-muted);
}
@media (max-width: 768px) {
  .auth-left { display: none; }
  .auth-right { padding: 24px 16px; }
  .auth-form-wrapper { padding: 24px 20px; }
  .form-row { flex-direction: column; }
}
</style>
