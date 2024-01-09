<template>
  <div>
    <h1>Rezultat operacji</h1>
    <div v-if="resulttag=='false'" class="failed-operation">
      <h2>Operacja sie nie powiodła</h2>
    </div>
    <div v-else class="succes-operation">
      <h2>Operacja sie powiodła</h2>
    </div>
    <p>Kilkinij tutaj <router-link to="/">Strona główna</router-link></p>
  </div>
</template>

<script>
  export default {
    name:'ResultOf',
    props: {
      resulttag: Boolean,
  },
  }
</script>

<style lang="scss" scoped>
.failed-operation {
  border: 1px solid #ff7b7b;
  /* Red border */
  background-color: #ffcccc;
  /* Light red background */
  color: #b30000;
  /* Dark red text color */
  padding: 10px;
  /* Padding around the content */
  margin: 10px 0;
  /* Margin to create space around the message */
  border-radius: 5px;
  /* Rounded corners */
}
.succes-operation {
  border: 1px solid green;
  /* Red border */
  background-color: lightcyan;
  /* Light red background */
  color: darkblue;
  /* Dark red text color */
  padding: 10px;
  /* Padding around the content */
  margin: 10px 0;
  /* Margin to create space around the message */
  border-radius: 5px;
  /* Rounded corners */
}
</style>
