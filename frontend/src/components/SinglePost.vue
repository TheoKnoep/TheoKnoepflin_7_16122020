<template>
	<article class="single-post-content card-style">
		<div class="heading-post">
			<h2>{{ post.title }}</h2>
			<div class="delete-post-btn" v-if="has_rights_to_delete_post">
				<button @click="deletePost(post.id)" class="btn "><i class="far fa-trash-alt"></i>&nbsp;Supprimer</button>
			</div>
		</div>
		<div class="post-card__data">
			<img class="author-picture" v-bind:src="post.profile_picture" width="40" height="40" />
			<p>Publié par <strong><router-link :to="'/user/' + post.author_id" >{{ post.name}}</router-link></strong>, le {{ post.publication_local_date }}&nbsp;:</p> 
		</div>
		<img v-bind:src="post.media" class="post-image" />
		<p class="text-content">{{ post.content }}</p>

		<div class="comments-wrapper" v-if="numberOfComments" :id="'comments-wrapper#' + post.id" >
			<hr />
			<h3 class="comment-heading">Commentaires : </h3>
			<CommentsBlock 
				v-for="comment in post.comments" 
				:key="comment.index"
				:postId="post.id"
				:comment="comment"
				:updateCommentsList="updateCommentsList" 
				@decreament-number-of-comments="decreamentNumberOfComments" />
		</div>

		<button @click="togglCommentForm" class="btn add-comment-btn">{{ buttonCommentWording }}</button> 
		<AddCommentBlock v-if="displayCommentForm"
			:userId="userId"
			:postId="post.id" 
			:publishComment="publishComment"
			@hide-comment-form="togglCommentForm" 
			@increment-number-of-comments="incrementNumberOfComments" />

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
			isAdmin: store.state.isAdmin,
			displayCommentForm: false, 
			buttonCommentWording: "Ajouter un commentaire", 
			has_rights_to_delete_post: false,  
			numberOfComments: this.post.comments.length
		}
	},
	props: {
		post: {
			type: Object
		}, 
		index: {
			type: Number
		},
		publishComment: {
			type: Function
		}, 
		updatePostList: {
			type: Function
		}, 
		updateCommentsList: {
			type: Function
		}
	}, 
	mounted() {
		this.checkIfHasRightsToDelete()
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
		}, 
		decreamentNumberOfComments() {
			this.numberOfComments -- ;
		}, 
		checkIfHasRightsToDelete() {
			if (this.isAdmin === true || this.post.author_id === this.userId) {
						this.has_rights_to_delete_post = true
					} 
			
		}, 
		deletePost(id) {
			if (window.confirm("Voulez-vous vraiment supprimer la publication id = " + id + " ?")) { 
				const options = {
					"method": 'DELETE', 
					"headers": {
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				}
				fetch(process.env.VUE_APP_API_URL + "/posts/" + id, options) 
					.then(response => response.json())
						.then(response => {
							console.log(response); 
							this.updatePostList(id); 
						})
					.catch(error => console.log(error)); 
			}
		}
	}
}
</script>

<style scoped lang="scss">
	.single-post-content {
		.heading-post{
			display: flex; 
			align-items: flex-end;
			.delete-post-btn {
				margin-left: auto; 
				.btn {
					border-radius: 50px; 
					padding: .4em .8em;
					border: none;
					cursor: pointer;
				}

			}
		}
		border-radius: 12px; 
		&__data {
			font-style: italic;
			font-size: 16px;
			padding: 1em 0; 
		}
		.post-card__data {
			display: flex;
			align-items: flex-end;
			margin-bottom: 1em; 
		}
		.post-image {
			width: 100%; 
			max-width: 800px; 
			border-radius: 32px; 
			box-shadow: 0 2px 2px rgba(0,0,0,0.25); 
		}
		.text-content {
			border-radius: 32px;
			background: rgb(2,0,36);
			background: linear-gradient(138deg, rgba(2,0,36,1) 0%, rgba(255,215,215,1) 0%, rgba(255,215,215,0.2147233893557423) 100%);
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


/* desktop only */ 
@media screen and (min-width: 860px) {
	.single-post-content {
		margin: 2em auto; 
		padding: 2em; 
	}
	.add-comment-btn {
		margin-left: 420px;
		width: 180px;
		height: 60px;
	}
}

/* mobile only */
@media screen and (max-width: 860px) {
	.articles-card {
		width: 95%; 
	}
	.single-post-content {
		.post-card__data {
			font-size: .8em;
		}
		.post-image {
			border-radius: 12px; 
		}
		.text-content {
			border-radius: 12px;
		}
	}
}
</style>