<template>
  <div class="account">
    <HeaderPart pageTitle="Les dernières publications"/>
    <PostsList />
  </div>
</template>

<script>
import HeaderPart from '@/components/HeaderPart.vue'
import PostsList from '@/components/PostsList.vue'

export default {
  name: "Posts", 
  components: {
    HeaderPart, 
    PostsList
  }
}
</script>
