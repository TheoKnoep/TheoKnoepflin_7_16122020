<template>
	<article class="single-post-content">
		<pre>Index = {{ index }}</pre>
		<h2>{{ post.title }}</h2>
		<p class="post-card__data">
			<img class="author-picture" v-bind:src="post.profile_picture" width="40" height="40" />
			Publié par <strong>{{ post.name}}</strong>, le {{ post.publication_local_date }} : 
		</p>
		<img v-bind:src="post.media" />
		<p>{{ post.content }}</p>
		<pre v-for="item in post.comments" :key="item.index">{{ item.content }}</pre>

	</article>
</template>

<script>
export default {
	name: 'SinglePost', 
	props: {
		post: {
			type: Object
		}, 
		index: {
			type: Number
		}
	}
}
</script>

<style lang="scss">
	.single-post-content {
		border: solid red 1px; 
	}
</style>