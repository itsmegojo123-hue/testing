<template>
  <div class="jobs-page">
    <div class="jobs-container">

      <!-- Header Section -->
      <div class="page-header">
        <div class="header-content">
          <span class="eyebrow">TÌM KIẾM VIỆC LÀM THÔNG MINH</span>
          <h1 class="page-title"><span class="italic-serif">Your effort, your opportunity.</span></h1>
          <p class="page-subtitle">Công việc linh hoạt từ những doanh nghiệp trân trọng tài năng sinh viên.</p>
        </div>
        <div class="header-actions">
          <button type="button" class="btn-filter" :aria-expanded="hienBoLoc" aria-controls="job-filter-panel"
            @click="batTatBoLoc()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round">
              <line x1="4" y1="21" x2="4" y2="14" />
              <line x1="4" y1="10" x2="4" y2="3" />
              <line x1="12" y1="21" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12" y2="3" />
              <line x1="20" y1="21" x2="20" y2="16" />
              <line x1="20" y1="12" x2="20" y2="3" />
              <line x1="1" y1="14" x2="7" y2="14" />
              <line x1="9" y1="8" x2="15" y2="8" />
              <line x1="17" y1="16" x2="23" y2="16" />
            </svg>
            Bộ lọc
          </button>
        </div>
      </div>

      <!-- Search Section -->
      <form @submit.prevent="timViec()">
        <div class="search-bar">
          <div class="search-input-wrapper">
            <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input :value="boLoc.keyword" @input="onInputKeyword" type="text" class="search-input"
              placeholder="Tìm vị trí hoặc tên công ty" />
          </div>

          <button type="submit" class="btn-search">
            Tìm việc
          </button>
        </div>

        <div v-show="hienBoLoc" id="job-filter-panel" class="filter-panel">
          <label class="filter-field">
            <span>Ngành nghề</span>

            <select v-model="boLoc.category_id">
              <option value="">Tất cả ngành nghề</option>

              <option v-for="item in danhMucs" :key="item.id" :value="String(item.id)">
                {{ item.name }}
              </option>
            </select>
          </label>

          <label class="filter-field">
            <span>Tỉnh / thành phố</span>

            <select v-model="boLoc.province_city">
              <option value="">Tất cả tỉnh/thành</option>

              <option v-for="tinh in tinhThanhs" :key="tinh" :value="tinh">
                {{ tinh }}
              </option>
            </select>
          </label>

          <button type="button" class="btn-reset" @click="xoaBoLoc()">
            Xóa bộ lọc
          </button>
        </div>
      </form>

      <div v-if="loiBoLoc" class="filter-error" role="alert">
        <p>{{ loiBoLoc }}</p>
        <button type="button" class="btn-reset" @click="layBoLoc()">
          Tải lại bộ lọc
        </button>
      </div>

      <!-- Results Header -->
      <div class="results-header">
        <span class="results-count">
          {{
            dangTai
              ? "Đang tìm việc..."
              : jobs.length + " việc làm phù hợp"
          }}
        </span>

        <select v-model="boLoc.sort" class="sort-select" aria-label="Sắp xếp việc làm" @change="timViec()">
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="deadline">Sắp hết hạn</option>
        </select>
      </div>
      <!-- Job List -->
      <div v-if="thongBao" class="error-message">
        <p>{{ thongBao }}</p>
        <button type="button" class="btn-reset" @click="getData()">Thử lại</button>
      </div>

      <p v-else-if="jobs.length === 0 && !dangTai" class="empty-message">
        Không tìm thấy việc làm phù hợp. Bạn hãy thử thay đổi bộ lọc.
      </p>

      <div v-if="jobs.length > 0 && !thongBao" class="job-list" :class="{ 'is-loading': dangTai }">
        <div v-for="job in jobs" :key="job.id" class="job-card">
          <div class="job-card-header">
            <div class="company-logo">{{ job.logo }}</div>
            <div class="job-main-info">
              <span class="company-name">{{ job.company }}</span>
              <h3 class="job-title">{{ job.title }}</h3>
              <div class="job-meta">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {{ job.location }}
              </div>
            </div>
            <button class="btn-bookmark">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>
          </div>
          <div class="job-tags">
            <span v-for="tag in job.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
          <div class="job-footer">
            <span class="salary">{{ job.salary }}</span>
            <div class="footer-right">
              <span class="time-posted">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {{ job.posted }}
              </span>
              <button class="btn-apply">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const API_URL = "http://127.0.0.1:8000/api";

const jobs = ref([]);
const dangTai = ref(false);
const thongBao = ref("");

const danhMucs = ref([]);
const khuVucs = ref([]);
const loiBoLoc = ref("");
const hienBoLoc = ref(false);

const boLoc = ref({
  keyword: "",
  category_id: "",
  province_city: "",
  sort: "newest",
});

// Một tỉnh/thành chỉ xuất hiện một lần trong ô chọn
const tinhThanhs = computed(() => {
  return [
    ...new Set(
      khuVucs.value.map((item) => item.province_city).filter(Boolean)
    ),
  ];
});

