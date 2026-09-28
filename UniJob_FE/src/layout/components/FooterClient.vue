<template>
  <footer class="footer-client">
    <div class="footer-container">
      <div class="footer-top">
        <!-- Brand -->
        <div class="footer-brand">
          <div class="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L2 8L12 13L22 8L12 3Z" fill="#c05a4e"/>
              <path d="M4 10V15C4 15 8 19 12 19C16 19 20 15 20 15V10L12 14L4 10Z" fill="#c05a4e" fill-opacity="0.7"/>
            </svg>
            <span>Uni<strong style="color: #c05a4e">Job</strong></span>
          </div>
          <p>Nền tảng tìm kiếm việc làm hàng đầu dành cho sinh viên và người mới tốt nghiệp Việt Nam.</p>
          <div class="socials">
            <a href="#" aria-label="Facebook" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Twitter" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" class="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div class="footer-links">
          <div class="link-group">
            <h4>Tìm việc</h4>
            <router-link to="/tim-viec">Tất cả việc làm</router-link>
            <router-link to="/tim-viec?type=parttime">Bán thời gian</router-link>
            <router-link to="/tim-viec?type=internship">Thực tập sinh</router-link>
            <router-link to="/tim-viec?type=remote">Làm từ xa</router-link>
          </div>
          <div class="link-group">
            <h4>Nhà tuyển dụng</h4>
            <router-link to="/nha-tuyen-dung">Đăng tin tuyển dụng</router-link>
            <router-link to="/nha-tuyen-dung">Tìm ứng viên</router-link>
            <a href="#">Gói dịch vụ</a>
          </div>
          <div class="link-group">
            <h4>Hỗ trợ</h4>
            <a href="#">Trung tâm trợ giúp</a>
            <a href="#">Điều khoản sử dụng</a>
            <a href="#">Chính sách bảo mật</a>
            <a href="#">Liên hệ</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>© 2026 UniJob. All rights reserved.</p>
        <p>Made by Group 1 - BaoDepTrai -</p>
      </div>
    </div>
  </footer>
</template>

<script setup></script>

<style scoped>
.footer-client {
  background: #ffffff;
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  margin-top: auto;
}
.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 24px;
  box-sizing: border-box;
}
.footer-top {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 48px;
  margin-bottom: 40px;
}
.footer-brand .logo {
  display: flex; align-items: center; gap: 10px;
  font-size: 1.5rem; font-weight: 600; color: #111827;
  margin-bottom: 12px; text-decoration: none;
}
.footer-brand p { color: #4b5563; font-size: 0.9rem; line-height: 1.6; margin: 0 0 20px; }
.socials { display: flex; gap: 10px; }
.social-icon {
  width: 36px; height: 36px; border-radius: 8px;
  background: #f3f4f6; border: 1px solid #e5e7eb;
  display: flex; align-items: center; justify-content: center;
  color: #4b5563; text-decoration: none; transition: all 0.2s ease;
}
.social-icon:hover { background: #fdf5f4; color: #c05a4e; border-color: #c05a4e; }
.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.link-group h4 {
  color: #111827; font-size: 0.95rem; font-weight: 600;
  margin: 0 0 16px; text-transform: uppercase; letter-spacing: 0.05em;
}
.link-group a {
  display: block; text-decoration: none; color: #4b5563;
  font-size: 0.95rem; padding: 4px 0; transition: color 0.2s ease;
}
.link-group a:hover { color: #c05a4e; }
.footer-bottom {
  border-top: 1px solid rgba(229, 231, 235, 0.5);
  padding-top: 24px;
  display: flex; justify-content: space-between; align-items: center;
  flex-wrap: wrap; gap: 8px;
}
.footer-bottom p { margin: 0; font-size: 0.9rem; color: #6b7280; }
@media (max-width: 900px) {
  .footer-top { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 600px) {
  .footer-links { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
</style>
