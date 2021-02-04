<template>
  <div class="account">
    <HeaderPart pageTitle="Créer une nouvelle publication"/>
	<CreatePostBlock />
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import CreatePostBlock from '@/components/CreatePostBlock'

export default {
  name: "Posts", 
  components: {
	HeaderPart, 
	CreatePostBlock
  }, 
  created: function() {
    document.title = "Créer une publication"; 
  }
}
</script>

    CreatePostBlock