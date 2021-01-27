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

		<div class="comments-wrapper" v-if="post.comments.length" >
			<hr />
			<h3>Commentaires</h3>
			<CommentsBlock 
				v-for="comment in post.comments" 
				:key="comment.index"
				:comment="comment" />
		</div>

	</article>
</template>

<script>
import CommentsBlock from '@/components/CommentsBlock.vue' 

export default {
	name: 'SinglePost', 
	components: {
		CommentsBlock
	},
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