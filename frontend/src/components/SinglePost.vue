<template>
	<article class="single-post-content card-style">
		<h2>{{ post.title }}</h2>
		<p class="post-card__data">
			<img class="author-picture" v-bind:src="post.profile_picture" width="40" height="40" />
			Publié par <strong><router-link :to="'/user/' + post.author_id" >{{ post.name}}</router-link></strong>, le {{ post.publication_local_date }} : 
		</p>
		<img v-bind:src="post.media" class="post-image" />
		<p class="text-content">{{ post.content }}</p>

		<div class="comments-wrapper" v-if="numberOfComments" :id="'comments-wrapper#' + post.id" >
			<hr />
			<h3 class="comment-heading">Commentaires : </h3>
			<CommentsBlock 
				v-for="comment in post.comments" 
				:key="comment.index"
				:comment="comment" />
		</div>

		<button @click="togglCommentForm" class="btn add-comment-btn">{{ buttonCommentWording }}</button> 
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
		margin: 2em; padding: 2em; 
		border-radius: 12px; 
		&__data {
			font-style: italic;
			font-size: 16px;
			padding: 1em 0; 
		}
		.post-image {
			width: 100%; 
			max-width: 800px; 
			border-radius: 32px; 
			box-shadow: 0 2px 2px rgba(0,0,0,0.25); 
		}
		.text-content {
			border-radius: 32px;
			background-color: rgba(0, 0, 0, 0.05);
			padding: 90px 1em 1em 1em;
			position: relative;
			top: -70px;
			z-index: -1;
			margin-bottom: -32px; 
		}
		.comments-wrapper {
			.comment-heading {
				margin-bottom: 1em; 
			}
		}
	} 
	.add-comment-btn {
		border-radius: 50px;
		padding: 1em 2em;
		border: solid 1px rgba(0,0,0,0.1);
		color: gray; 
		background-color: white;
		cursor: pointer;
		font-style: italic;
		margin-top: 32px; 
	}
</style>