const dinhDangLuong = (soTien, donVi) => {
  const tien = Number(soTien).toLocaleString("vi-VN");

  if (donVi && donVi !== "VND") {
    return `${tien} đ/${donVi}`;
  }

  return `${tien} đ`;
};

// Giúp kết quả của lần tìm cũ không ghi đè lần tìm mới
const lanGoi = ref(0);

const getData = () => {
  const lanHienTai = ++lanGoi.value;

  dangTai.value = true;
  thongBao.value = "";

  axios
    .get(`${API_URL}/viec-lam/danh-sach`, {
      params: { ...boLoc.value },
    })
    .then((res) => {
      if (lanHienTai !== lanGoi.value) return;

      jobs.value = res.data.data.map((item) => {
        return {
          id: item.id,
          logo: (item.company_name || "U").charAt(0).toUpperCase(),
          company: item.company_name,
          title: item.title,
          location: [item.district, item.province_city]
            .filter(Boolean)
            .join(", "),
          tags: [item.category_name].filter(Boolean),
          salary: dinhDangLuong(item.salary_amount, item.salary_unit),
          posted:
            "Hạn: " +
            item.application_deadline.split("-").reverse().join("/"),
        };
      });
    })
    .catch((error) => {
      if (lanHienTai !== lanGoi.value) return;

      jobs.value = [];
      thongBao.value =
        error.response?.status === 422
          ? "Bộ lọc chưa hợp lệ. Bạn hãy kiểm tra hoặc xóa bộ lọc."
          : "Không tải được danh sách việc làm. Bạn hãy thử lại.";
    })
    .finally(() => {
      if (lanHienTai === lanGoi.value) {
        dangTai.value = false;
      }
    });
};

const layBoLoc = () => {
  loiBoLoc.value = "";

  Promise.all([
    axios.get(`${API_URL}/danh-muc/danh-sach`),
    axios.get(`${API_URL}/khu-vuc/danh-sach`),
  ])
    .then(([resDanhMuc, resKhuVuc]) => {
      danhMucs.value = resDanhMuc.data.data;
      khuVucs.value = resKhuVuc.data.data;
    })
    .catch(() => {
      loiBoLoc.value = "Không tải được danh mục hoặc khu vực.";
    });
};

let typingTimer = null;
const onInputKeyword = (event) => {
  boLoc.value.keyword = event.target.value;
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    timViec();
  }, 400); // Đợi 400ms sau khi người dùng ngừng gõ mới gọi API
};

const timViec = () => {
  const query = {
    keyword: boLoc.value.keyword.trim() || undefined,
    category_id: boLoc.value.category_id || undefined,
    province_city: boLoc.value.province_city || undefined,
    sort: boLoc.value.sort === "newest" ? undefined : boLoc.value.sort,
  };

  const diaChi = {
    path: "/tim-viec",
    query,
  };

  if (router.resolve(diaChi).fullPath === route.fullPath) {
    getData();
  } else {
    router.push(diaChi);
  }
};

const xoaBoLoc = () => {
  boLoc.value = {
    keyword: "",
    category_id: "",
    province_city: "",
    sort: "newest",
  };

  timViec();
};

const batTatBoLoc = () => {
  hienBoLoc.value = !hienBoLoc.value;
};

// Đọc bộ lọc từ URL, bao gồm keyword gửi từ trang chủ
watch(
  () => route.query,
  (query) => {
    const layChuoi = (key) => {
      return typeof query[key] === "string" ? query[key] : "";
    };

    boLoc.value = {
      keyword: layChuoi("keyword"),
      category_id: layChuoi("category_id"),
      province_city: layChuoi("province_city"),
      sort: layChuoi("sort") || "newest",
    };

    if (boLoc.value.category_id || boLoc.value.province_city) {
      hienBoLoc.value = true;
    }

    getData();
  },
  { immediate: true }
);

onMounted(() => {
  layBoLoc();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@400;500;600;700&display=swap');

.jobs-page {
  background-color: #fbf9f4;
  min-height: 100vh;
  padding-bottom: 80px;
  font-family: 'Inter', sans-serif;
  color: #2b2622;
  overflow-x: hidden;
}

.jobs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 24px 0;
}

/* Header Section */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 24px;
  margin-bottom: 36px;
}

.eyebrow {
  color: #c05a4e;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.eyebrow::before {
  content: '\2726';
  font-size: 1.1rem;
  line-height: 1;
}

.page-title {
  color: #2b2622;
  font-family: 'DM Serif Display', serif;
  font-size: 3.5rem;
  font-weight: 400;
  line-height: 1.1;
  margin: 0 0 16px;
}

.italic-serif {
  color: #000;
  font-family: 'Times New Roman', Times, serif;
  font-style: italic;
}

.page-subtitle {
  color: #6e6965;
  font-size: 1.05rem;
  line-height: 1.6;
  margin: 0;
}

.btn-filter {
  background: transparent;
  border: 1px solid #2b2622;
  color: #2b2622;
  padding: 10px 18px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: color 0.2s, background 0.2s;
}

