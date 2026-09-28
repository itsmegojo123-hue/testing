import { createRouter, createWebHistory } from "vue-router";

// ==========================================
// ROUTES CONFIGURATION - UniJob
// ==========================================

const routes = [

  // ===== AUTH (Trang trắng) =====
  {
    path: "/dang-nhap",
    name: "DangNhap",
    meta: { layout: "blank" },
    component: () => import("../views/Auth/DangNhap/index.vue"),
  },
  {
    path: "/dang-ky",
    name: "DangKy",
    meta: { layout: "blank" },
    component: () => import("../views/Auth/DangKy/index.vue"),
  },
  {
    path: "/quen-mat-khau",
    name: "QuenMatKhau",
    meta: { layout: "blank" },
    component: () => import("../views/Auth/QuenMatKhau/index.vue"),
  },

  // ===== SINH VIÊN & CỘNG ĐỒNG (Client) =====
  {
    path: "/",
    name: "TrangChu",
    meta: { layout: "client" },
    component: () => import("../views/Client/TrangChu/index.vue"),
  },
  {
    path: "/tim-viec",
    name: "TimViec",
    meta: { layout: "client" },
    component: () => import("../views/Client/TimViec/index.vue"),
  },
  {
    path: "/chi-tiet-viec/:id",
    name: "ChiTietViec",
    meta: { layout: "client" },
    component: () => import("../views/Client/ChiTietViec/index.vue"),
  },
  {
    path: "/cong-ty",
    name: "CongTy",
    meta: { layout: "client" },
    component: () => import("../views/Client/CongTy/index.vue"),
  },
  {
    path: "/ho-so-cv",
    name: "HoSoCV",
    meta: { layout: "client" },
    component: () => import("../views/Client/HoSoSinhVien/index.vue"),
  },
  {
    path: "/viec-lam-da-luu",
    name: "ViecLamDaLuu",
    meta: { layout: "client" },
    component: () => import("../views/Client/ViecLamDaLuu/index.vue"),
  },
  {
    path: "/tin-nhan",
    name: "TinNhan",
    meta: { layout: "client" },
    component: () => import("../views/Client/TinNhan/index.vue"),
  },
  {
    path: "/thong-bao",
    name: "ThongBao",
    meta: { layout: "client" },
    component: () => import("../views/Client/ThongBao/index.vue"),
  },
  {
    path: "/dien-dan",
    name: "DienDan",
    meta: { layout: "client" },
    component: () => import("../views/Client/DienDan/index.vue"),
  },
  {
    path: "/dien-dan/:id",
    name: "DienDanChiTiet",
    meta: { layout: "client" },
    component: () => import("../views/Client/DienDanChiTiet/index.vue"),
  },
  {
    path: "/danh-gia/:id",
    name: "DanhGia",
    meta: { layout: "client" },
    component: () => import("../views/Client/DanhGia/index.vue"),
  },

  // ===== NHÀ TUYỂN DỤNG (Employer) =====
  {
    path: "/nha-tuyen-dung",
    redirect: "/nha-tuyen-dung/tong-quan",
  },
  {
    path: "/nha-tuyen-dung/tong-quan",
    name: "EmployerTongQuan",
    meta: { layout: "client" },
    component: () => import("../views/Employer/TongQuan/index.vue"),
  },
  {
    path: "/nha-tuyen-dung/quan-ly-viec-lam",
    name: "EmployerQuanLyViecLam",
    meta: { layout: "client" },
    component: () => import("../views/Employer/QuanLyViecLam/index.vue"),
  },
  {
    path: "/nha-tuyen-dung/dang-tin",
    name: "EmployerDangTin",
    meta: { layout: "client" },
    component: () => import("../views/Employer/DangTin/index.vue"),
  },
  {
    path: "/nha-tuyen-dung/quan-ly-ung-vien",
    name: "EmployerQuanLyUngVien",
    meta: { layout: "client" },
    component: () => import("../views/Employer/QuanLyUngVien/index.vue"),
  },

  // ===== ADMIN =====
  {
    path: "/admin",
    redirect: "/admin/tong-quan",
  },
  {
    path: "/admin/tong-quan",
    name: "AdminTongQuan",
    meta: { layout: "admin" },
    component: () => import("../views/Admin/TongQuan/index.vue"),
  },
  {
    path: "/admin/quan-ly-nguoi-dung",
    name: "AdminQuanLyNguoiDung",
    meta: { layout: "admin" },
    component: () => import("../views/Admin/QuanLyNguoiDung/index.vue"),
  },
  {
    path: "/admin/quan-ly-viec-lam",
    name: "AdminQuanLyViecLam",
    meta: { layout: "admin" },
    component: () => import("../views/Admin/QuanLyViecLam/index.vue"),
  },
  {
    path: "/admin/quan-ly-dien-dan",
    name: "AdminQuanLyDienDan",
    meta: { layout: "admin" },
    component: () => import("../views/Admin/QuanLyDienDan/index.vue"),
  },

  // ===== 404 =====
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    meta: { layout: "blank" },
    component: () => import("../views/Auth/NotFound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0, behavior: "smooth" };
  },
});

export default router;
