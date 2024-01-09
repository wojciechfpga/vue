<template>
  <div class="fill">
    <div class="loader"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    background: Boolean,
    small: Boolean,
  },
};
</script>

<style  scoped>
.fill{
  padding-top: 500px;
  padding-bottom: 500px;
}
.loader {
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 108px;
  height: 60px;
  color: #269af2;
  --c: radial-gradient(farthest-side, currentColor 96%, #0000);
  background:
    var(--c) 100% 100% /30% 60%,
    var(--c) 70% 0 /50% 100%,
    var(--c) 0 100% /36% 68%,
    var(--c) 27% 18% /26% 40%,
    linear-gradient(currentColor 0 0) bottom/67% 58%;
  background-repeat: no-repeat;
  position: relative;
}

.loader:after {
  content: "";
  position: absolute;
  inset: 0;
  background: inherit;
  opacity: 0.4;
  animation: l7 1s infinite;
}

@keyframes l7 {
  to {
    transform: scale(1.8);
    opacity: 0
  }
}</style>
