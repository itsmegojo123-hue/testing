import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

// Layouts
import ClientLayout from "./layout/wrapper/ClientLayout.vue";
import AdminLayout  from "./layout/wrapper/AdminLayout.vue";
import BlankLayout  from "./layout/wrapper/BlankLayout.vue";

const app = createApp(App);

app.use(router);

// Dang ky layout
app.component("client-layout", ClientLayout);
app.component("admin-layout",  AdminLayout);
app.component("blank-layout",  BlankLayout);

app.mount("#app");