.btn-filter:hover {
  background: #2b2622;
  color: #fff;
}

/* Search Bar */
.search-bar {
  display: flex;
  align-items: center;
  border: 0;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 28px;
  background: #f4eee3;
}

.search-input-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
  padding: 12px 16px;
  gap: 12px;
  background: #fff;
  border-radius: 10px;
}

.search-icon {
  color: #a09a95;
  flex-shrink: 0;
}

.search-input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 1rem;
  font-family: inherit;
  color: #2b2622;
  background: transparent;
}

.search-input::placeholder {
  color: #a09a95;
}

.search-divider {
  display: none;
}

.search-dropdown {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 18px;
  color: #2b2622;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
}

/* Results Header */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.results-count {
  color: #6e6965;
  font-size: 0.9rem;
}

.sort-dropdown,
.sort-select {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #2b2622;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: transparent;
  outline: none;
  appearance: none;
  padding-right: 18px;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%232b2622' stroke-width='2' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M6 9l6 6 6-6'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right center;
}

/* Job List */
.job-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 280px), 1fr));
  align-items: start;
  gap: 20px;
  transition: opacity 0.3s ease;
}

.job-list.is-loading {
  opacity: 0.5;
  pointer-events: none;
}

.job-card {
  border: 0;
  border-radius: 16px;
  padding: 20px;
  background: #fce8cc;
  min-height: 270px;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s;
}

.job-card:nth-child(3n + 2) {
  background: #fad3d8;
}

.job-card:nth-child(3n) {
  background: #f5eeac;
}

.job-card:hover {
  transform: translateY(-3px);
}

.job-card-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.company-logo {
  width: 52px;
  height: 52px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.7);
  color: #c05a4e;
  font-size: 1.25rem;
  font-weight: 700;
  flex-shrink: 0;
}

.job-main-info {
  flex: 1;
}

.company-name {
  color: #6e6965;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  margin-bottom: 4px;
  display: block;
}

.job-title {
  color: #2b2622;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.3;
  margin: 0 0 6px 0;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #4a4542;
  font-size: 0.85rem;
}

.btn-bookmark {
  background: none;
  border: none;
  color: #6e6965;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s;
}

.btn-bookmark:hover {
  color: #c05a4e;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: auto 0 24px;
}

.tag {
  background: rgba(255, 255, 255, 0.62);
  color: #4a4542;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.job-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;
  gap: 12px;
}

.salary {
  font-weight: 600;
  color: #2b2622;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.footer-right {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
}

.time-posted {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6e6965;
  font-size: 0.85rem;
}

.btn-apply {
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  background: #2b2622;
  border: none;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  display: flex;
  transition: background 0.2s, transform 0.2s;
}

.btn-apply:hover {
  background: #c05a4e;
  transform: translateX(2px);
}

@media (max-width: 700px) {
  .jobs-container {
    padding: 40px 20px 0;
  }

  .page-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
  }

  .page-title {
    font-size: 2.8rem;
  }

  .search-bar {
    flex-wrap: wrap;
    gap: 4px;
  }

  .search-input-wrapper {
    flex-basis: 100%;
  }

  .search-dropdown {
    padding: 8px 12px;
  }

  .job-card {
    padding: 18px;
  }
}

@media (max-width: 480px) {
  .jobs-container {
    padding-right: 16px;
    padding-left: 16px;
  }

  .page-title {
    font-size: 2.35rem;
  }

  .job-card-header {
    gap: 10px;
  }

  .company-logo {
    width: 44px;
    height: 44px;
  }

  .job-title {
    font-size: 1.2rem;
  }

  .job-footer {
    align-items: center;
    gap: 8px;
  }

  .footer-right {
    gap: 8px;
  }

  .time-posted {
    font-size: 0.75rem;
  }
}

.btn-search {
  padding: 12px 22px;
  margin-left: 12px;
  border: none;
  border-radius: 10px;
  background: #2b2622;
  color: #fff;
  font: inherit;
  cursor: pointer;
}

.filter-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  align-items: end;
  gap: 16px;
  padding: 20px;
  margin-bottom: 24px;
  border-radius: 16px;
  background: #f4eee3;
}

.filter-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.9rem;
}

.filter-field select {
  padding: 11px 14px;
  border: 1px solid #ded7ce;
  border-radius: 10px;
  background: #fff;
  color: #2b2622;
  font: inherit;
  max-width: 100%;
}

.btn-reset {
  padding: 11px 16px;
  border: 1px solid #2b2622;
  border-radius: 10px;
  background: transparent;
  color: #2b2622;
  font: inherit;
  cursor: pointer;
}

.results-header {
  flex-wrap: wrap;
  gap: 12px;
}

.filter-error {
  margin-bottom: 20px;
  color: #a33131;
}

@media (max-width: 700px) {
  .filter-panel {
    grid-template-columns: 1fr;
  }

  .btn-search {
    width: 100%;
    margin: 8px 0 0;
  }
}
</style>
