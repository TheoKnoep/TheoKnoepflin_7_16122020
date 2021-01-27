<template>
	<div>
		<div class="comments-section" >
			<img v-bind:src="comment.profile_picture" width="25" height="25" />
			<p>{{ comment.comment_date }}</p>
			<p><strong>{{ comment.name }}</strong></p>
			<p class="single-comment__content">{{ comment.content }}</p>
	</div> 

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
	.comments-section {
		margin-left: 4em; 
		padding: 1em; 
	}
</style>