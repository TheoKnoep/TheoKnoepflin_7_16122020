<template>
	<div class="single-post-content">
		<h2>{{ item.title }}</h2>
		<p class="post-card__data">
			<img class="author-picture" v-bind:src="item.profile_picture" width="40" height="40" />
			Publié par <strong>{{ item.name}}</strong>, le {{ item.publication_local_date }} : 
		</p>
		<img v-bind:src="item.media" />
		<p>{{ item.content }}</p>
	</div>
</template>

<script>
export default {
	name: 'SinglePost', 
	data () {
		return {
			msg: ''
		}
	}
}
</script>