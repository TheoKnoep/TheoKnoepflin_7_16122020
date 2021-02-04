<template>
  <div class="home">
    <HeaderPart pageTitle="Le réseau social de Groupomania" /> 
    <LoginBlock v-show="showLogin" />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPart from '@/components/HeaderPart.vue'
import LoginBlock from '@/components/LoginBlock.vue'

export default {
  name: 'Home',
  components: {
    HeaderPart, 
    LoginBlock,
  }, 
  data: function() {
    return {
      showLogin: true, 
      showSignup: false
    }
  }, 
  created: function() {
    document.title = "Groupomania | Le réseau social des collaborateurs du groupe"; 
  }

}

</script>
,
    SignupBlock