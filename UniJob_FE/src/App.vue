<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const layout = computed(() => (route.meta.layout || "client") + "-layout");
</script>

<template>
  <component :is="layout" />
</template>
