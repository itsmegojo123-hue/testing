<template>
  <div class="company-page">
    <div class="company-header">
      <h1>CÔNG TY</h1>
      <p>Khám phá các công ty đang tuyển dụng</p>
    </div>

    <div class="company-grid">
      <article
        v-for="(company, index) in companies"
        :key="company.name"
        class="company-card"
        :class="{ 'company-card-offset': index % 2 === 1 }"
      >
        <div class="company-card-inner">
          <div class="logo-box">[LOGO]</div>

          <div class="company-content">
            <div class="company-row">
              <span class="company-name">{{ company.name }}</span>
            </div>

            <div class="rating-row">
              <span class="star">★</span>
              <span>{{ company.rating }}</span>
            </div>

            <div class="info-row">
              <span class="dot dot-location"></span>
              <span>{{ company.location }}</span>
            </div>

            <div class="info-row">
              <span class="dot dot-industry"></span>
              <span>{{ company.industry }}</span>
            </div>

            <div class="jobs-count">{{ company.jobs }} việc làm</div>

            <button class="more-btn">Xem thêm</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
const companies = [
  { name: 'FPT Software', rating: '4.5', location: 'Đà Nẵng', industry: 'Công nghệ', jobs: 25 },
  { name: 'Viettel', rating: '4.7', location: 'Hà Nội', industry: 'Viễn thông', jobs: 18 },
  { name: 'VNG Corporation', rating: '4.3', location: 'TP. HCM', industry: 'Công nghệ', jobs: 12 },
  { name: 'NCC Việt Nam', rating: '4.4', location: 'Hà Nội', industry: 'Phần mềm', jobs: 9 },
  { name: 'Công ty A', rating: '4.6', location: 'Đà Nẵng', industry: 'Fintech', jobs: 15 },
  { name: 'Công ty B', rating: '4.2', location: 'TP. HCM', industry: 'Dịch vụ', jobs: 11 }
]
</script>

<style scoped>
.company-page {
  min-height: calc(100vh - 80px);
  background: linear-gradient(180deg, #f2e7e1 100%, #f6efe9 100%);
  color: #3c2d2b;
  padding: 26px 32px 40px;
}

.company-header {
  margin-bottom: 24px;
}

.company-header h1 {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  margin: 0 0 10px;
  color: #563b39;
}

.company-header p {
  font-size: 1.1rem;
  color: #6b4b46;
  margin: 0;
  font-weight: 500;
}

.company-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(310px, 1fr));
  gap: 22px 28px;
  max-width: 900px;
}

.company-card {
  position: relative;
  min-height: 270px;
  padding: 0;
  background: rgba(255, 255, 255, 0.18);
  border: 2px solid rgba(130, 86, 78, 0.8);
  border-radius: 20px;
  box-shadow: 0 0 0 1px rgba(150, 109, 99, 0.08);
  width: calc(100% + 2cm);
  max-width: calc(100% + 2cm);
}

.company-card-offset {
  margin-left: 10cm;
}

.company-card-inner {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 18px 16px 16px 18px;
  min-height: 240px;
}

.logo-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 126px;
  min-width: 126px;
  height: 68px;
  margin-top: 6px;
  margin-left: 0.5cm;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: rgba(88, 52, 47, 0.92);
  border: 1px solid rgba(136, 96, 88, 0.55);
  background: rgba(255, 255, 255, 0.1);
}

.company-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 1.2cm;
}

.company-row {
  margin-bottom: 8px;
}

.company-name {
  font-size: 1.05rem;
  font-weight: 600;
  color: #402e2b;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  color: #4a3431;
  font-weight: 600;
}

.star {
  color: #c76f5c;
  font-size: 1.05rem;
}

.info-row {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b2f2a;
  font-size: 1.05rem;
  margin-bottom: 12px;
  min-height: 20px;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-location {
  background: linear-gradient(135deg, #ec8fa2 0%, #d77f93 100%);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
}

.dot-industry {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  background: linear-gradient(135deg, #f0b8a7 0%, #e7a58c 100%);
}

.jobs-count {
  margin-top: 16px;
  margin-bottom: 18px;
  font-size: 1.05rem;
  color: #4d3633;
  font-weight: 500;
}

.more-btn {
  align-self: flex-start;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(126, 86, 78, 0.9);
  color: #5a3d38;
  min-width: 96px;
  height: 36px;
  padding: 0 14px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.more-btn:hover {
  border-color: #b65f55;
  color: #8b463f;
  background: rgba(190, 121, 109, 0.08);
}

@media (max-width: 980px) {
  .company-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .company-page {
    padding: 20px 16px 32px;
  }

  .company-grid {
    grid-template-columns: 1fr;
  }

  .company-header h1 {
    font-size: 1.8rem;
  }
}
</style>
