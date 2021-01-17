<template>
  <div class="account">
    <HeaderPart pageTitle="Informations du compte"/>
    <AccountInformation />
    
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import AccountInformation from '@/components/AccountInformation.vue'

export default {
  name: "Account", 
  components: {
    HeaderPart, 
    AccountInformation
  }
}
</script>
