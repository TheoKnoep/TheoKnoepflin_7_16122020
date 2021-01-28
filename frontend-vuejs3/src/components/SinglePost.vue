<template>
	<article class="single-post-content">
		<h2>{{ post.title }}</h2>
		<p class="post-card__data">
			<img class="author-picture" v-bind:src="post.profile_picture" width="40" height="40" />
			Publié par <strong>{{ post.name}}</strong>, le {{ post.publication_local_date }} : 
		</p>
		<img v-bind:src="post.media" />
		<p>{{ post.content }}</p>

		<div class="comments-wrapper" v-if="numberOfComments" :id="'comments-wrapper#' + post.id" >
			<hr />
			<h3>Commentaires</h3>
			<CommentsBlock 
				v-for="comment in post.comments" 
				:key="comment.index"
				:comment="comment" />
		</div>

		<button @click="togglCommentForm" >{{ buttonCommentWording }}</button> 
		<AddCommentBlock v-if="displayCommentForm"
			:userId="userId"
			:postId="post.id" 
			@hide-comment-form="togglCommentForm" 
			@increment-number-of-comments="incrementNumberOfComments"/>

	</article>
</template>

<script>
import CommentsBlock from '@/components/CommentsBlock.vue' 
import AddCommentBlock from '@/components/AddCommentBlock.vue'
import store from '../store'

export default {
	name: 'SinglePost', 
	components: {
		CommentsBlock, 
		AddCommentBlock
	},
	data() {
		return {
			userId: store.state.userId, 
			displayCommentForm: false, 
			buttonCommentWording: "Ajouter un commentaire", 
			numberOfComments: this.post.comments.length
		}
	},
	props: {
		post: {
			type: Object
		}, 
		index: {
			type: Number
		}
	}, 
	methods: {
		togglCommentForm() {
			if (this.displayCommentForm === false) {
				this.displayCommentForm = true, 
				this.buttonCommentWording = "Masquer"
			} else {
				this.displayCommentForm = false, 
				this.buttonCommentWording = "Ajouter un commentaire"
			}
		}, 
		incrementNumberOfComments() {
			this.numberOfComments ++ ; 
		}
	}
}
</script>

<style lang="scss">
	.single-post-content {
		background-color: #eee; 
		margin: 2em; padding: 2em; 
		border-radius: 12px; 
		box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
		&__data {
			font-style: italic;
			font-size: 16px;
			padding: 1em 0; 
		}
		img {
			max-width: 800px; 
		}
	} 
</style>