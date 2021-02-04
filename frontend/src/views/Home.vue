<template>
  <div class="home">
    <HeaderPart pageTitle="Le réseau social de Groupomania" /> 
    <PostsList v-if="userId" />
    <LoginBlock v-else />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPart from '@/components/HeaderPart.vue'
import LoginBlock from '@/components/LoginBlock.vue'
import PostsList from '@/components/PostsList.vue'
import store from '../store'

export default {
  name: 'Home',
  components: {
    HeaderPart, 
    LoginBlock,
    PostsList
  }, 
  data: function() {
    return {
      showLogin: true, 
      showSignup: false, 
      userId: store.state.userId
    }
  }, 
  created: function() {
    document.title = "Groupomania | Le réseau social des collaborateurs du groupe"; 
  }

}

</script>
,
    SignupBlock