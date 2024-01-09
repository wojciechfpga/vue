<template>
  <div class="rounded-border-gradient" v-show="reversedMessage.body!='no new messages' ">
    <p>{{ reversedMessage.body }}</p>
    <p>{{ reversedMessage.id }}</p>
    <p>{{ reversedMessage.deactivateStatus }}</p>
  </div>
</template>

<script>
import Loader from '@/components/Loader.vue';
export default {
  name: 'UsersMessages',
  components: {
    Loader,
  },
  props: {
    messagetoadmin: Object,
  },
  computed: {

    reversedMessage() {
      return this.messagetoadmin;
    },

  },
};
</script>

<style lang="scss" scoped>

</style>

<style scoped>
.rounded-border-gradient {
    --b: .5em;
    /* border width */
    --c: 3em;
    /* corner size */
    --r: 2em;
    /* corner rounding */
    position: relative;
    align-items: left;
    margin: 1em auto;
    border: solid var(--b) transparent;
    padding: 1em;
    max-width: 23em;
    font: 1.25em ubuntu, sans-serif;
    &::before

{
    position: absolute;
    z-index: -1;
    inset: calc(-1*var(--b));
    border: inherit;
    border-radius: var(--r);
    background: linear-gradient(orange, deeppink, purple) border-box;
    --corner: conic-gradient(from -90deg at var(--c) var(--c), red 25%, #0000 0) 0 0/
    calc(100% - var(--c)) calc(100% - var(--c)) border-box;
    --inner: conic-gradient(red 0 0) padding-box;
    -webkit-mask: var(--corner), var(--inner);
    -webkit-mask-composite: source-out;
    mask: var(--corner) subtract, var(--inner);
    content: ''
}

}
</style>
