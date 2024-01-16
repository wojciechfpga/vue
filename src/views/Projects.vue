<template>
  <div>
    <h1>Zrealizowane projekty</h1>
    <h2>Back-end tej strony</h2>
    <p>Kod źródłowy tej strony (back-end)</p>
    <div class="link">
      <a href="https://dev.azure.com/Wojciechlasowskipocztapl/AzureDotNET/_git/WebAPIForAzureCloud">Back-end tej
        strony</a>

    <p>Kod Front-end-u w trakcie refakctoryzacji, wkrótce zostanie opublikowany, napisany w Vue.js</p>
  </div>
  <div class="column">
    <div class="styled-box">

      <embed src="https://storagekontowojtek.blob.core.windows.net/article-images/LasowskiApplication_sa.pdf"
        type="application/pdf" width="100%">
    </div>
  </div>
</div></template>

<script>
export default {
  name: 'Projects',
};
</script>

<style lang="scss" scoped>
.styled-box {
  width: 800px;
  height: 1000px;
  background-color: #ffffff;
  border: 2px solid #3498db;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  margin-bottom: 16px;
  position: relative;
  display: flex;

  &:hover {
    cursor: grab;
  }
}

.styled-box p {
  font-size: 30px;
  margin: 0;
}

.column {
  display: flex;
  justify-content: center;
}
</style>
