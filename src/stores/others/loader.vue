<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="body w-full h-screen grid place-items-center">
    <div class="loader"></div>
  </div>
</template>
<script setup>

</script>
<style lang="css">
.body {
  background-color: #1b2832;
}
.loader {
  width: 65px;
  aspect-ratio: 1;
  position: relative;
}
.loader:before,
.loader:after {
  content: '';
  position: absolute;
  border-radius: 50px;
  box-shadow: 0 0 0 3px inset #fff;
  animation: l5 2.5s infinite;
}
.loader:after {
  animation-delay: -1.25s;
  border-radius: 0;
}
@keyframes l5 {
  0% {
    inset: 0 35px 35px 0;
  }
  12.5% {
    inset: 0 35px 0 0;
  }
  25% {
    inset: 35px 35px 0 0;
  }
  37.5% {
    inset: 35px 0 0 0;
  }
  50% {
    inset: 35px 0 0 35px;
  }
  62.5% {
    inset: 0 0 0 35px;
  }
  75% {
    inset: 0 0 35px 35px;
  }
  87.5% {
    inset: 0 0 35px 0;
  }
  100% {
    inset: 0 35px 35px 0;
  }
}
</style>
