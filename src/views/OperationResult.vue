<template>
  <div>
    <ResultOf :resulttag="display" />
  </div>
</template>

<script>
import ResultOf from '@/components/ResultOf.vue';
export default {
  name: 'OperationResult',
  components: {
    ResultOf,
  },
  props: ['result'],
  data() {
    return {
      display: false,
    }
  },
  methods: {
    getDisplay() {
      return this.display;
    },
  },
  created() {
    this.display = this.result;
  },
}
</script>

<style lang="scss" scoped></style>
