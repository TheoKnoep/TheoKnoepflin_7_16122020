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
            }) 
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
    font-family: 'Trebuchet', Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  hr {
    border: solid 1px rgba(0,0,0,0.25); 
    margin: 1em; 
    border: 0; 
    &:after {
      display: block; 
      content: ''; 
      width: 100%; 
      height: 1px; 
      background-color: rgba(0,0,0,0.25); 
    }
  }

  #nav {
    padding: 30px;

    a {
      font-weight: bold;
      color: #2c3e50;
      border-bottom: solid #2c3e50 1px;

      &.router-link-exact-active {
        color: teal;
        border-bottom: solid teal 1px;
      }
    }
  }

  a {
    color: teal; 
    text-decoration: none; 
    border-bottom: solid teal 1px; 
  }

  .card-style {
    border-radius: 4px; 
    box-shadow: 4px 4px 16px rgba(0,0,0,0.15); 
    width: 95%;
		max-width: 599px;
		height: auto;
    margin: 2em auto;
    padding: 1em; 
  }
</style>
