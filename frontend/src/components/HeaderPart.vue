<template>
  <header>
    <div class="img-container">
      <img src="../assets/logo.png" />
    </div>
    <h1>{{ pageTitle }}</h1>
    <nav id="nav" class="nav">
      <router-link to="/" class="nav__item" >Accueil</router-link><span class="nav__item--sep"> | </span>
      <router-link to="/account" class="nav__item" >Compte</router-link><span class="nav__item--sep"> | </span>
      <router-link to="/posts" class="nav__item" >Publications</router-link>
    </nav>
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


@media screen and (max-width: 860px) {
  .nav { 
    display: flex;
    flex-direction: column;  
    &__item--sep {
      display: none;
    }
  }
}
</style>