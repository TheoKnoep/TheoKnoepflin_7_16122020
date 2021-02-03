<template>
  <div class="account">
	<HeaderPart pageTitle="Informations du compte"/>
	<AccountInformation :id="$route.params.id"/>
    
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import AccountInformation from '@/components/AccountInformation.vue'

export default {
    name: "UserInfos", 
    components: {
    HeaderPart, 
    AccountInformation
  }
}
</script>
