<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <div class="eyebrow">
            <span class="star-icon">✦</span> Kết nối đúng việc, đúng bạn
          </div>
          <h1 class="hero-title">
            More Than <br />
            <span class="italic-serif">A Job</span>
          </h1>
          <p class="hero-subtitle">
            Tìm công việc phù hợp với nhịp sống sinh viên — để có <br />
            thêm trải nghiệm, kỹ năng và những người bạn mới.
          </p>
          <div class="hero-actions">

            <button class="btn-primary" type="button" @click="$router.push('/tim-viec')">
              Tìm việc ngay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
            <button class="btn-text">
              UniJob hoạt động thế nào
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </div>
        </div>
        <div class="hero-image-wrapper">
          <!-- Placeholder for the illustration -->
          <div class="illustration-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
              <!-- Simple SVG representation of the illustration -->
              <circle cx="200" cy="150" r="140" fill="#f8e5d6" />
              <rect x="150" y="80" width="100" height="120" rx="10" fill="#ffffff" stroke="#2b2622" stroke-width="3" />
              <polygon points="200,40 140,80 260,80" fill="#c05a4e" stroke="#2b2622" stroke-width="3" />
              <!-- Student 1 -->
              <circle cx="120" cy="160" r="20" fill="#4a5568" />
              <rect x="100" y="180" width="40" height="80" rx="10" fill="#c05a4e" />
              <!-- Student 2 -->
              <circle cx="200" cy="180" r="18" fill="#4a5568" />
              <rect x="185" y="200" width="30" height="70" rx="10" fill="#f6ad55" />
              <!-- Student 3 -->
              <circle cx="280" cy="150" r="22" fill="#4a5568" />
              <rect x="255" y="172" width="50" height="90" rx="10" fill="#ffffff" stroke="#2b2622" stroke-width="3" />
            </svg>
            <div class="stats-badge">
              <span class="dot"></span> Hơn 100 việc mới tuần này
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Search Section -->
    <section class="search-section">
      <div class="search-container">
        <div class="search-bar">
          <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input v-model="value" type="text" placeholder="Tìm việc làm part-time, remote..." class="search-input"
            @keyup.enter="timViec" />
          <button class="btn-search">
            Tìm việc
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
        <div class="search-filters">
          <span class="filter-label">Lọc nhanh:</span>
          <button class="filter-pill active">Việc part-time</button>
          <button class="filter-pill">Việc full-time</button>
          <button class="filter-pill">Làm việc từ xa</button>
        </div>
        <p class="search-hint">Hiện có 1 cơ hội phù hợp với bộ lọc đã chọn.</p>
      </div>
    </section>

    <!-- Jobs List Section -->
    <section class="jobs-section">
      <div class="jobs-container">
        <div class="section-header">
          <div class="eyebrow">CƠ HỘI NỔI BẬT</div>
          <div class="header-top">
            <h2 class="section-title">Việc hay đang chờ bạn</h2>
            <button class="btn-view-all" type="button" @click="$router.push('/tim-viec')">
              Xem tất cả
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
          <p class="section-subtitle">Chọn một công việc vừa sức để bắt đầu hành trình của riêng mình.</p>

          <div class="tabs">
            <button class="tab active">Tất cả</button>
            <button class="tab">Việc part-time</button>
            <button class="tab">Việc full-time</button>
            <button class="tab">Làm việc từ xa</button>
          </div>
        </div>

        <div class="jobs-grid">
          <div v-if="dangTai" class="col-span-3 text-center py-8 text-gray-500">Đang tải việc làm...</div>
          <div v-for="(job, index) in jobs" :key="job.id" class="job-card" :class="getBackgroundClass(index)">
            <div class="card-top">
              <div class="icon-wrapper">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2b2622" stroke-width="2">
                  <rect x="3" y="4" width="18" height="12" rx="2" />
                  <path d="M12 20h9" />
                  <path d="M16 16v4" />
                  <path d="M8 16v4" />
                  <path d="M3 20h4" />
                </svg>
              </div>
              <span class="job-badge">{{ job.type }}</span>
            </div>
            <div class="card-content">
              <span class="company">{{ job.company }}</span>
              <h3 class="job-name">{{ job.title }}</h3>
              <div class="job-meta">
                <div class="meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {{ job.location }}
                </div>
                <div class="meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {{ job.posted }}
                </div>
              </div>
            </div>
            <div class="card-bottom">
              <span class="salary">{{ job.salary }}</span>
              <button class="btn-circle-arrow" @click="$router.push('/chi-tiet-viec/' + job.id)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Info Section -->
    <section class="info-section">
      <div class="info-container">
        <div class="info-left">
          <div class="eyebrow">DỄ DÀNG BẮT ĐẦU</div>
          <h2 class="section-title">Một công việc tốt<br />có thể bắt đầu<br />từ hôm nay.</h2>
        </div>
        <div class="info-right">
          <div class="info-step">
            <div class="step-num">01</div>
            <div class="step-content">
              <h3>Tìm việc hợp gu</h3>
              <p>Lọc theo thời gian, địa điểm và kỹ năng bạn đang có.</p>
            </div>
          </div>
          <div class="info-step">
            <div class="step-num">02</div>
            <div class="step-content">
              <h3>Ứng tuyển đơn giản</h3>
              <p>Gửi hồ sơ gọn nhẹ và theo dõi phản hồi ở một nơi.</p>
            </div>
          </div>
          <div class="info-step border-none">
            <div class="step-num">03</div>
            <div class="step-content">
              <h3>Tích lũy trải nghiệm</h3>
              <p>Học những điều mới từ công việc đầu tiên của bạn.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <div class="cta-box">
          <div class="cta-content">
            <div class="eyebrow text-white">UNIJOB DÀNH CHO SINH VIÊN</div>
            <h2 class="cta-title">Sẵn sàng cho cơ hội<br />tiếp theo?</h2>
          </div>
          <div class="cta-actions">
            <ul class="cta-features">
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Việc làm rõ ràng, phù hợp lịch học
              </li>
              <li>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Bắt đầu hồ sơ của bạn trong vài phút
              </li>
            </ul>
            <button class="btn-white">
              Khám phá ngay
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

