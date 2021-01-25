<template>
  <div class="account">
    <HeaderPart pageTitle="Modifiez les informations de votre compte" />
    <AccountEdit />
    
  </div>
</template>

<script>
import HeaderPart from "@/components/HeaderPart.vue";
import AccountEdit from '@/components/AccountEdit.vue'; 

export default {
  name: "Editaccount",
  components: {
    HeaderPart,
    AccountEdit
  }
};
</script>
