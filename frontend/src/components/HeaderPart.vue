<template>
  <header>
    <div class="img-container">
      <img src="../assets/logo.png" />
    </div>
    <h1>{{ pageTitle }}</h1>
    <div id="nav">
		<router-link to="/">Accueil</router-link> | 
		<router-link to="/account">Compte</router-link> | 
    <router-link to="/posts">Publications</router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderPart",
  props: {
    pageTitle: String,
  },
};
</script>

<style scoped lang="scss">

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
}
img {
  width: 200px;
  height: auto;
}
h1 {
  font-style: italic;
  font-size: 1.4em;
}
</style>