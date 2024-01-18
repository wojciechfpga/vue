<template>
  <div class="privacyclass">
    <div class="article-box">
      <div class="article-header">Back-end tej strony</div>
      <div class="gradient-line"></div>
      <p>Kod źródłowy tej strony (back-end)</p>
    <div class="link">
      <a href="https://dev.azure.com/Wojciechlasowskipocztapl/AzureDotNET/_git/WebAPIForAzureCloud">Link do back-end-u tej
        strony (C#/ASP >NET)</a>

      <p>Kod Front-end-u w trakcie refakctoryzacji, wkrótce zostanie opublikowany, napisany w Vue.js</p>
    </div>
    <div class="column">
      <div class="styled-box">

        <embed src="https://storagekontowojtek.blob.core.windows.net/article-images/LasowskiApplication_sa.pdf"
          type="application/pdf" width="100%">
      </div>
    </div>
    </div>

    <h2></h2>


  </div>

</template>

<script>
export default {
  name: 'Projects',
};
</script>

<style lang="scss" scoped>
    /* Style for the container box */
    .article-box {
      max-width: 800px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    /* Style for the header */
    .article-header {
      font-size: 1.5em;
      font-weight: bold;
      margin-bottom: 10px;
    }

    /* Style for the gradient line */
    .gradient-line {
      width: 80%;
      height: 2px;
      background: linear-gradient(to right, #ff8c00, #ff0080); /* Adjust colors as needed */
      margin: 10px auto;
    }
.privacyclass {
  text-align: justify;
  width: 50%;
  line-height: 200%;
  width: 80% !important;
}

.styled-box {
  width: 800px;
  height: 500px;
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
