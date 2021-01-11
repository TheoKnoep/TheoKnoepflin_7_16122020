<template>
  <div class="account">
    <HeaderPart pageTitle="Créer un compte"/>
    <SignupBlock />
    
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import SignupBlock from '@/components/SignupBlock'

export default {
  name: "Account", 
  components: {
    HeaderPart, 
    SignupBlock
  }
}
</script>