const jobs = ref([]);
const dangTai = ref(false);

const dinhDangLuong = (soTien, donVi) => {
  const tien = Number(soTien).toLocaleString("vi-VN");
  if (donVi && donVi !== "VND") {
    return `${tien} đ/${donVi}`;
  }
  return `${tien} đ`;
};

const getBackgroundClass = (index) => {
  const classes = ['card-orange', 'card-pink', 'card-yellow'];
  return classes[index % classes.length];
};

const getData = () => {
  dangTai.value = true;
  axios
    .get("http://127.0.0.1:8000/api/viec-lam/danh-sach")
    .then((res) => {
      // Chỉ lấy 3 việc làm mới nhất cho trang chủ
      jobs.value = res.data.data.slice(0, 3).map((item) => {
        return {
          id: item.id,
          company: item.company_name,
          title: item.title,
          location: [item.district, item.province_city]
            .filter(Boolean)
            .join(", "),
          type: item.category_name || "Khác",
          salary: dinhDangLuong(item.salary_amount, item.salary_unit),
          posted: "Hạn: " + item.application_deadline.split("-").reverse().join("/"),
        };
      });
    })
    .catch(() => {
      jobs.value = [];
    })
    .finally(() => {
      dangTai.value = false;
    });
};

onMounted(() => {
  getData();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');

.home-page {
  background-color: #fbf9f4;
  /* Light beige matching screenshot */
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  color: #2b2622;
  overflow-x: hidden;
}

/* Common Styles */
.eyebrow {
  color: #c05a4e;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.star-icon {
  font-size: 1.2rem;
  line-height: 1;
}

/* Hero Section */
.hero-section {
  padding: 60px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-content {
  flex: 1;
  max-width: 500px;
}

.hero-title {
  font-family: 'DM Serif Display', serif;
  font-size: 5rem;
  line-height: 1.1;
  color: #2b2622;
  margin: 0 0 24px 0;
}

.italic-serif {
  font-style: italic;
  color: #c05a4e;
}

.hero-subtitle {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #6e6965;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.btn-primary {
  background-color: #c05a4e;
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.btn-primary:hover {
  background-color: #a8493d;
  transform: translateY(-2px);
}

.btn-text {
  background: none;
  border: none;
  color: #2b2622;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.btn-text:hover {
  text-decoration: underline;
}

.hero-image-wrapper {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  position: relative;
}

.illustration-placeholder {
  width: 100%;
  max-width: 500px;
  position: relative;
}

.stats-badge {
  position: absolute;
  bottom: 20px;
  left: 0px;
  background: white;
  padding: 10px 16px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #48bb78;
  border-radius: 50%;
}

/* Search Section */
.search-section {
  padding: 0 24px 60px;
  max-width: 1000px;
  margin: 0 auto;
}

.search-container {
  background: #f4eee3;
  padding: 24px;
  border-radius: 16px;
}

.search-bar {
  display: flex;
  background: white;
  padding: 8px 8px 8px 20px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: 20px;
}

.search-icon {
  color: #a09a95;
  margin-right: 12px;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1.05rem;
  font-family: inherit;
  color: #2b2622;
}

.search-input::placeholder {
  color: #a09a95;
}

.btn-search {
  background: #2b2622;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.2s;
}

.btn-search:hover {
  background: #1a1613;
}

.search-filters {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.filter-label {
  font-size: 0.9rem;
  color: #6e6965;
}

.filter-pill {
  background: white;
  border: 1px solid #e2dcd2;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  color: #2b2622;
  cursor: pointer;
  transition: all 0.2s;
}

.filter-pill:hover {
  border-color: #2b2622;
}

.filter-pill.active {
  background: #2b2622;
  color: white;
  border-color: #2b2622;
}

.search-hint {
  font-size: 0.85rem;
  color: #a09a95;
  margin: 0;
}

/* Jobs Section */
.jobs-section {
  padding: 60px 24px;
  background: #fbf9f4;
  border-top: 1px solid #efe9df;
}

.jobs-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  margin-bottom: 40px;
}

.header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 8px;
}

.section-title {
  font-family: 'DM Serif Display', serif;
  font-size: 3rem;
  color: #2b2622;
  margin: 0;
  line-height: 1.2;
}

.btn-view-all {
  background: transparent;
  border: 1px solid #2b2622;
  padding: 8px 20px;
  border-radius: 30px;
  font-weight: 600;
  font-size: 0.95rem;
  color: #2b2622;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-view-all:hover {
  background: #2b2622;
  color: white;
}

.section-subtitle {
  color: #6e6965;
  font-size: 1.1rem;
  margin: 0 0 24px 0;
}

.tabs {
  display: flex;
  gap: 32px;
  border-bottom: 1px solid #efe9df;
}

.tab {
  background: none;
  border: none;
  padding: 12px 0;
  font-size: 1rem;
  font-weight: 600;
  color: #6e6965;
  cursor: pointer;
  position: relative;
}

.tab.active {
  color: #c05a4e;
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background: #c05a4e;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.job-card {
  padding: 32px 24px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.job-card:hover {
  transform: translateY(-4px);
}

.card-orange {
  background-color: #fce8cc;
}

.card-pink {
  background-color: #fad3d8;
}

.card-yellow {
  background-color: #f5eeac;
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;
}

.job-badge {
  background: rgba(255, 255, 255, 0.6);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #2b2622;
}

.card-content {
  flex: 1;
  margin-bottom: 32px;
}

.company {
  font-size: 0.9rem;
  color: #6e6965;
  margin-bottom: 8px;
  display: block;
}

.job-name {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2b2622;
  margin: 0 0 16px 0;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #4a4542;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.salary {
  font-weight: 700;
  color: #2b2622;
  font-size: 1.1rem;
}

.btn-circle-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #2b2622;
  color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-circle-arrow:hover {
  background: #c05a4e;
}

/* Info Section */
.info-section {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
  border-top: 1px solid #efe9df;
}

.info-container {
  display: flex;
  gap: 60px;
}

.info-left {
  flex: 1;
}

.info-left .section-title {
  margin-top: 24px;
  line-height: 1.1;
}

.info-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.info-step {
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid #efe9df;
}

.info-step.border-none {
  border-bottom: none;
}

.step-num {
  font-family: 'DM Serif Display', serif;
  font-size: 1.5rem;
  color: #e04b36;
}

.step-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #2b2622;
}

.step-content p {
  color: #6e6965;
  margin: 0;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  padding: 0 24px 80px;
  max-width: 1200px;
  margin: 0 auto;
}

.cta-box {
  background: #e04b36;
  border-radius: 20px;
  padding: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text-white {
  color: rgba(255, 255, 255, 0.9);
}

.cta-title {
  font-family: 'DM Serif Display', serif;
  font-size: 3.5rem;
  color: white;
  margin: 0;
  line-height: 1.1;
}

.cta-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.cta-features {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: white;
}

.cta-features li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
}

.btn-white {
  background: white;
  color: #e04b36;
  border: none;
  padding: 16px 32px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-white:hover {
  transform: translateY(-2px);
}

@media (max-width: 900px) {

  .hero-container,
  .info-container {
    flex-direction: column;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .cta-box {
    flex-direction: column;
    gap: 40px;
    align-items: flex-start;
  }

  .hero-title {
    font-size: 3.5rem;
  }
}
</style>
