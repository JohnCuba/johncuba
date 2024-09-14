<script setup lang="ts">
useHead({
  script: [
    (import.meta.dev ? {} : {
      src: 'https://umami.johncuba.space/script.js',
      defer: true,
      'data-website-id': '463d4ef6-616d-49b1-9ebe-c98f488b5ec4',
    })
  ]
})
</script>

<template>
  <NuxtPage />
</template>

<style lang="css">
html {
  /* Disable mobile pull-to-refresh */
  overscroll-behavior: none;
}

body {
  margin: 0;
}
</style>