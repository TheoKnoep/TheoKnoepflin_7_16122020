<template>
  <div class="account">
    <HeaderPart pageTitle="Informations du compte"/>
    <AccountInformation :id="id"/>
    
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import AccountInformation from '@/components/AccountInformation.vue'
import store from '../store'

export default {
  name: "Account", 
  data () {
    return {
      id: store.state.userId
    }
  }, 
  components: {
    HeaderPart, 
    AccountInformation
  }, 
  created: function() {
    document.title = "Mon compte"; 
  }
}
</script>
