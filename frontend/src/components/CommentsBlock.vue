<template>
		<div class="single-comment" >
			<div class="identity-block">
				<img v-bind:src="comment.profile_picture" width="25" height="25" />
				<p><strong><router-link :to="'/user/' + comment.comment_author_id" >{{ comment.name }}</router-link></strong></p>
			</div>
			<p class="comment-date">{{ cleanCommentDate }}</p>
			<p class="single-comment__content">{{ comment.content }}</p>
	</div> 
</template>

<script>
export default {
	name: 'CommentsBlock', 
	data() {
		return {
			cleanCommentDate: new Date(this.comment.comment_date).toLocaleString()
		}
	},
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
		margin-bottom: 24px; 
		padding-left: 12px; 
		border-left: solid 2px rgba(0,0,0,0.1); 
		.identity-block {
			display: flex; 
			align-items: flex-end;
			p {
				margin-left: 8px; 
			}
		}
		.comment-date {
			font-style: italic; 
			font-size: 0.9em; 
			margin-top: 4px; 
			margin-bottom: 8px; 
		}
	}
</style>