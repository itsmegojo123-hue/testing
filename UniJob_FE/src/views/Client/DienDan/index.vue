<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// ================================
// CẤU HÌNH API
// ================================
const API_BASE_URL = "http://127.0.0.1:8000";

// ================================
// STATE
// ================================
const posts = ref([]);
const searchKey = ref("");
const loading = ref(false);
const errorMessage = ref("");

// ================================
// LẤY DANH SÁCH BÀI VIẾT
// ================================
const getPosts = async () => {
  try {
    loading.value = true;
    errorMessage.value = "";

    const response = await axios.get(
      `${API_BASE_URL}/api/dien-dan/danh-sach`,
      {
        params: {
          key: searchKey.value.trim(),
        },
      }
    );

    if (response.data.status) {
      posts.value = response.data.data;
    } else {
      posts.value = [];
      errorMessage.value = "Không thể lấy danh sách bài viết.";
    }
  } catch (error) {
    console.error("Lỗi lấy danh sách diễn đàn:", error);

    posts.value = [];
    errorMessage.value =
      "Không thể kết nối đến máy chủ. Vui lòng thử lại.";
  } finally {
    loading.value = false;
  }
};

// ================================
// TÌM KIẾM
// ================================
const handleSearch = () => {
  getPosts();
};

// ================================
// XÓA TÌM KIẾM
// ================================
const clearSearch = () => {
  searchKey.value = "";
  getPosts();
};

// ================================
// ĐỔI ROLE THÀNH TIẾNG VIỆT
// ================================
const getRoleName = (role) => {
  switch (role) {
    case "student":
      return "Sinh viên";

    case "employer":
      return "Nhà tuyển dụng";

    case "admin":
      return "Quản trị viên";

    default:
      return "Thành viên";
  }
};

