<template>
		<div class="single-comment" >
			<pre>{{ comment }}</pre>
			<img v-bind:src="comment.profile_picture" width="25" height="25" />
			<p>{{ comment.comment_date }}</p>
			<p><strong><router-link :to="'/user/' + comment.comment_author_id" >{{ comment.name }}</router-link></strong></p>
			<p class="single-comment__content">{{ comment.content }}</p>
	</div> 
</template>

<script>
export default {
	name: 'CommentsBlock', 
	props: {
		comment: {
			type: Object
		}
	}
}
</script>

<style lang="scss">
	.single-comment {
		margin-left: 4em; 
		padding: 1em; 
	}
</style>