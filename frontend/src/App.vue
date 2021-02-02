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
    console.log(process.env.VUE_APP_API_URL); 
      const options = {
        "method": 'GET', 
        "headers": {
          "Authorization": "Bearer " + this.token
        }
      }
      axios
        .get(process.env.VUE_APP_API_URL + "/user/current", options)
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

  a {
    color: #d1515a; 
    text-decoration: none; 
    border-bottom: solid #d1515a 1px; 
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

  .btn {
    &:hover {
      box-shadow: 1px 1px 2px rgba(0,0,0,0.45); 
    }
  }

@media screen and (max-width: 860px) {
  .card-style {
    margin: 2em auto; 
    width: 90%; 
  }
}
</style>