// ================================
// FORMAT NGÀY
// ================================
const formatDate = (date) => {
  if (!date) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

// ================================
// XỬ LÝ URL ẢNH
// ================================
const getImageUrl = (path) => {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE_URL}/${path.replace(/^\/+/, "")}`;
};

// Nếu ảnh bị lỗi thì ẩn ảnh
const handleImageError = (event) => {
  event.target.style.display = "none";
};

// ================================
// KHI VÀO TRANG
// ================================
onMounted(() => {
  getPosts();
});
</script>

<template>
  <div class="forum-page">
    <div class="forum-container">

      <!-- =========================
           PHẦN ĐẦU TRANG
      ========================== -->
      <section class="forum-header">
        <div>
          <p class="forum-label">CỘNG ĐỒNG UNIJOB</p>

          <h1>Diễn đàn việc làm</h1>

          <p class="forum-description">
            Nơi sinh viên và nhà tuyển dụng chia sẻ kinh nghiệm
            về việc làm, CV, phỏng vấn và phát triển nghề nghiệp.
          </p>
        </div>

        <button class="create-post-button" type="button">
          + Đăng bài
        </button>
      </section>

      <!-- =========================
           SEARCH
      ========================== -->
      <section class="search-section">
        <form class="search-box" @submit.prevent="handleSearch">

          <span class="search-icon">⌕</span>

          <input
            v-model="searchKey"
            type="text"
            placeholder="Tìm kiếm bài viết..."
          />

          <button
            v-if="searchKey"
            class="clear-button"
            type="button"
            @click="clearSearch"
          >
            ×
          </button>

          <button class="search-button" type="submit">
            Tìm kiếm
          </button>

        </form>
      </section>

      <!-- =========================
           MAIN
      ========================== -->
      <div class="forum-layout">

        <!-- DANH SÁCH BÀI -->
        <main class="forum-main">

          <div class="section-heading">
            <div>
              <h2>Bài viết mới nhất</h2>

              <p>
                {{ posts.length }} bài viết
              </p>
            </div>
          </div>

          <!-- LOADING -->
          <div v-if="loading" class="state-box">
            <div class="spinner"></div>

            <p>Đang tải bài viết...</p>
          </div>

          <!-- ERROR -->
          <div
            v-else-if="errorMessage"
            class="state-box error-state"
          >
            <h3>Không thể tải diễn đàn</h3>

            <p>{{ errorMessage }}</p>

            <button type="button" @click="getPosts">
              Thử lại
            </button>
          </div>

          <!-- KHÔNG CÓ DỮ LIỆU -->
          <div
            v-else-if="posts.length === 0"
            class="state-box"
          >
            <h3>Không tìm thấy bài viết</h3>

            <p v-if="searchKey">
              Không có kết quả phù hợp với
              “{{ searchKey }}”.
            </p>

            <p v-else>
              Hiện tại chưa có bài viết nào trên diễn đàn.
            </p>
          </div>

          <!-- POSTS -->
          <div v-else class="post-list">

            <article
              v-for="post in posts"
              :key="post.id"
              class="post-card"
            >

              <!-- AUTHOR -->
              <div class="post-author">

                <div class="avatar">
                  <span>
                    {{
                      post.author_name
                        ? post.author_name.charAt(0).toUpperCase()
                        : "U"
                    }}
                  </span>

                  <img
                    v-if="post.author_avatar"
                    :src="getImageUrl(post.author_avatar)"
                    :alt="post.author_name"
                    @error="handleImageError"
                  />
                </div>

                <div class="author-info">
                  <strong>
                    {{ post.author_name }}
                  </strong>

                  <div class="author-meta">
                    <span>
                      {{ getRoleName(post.author_role) }}
                    </span>

                    <span class="dot">•</span>

                    <span>
                      {{ formatDate(post.created_at) }}
                    </span>
                  </div>
                </div>

              </div>

              <!-- CONTENT -->
              <div class="post-content">

                <router-link
                  class="post-title"
                  :to="{
                    name: 'DienDanChiTiet',
                    params: {
                      id: post.id,
                    },
                  }"
                >
                  {{ post.title }}
                </router-link>

                <p class="post-preview">
                  {{ post.content }}
                </p>

                <div
                  v-if="post.image_url"
                  class="post-image"
                >
                  <img
                    :src="getImageUrl(post.image_url)"
                    :alt="post.title"
                    @error="handleImageError"
                  />
                </div>

              </div>

              <!-- FOOTER CARD -->
              <div class="post-footer">

                <span class="comment-count">
                  💬 {{ post.comments_count }} bình luận
                </span>

                <router-link
                  class="read-more"
                  :to="{
                    name: 'DienDanChiTiet',
                    params: {
                      id: post.id,
                    },
                  }"
                >
                  Đọc tiếp
                  <span>→</span>
                </router-link>

              </div>

            </article>

          </div>
        </main>

        <!-- =========================
             SIDEBAR
        ========================== -->
        <aside class="forum-sidebar">

          <div class="sidebar-card">
            <h3>Về cộng đồng UniJob</h3>

            <p>
              Không gian trao đổi dành cho sinh viên và
              nhà tuyển dụng trong quá trình tìm kiếm
              cơ hội nghề nghiệp.
            </p>
          </div>

          <div class="sidebar-card">
            <h3>Quy tắc cộng đồng</h3>

            <ul>
              <li>Trao đổi lịch sự và tôn trọng.</li>
              <li>Không đăng nội dung spam.</li>
              <li>Không chia sẻ thông tin sai lệch.</li>
              <li>Ưu tiên nội dung liên quan nghề nghiệp.</li>
            </ul>
          </div>

          <div class="sidebar-card tip-card">
            <span class="tip-icon">💡</span>

            <div>
              <h3>Mẹo nhỏ</h3>

              <p>
                Một tiêu đề rõ ràng sẽ giúp bài viết của
                bạn nhận được nhiều phản hồi hơn.
              </p>
            </div>
          </div>

        </aside>

      </div>
    </div>
  </div>
</template>

<style scoped>
.forum-page {
  min-height: 100vh;
  background: var(--bg-main, #fbf9f4);
  padding: 38px 0 70px;
}

.forum-container {
  width: min(1180px, calc(100% - 48px));
  margin: 0 auto;
}

/* ==========================
   HEADER
========================== */

.forum-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  margin-bottom: 28px;
}

.forum-label {
  margin: 0 0 7px;
  color: var(--primary, #c05a4e);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.4px;
}

.forum-header h1 {
  margin: 0;
  color: var(--text-main, #2b2622);
  font-size: 34px;
  line-height: 1.2;
}

.forum-description {
  max-width: 680px;
  margin: 11px 0 0;
  color: var(--text-muted, #6e6965);
  font-size: 15px;
  line-height: 1.7;
}

.create-post-button {
  flex-shrink: 0;
  border: none;
  border-radius: 12px;
  padding: 13px 20px;
  background: var(--primary, #c05a4e);
  color: white;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.create-post-button:hover {
  transform: translateY(-1px);
  background: var(--primary-hover, #a8493d);
}

/* ==========================
   SEARCH
========================== */

.search-section {
  margin-bottom: 27px;
}

.search-box {
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 6px 7px 6px 18px;

  background: white;
  border: 1px solid var(--border-light, #e7dfd8);
  border-radius: 15px;
}

.search-icon {
  margin-right: 12px;
  color: #8c8580;
  font-size: 25px;
}

.search-box input {
  flex: 1;
  min-width: 0;

  border: none;
  outline: none;

  color: var(--text-main, #2b2622);
  background: transparent;

  font-size: 15px;
}

.search-box input::placeholder {
  color: #aaa29d;
}

.clear-button {
  border: none;
  background: transparent;
  color: #8a817b;
  font-size: 22px;
  cursor: pointer;
}

.search-button {
  margin-left: 8px;
  border: none;
  border-radius: 10px;
  padding: 11px 18px;

  background: #f1e4df;
  color: var(--primary, #c05a4e);

  font-size: 14px;
  font-weight: 700;

  cursor: pointer;
}

.search-button:hover {
  background: #ead5ce;
}

/* ==========================
   LAYOUT
========================== */

.forum-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 310px;
  gap: 26px;
  align-items: start;
}

.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.section-heading h2 {
  margin: 0;
  color: var(--text-main, #2b2622);
  font-size: 20px;
}

.section-heading p {
  margin: 5px 0 0;
  color: var(--text-muted, #6e6965);
  font-size: 13px;
}

/* ==========================
   POSTS
========================== */

.post-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card {
  padding: 22px;

  background: var(--bg-card, white);
  border: 1px solid var(--border-light, #e7dfd8);
  border-radius: 18px;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(48, 39, 34, 0.06);
}

/* AUTHOR */

.post-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 44px;
  height: 44px;

  overflow: hidden;
  border-radius: 50%;

  background: #efe2dc;
  color: var(--primary, #c05a4e);

  font-size: 17px;
  font-weight: 800;
}

.avatar img {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  object-fit: cover;
}

.author-info strong {
  display: block;
  color: var(--text-main, #2b2622);
  font-size: 14px;
}

.author-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  margin-top: 4px;

  color: var(--text-muted, #6e6965);
  font-size: 12px;
}

.dot {
  color: #bbb2ad;
}

/* CONTENT */

.post-content {
  margin-top: 18px;
}

.post-title {
  display: block;

  color: var(--text-main, #2b2622);
  text-decoration: none;

  font-size: 19px;
  font-weight: 750;
  line-height: 1.45;
}

.post-title:hover {
  color: var(--primary, #c05a4e);
}

.post-preview {
  display: -webkit-box;
  overflow: hidden;

  margin: 10px 0 0;

  color: var(--text-muted, #6e6965);

  font-size: 14px;
  line-height: 1.75;

  line-clamp: 3;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.post-image {
  max-height: 350px;
  margin-top: 17px;
  overflow: hidden;
  border-radius: 12px;
}

.post-image img {
  display: block;
  width: 100%;
  max-height: 350px;
  object-fit: cover;
}

/* POST FOOTER */

.post-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-top: 19px;
  padding-top: 16px;

  border-top: 1px solid #f0ebe7;
}

.comment-count {
  color: var(--text-muted, #6e6965);
  font-size: 13px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;

  color: var(--primary, #c05a4e);
  text-decoration: none;

  font-size: 13px;
  font-weight: 750;
}

.read-more:hover {
  text-decoration: underline;
}

/* ==========================
   SIDEBAR
========================== */

.forum-sidebar {
  position: sticky;
  top: 92px;

  display: flex;
  flex-direction: column;
  gap: 15px;
}

.sidebar-card {
  padding: 20px;

  background: white;
  border: 1px solid var(--border-light, #e7dfd8);
  border-radius: 16px;
}

.sidebar-card h3 {
  margin: 0 0 10px;

  color: var(--text-main, #2b2622);

  font-size: 15px;
}

.sidebar-card p,
.sidebar-card li {
  color: var(--text-muted, #6e6965);
  font-size: 13px;
  line-height: 1.65;
}

.sidebar-card p {
  margin: 0;
}

.sidebar-card ul {
  margin: 0;
  padding-left: 18px;
}

.sidebar-card li + li {
  margin-top: 7px;
}

.tip-card {
  display: flex;
  gap: 12px;

  background: #fffaf6;
}

.tip-icon {
  font-size: 22px;
}

/* ==========================
   STATES
========================== */

.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 55px 25px;

  text-align: center;

  background: white;
  border: 1px solid var(--border-light, #e7dfd8);
  border-radius: 18px;
}

.state-box h3 {
  margin: 0 0 8px;
  color: var(--text-main, #2b2622);
}

.state-box p {
  margin: 0;

  color: var(--text-muted, #6e6965);

  font-size: 14px;
}

.state-box button {
  margin-top: 15px;
  border: none;
  border-radius: 9px;
  padding: 10px 16px;

  background: var(--primary, #c05a4e);
  color: white;

  cursor: pointer;
}

.spinner {
  width: 29px;
  height: 29px;

  margin-bottom: 15px;

  border: 3px solid #eee5e0;
  border-top-color: var(--primary, #c05a4e);
  border-radius: 50%;

  animation: spin 0.75s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ==========================
   RESPONSIVE
========================== */

@media (max-width: 900px) {
  .forum-layout {
    grid-template-columns: 1fr;
  }

  .forum-sidebar {
    position: static;
  }
}

@media (max-width: 640px) {
  .forum-page {
    padding-top: 24px;
  }

  .forum-container {
    width: min(100% - 28px, 1180px);
  }

  .forum-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .forum-header h1 {
    font-size: 27px;
  }

  .create-post-button {
    width: 100%;
  }

  .search-box {
    flex-wrap: wrap;
  }

  .search-icon {
    display: none;
  }

  .search-box input {
    min-height: 42px;
  }

  .search-button {
    width: 100%;
    margin: 5px 0 0;
  }

  .post-card {
    padding: 18px;
  }

  .post-footer {
    align-items: flex-start;
    gap: 10px;
    flex-direction: column;
  }
}
  </style>