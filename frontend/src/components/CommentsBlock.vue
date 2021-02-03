<template>
	<div class="single-comment" >
		<div class="identity-block">
			<img v-bind:src="comment.profile_picture" width="25" height="25" />
			<p><strong><router-link :to="'/user/' + comment.comment_author_id" >{{ comment.name }}</router-link></strong></p>
		</div>
		<p class="comment-date">{{ cleanCommentDate }}</p>
		<p class="single-comment__content">{{ comment.content }}</p>
		<div class="delete-comment-btn" v-if="has_rights_to_delete_comment">
			<button @click="deleteComment(comment.id)" class="btn "><i class="far fa-trash-alt"></i>&nbsp;Supprimer</button>
		</div>
	</div> 
</template>

<script>
import store from '@/store'

export default {
	name: 'CommentsBlock', 
	data() {
		return {
			userId: store.state.userId, 
			isAdmin: store.state.isAdmin,
			cleanCommentDate: new Date(this.comment.comment_date).toLocaleString(), 
			has_rights_to_delete_comment: false
		}
	},
	props: {
		comment: {
			type: Object
		}, 
		postId: {
			type: Number
		},  
		updateCommentsList: {
			type: Function
		}
	}, 
	methods: {
		checkHasRightToDeleteComment () {
			if (this.isAdmin === true || this.comment.comment_author_id === this.userId) {
				this.has_rights_to_delete_comment = true
			} 
		},
		deleteComment (id) {
			if (window.confirm("Voulez-vous vraiment supprimer le commentaire id = " + id + " ?")) { 
				const options = {
					"method": 'DELETE', 
					"headers": {
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				}
				fetch(process.env.VUE_APP_API_URL + "/comments/" + id, options) 
					.then(response => response.json())
						.then(response => {
							console.log(response); 
							this.$emit('decreament-number-of-comments'); 
							this.updateCommentsList(this.postId, id);
						})
					.catch(error => console.log(error)); 
			} 
		}
	}, 
	created () {
		this.checkHasRightToDeleteComment(); 
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

	.delete-comment-btn {
		margin-top: .6em; 
		.btn {
			border-radius: 50px; 
			padding: .4em .8em;
			border: none;
			cursor: pointer;
		}

	}

	@media screen and (max-width: 860px) {
		.single-comment { 
			margin-left: 1em; 
			font-size: 14px; 
			.comment-date {
				font-size: .8em; 
			}
		}
	}
</style>