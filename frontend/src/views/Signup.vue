<template>
  <div class="account">
    <HeaderPart pageTitle="Créer un compte"/>
    <SignupBlock />
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import SignupBlock from '@/components/SignupBlock.vue'

export default {
  name: "Signup", 
  components: {
    HeaderPart, 
    SignupBlock
  }, 
  created: function() {
    document.title = "Créer un compte"; 
  }
}
</script>
