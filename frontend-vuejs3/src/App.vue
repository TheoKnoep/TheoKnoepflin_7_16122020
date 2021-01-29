<template>
  <router-view />
</template>

<script>
document.title = "Groupomania";

import axios from "axios";
import store from "./store";

export default {
  data() {
    return {
      userId: store.state.userId,
      isAdmin: store.state.isAdmin,
      token: localStorage.getItem("token"),
    };
  },
  mounted() {
      const options = {
        "method": 'GET', 
        "headers": {
          "Authorization": "Bearer " + this.token
        }
      }
      axios
        .get("http://localhost:3000/user/current", options)
          .then((response) => {
            this.$store.dispatch("get_user_id", response.data.id);
            this.$store.dispatch("get_user_role", response.data.is_admin);
            /* response.data.json()
            })
            .then((response) => {
              console.log('3'); 
              this.$store.dispatch("get_user_id", response.userId);
              this.$store.dispatch("get_user_role", response.isAdmin);
            */ }) 
          .catch((error) => console.log(error));
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
