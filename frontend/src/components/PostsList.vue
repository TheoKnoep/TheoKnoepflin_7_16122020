<template>
	<div class="posts-list" v-if="userId">
		<router-link to="/posts/new" class="add-publication" title="Ajouter une nouvelle publication">
			<span class="wrapper">
				<span class="add-publication__ico">✒</span><span class="add-publication__text-line">Ajouter une nouvelle publication</span>
			</span>
		</router-link>
		<!-- <pre style="text-align: left; ">{{ postsData }}</pre> -->
		<div v-if="postsData.length">
			<div class="articles-cards">
				<SinglePost v-for="(post, index) in postsData" 
					:key="post.id" 
					:post="post"
					:index="index"
					:publishComment="publishComment"
					:updatePostList="updatePostList"
					:updateCommentsList="updateCommentsList" /> 
			</div>
			<p class="bottom-articles-list" v-if="postsData.length"><em>Fin des articles</em></p>
		</div>
		<div v-else class="empty-posts-list">
			<p>Aucune publication à afficher</p>
		</div>
	</div>
	<DefaultMessage v-else />
</template>

<script>

import axios from 'axios'
import store from '../store'
import SinglePost from '@/components/SinglePost.vue'
import DefaultMessage from '@/components/DefaultMessage'

export default {
	name: 'PostsList', 
	data () {
		return {
			userId : store.state.userId,
			isAdmin : store.state.isAdmin, 
			postsData: []
		}
	},
	components: {
		SinglePost, 
		DefaultMessage
	},
	methods: {
		addComment(e) {
			e.preventDefault(); 
			let commentFormContent = document.querySelectorAll('form'); 
			console.log(commentFormContent);
		},
		publishComment(comment) {
			let postIndex = this.postsData.findIndex(elt => elt.id === comment.post_id); 
			this.postsData[postIndex].comments.push(comment.newComment); 
		}, 
		updatePostList(postId) {
			let postIndex = this.postsData.findIndex(elt => elt.id === postId); 
			console.log(postIndex); 
			this.postsData.splice(postIndex, 1); 
		}, 
		updateCommentsList(postId, commentId) {
			let postIndex = this.postsData.findIndex(elt => elt.id === postId); 
			let commentIndex = this.postsData[postIndex].comments.findIndex(elt => elt.id === commentId); 
			console.log(this.postsData[postIndex].comments[commentIndex]); 
			this.postsData[postIndex].comments.splice(commentIndex, 1); 
		}
	},
	mounted() {
		axios
			.get(process.env.VUE_APP_API_URL + "/posts/", {"headers" : {"Authorization": "Bearer " + localStorage.getItem('token')}})
			.then(response => {
				this.postsData = response.data; 
				for (let i in response.data) {
					this.postsData[i].add_comment_section = false; 
					let datePost = new Date(response.data[i].publication_date); 
					this.postsData[i].publication_local_date = datePost.toLocaleString(); 
				}
			})
	}
}
</script>

<style lang="scss" scoped>
	.articles-cards {
		text-align: left;
		width: 90%; 
		margin: auto; 
	}

	.comments-section {
		margin-top: 2em; 
	}

	.single-comment {
		padding: 1em 1em 1em 2em; 
	}

	.add-publication {
		background-color: #A12B33; 
		width: 80px; 
		height: 80px; 
		border-radius: 80px; 
		display: flex;
		flex-wrap: wrap;
		justify-content: left;
		align-items: center;
		font-size: 42px;
		text-decoration: none;
		position: fixed;
		right: 18px;
		bottom: 18px;
		box-shadow: 2px 2px 2px rgba(0,0,0,0.25);
		transition: all ease 300ms; 
		overflow: hidden;
		text-align: left;
		color: white; 
		&:hover, &:focus {
			width: 340px; 
		}
		.wrapper {
			width: 340px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		&__ico {
			width: 80px; 
			text-align: center;
		}
		&__text-line {
			width: 260px;  
			font-size: 16px; 
		}
	}

	.bottom-articles-list {
		color: #091f43;
		background-color: #FFD7D7;
		padding: 1em;
		margin: 1em;
		border-radius: 3px;
	}

	.empty-posts-list {
		height: 80vh; 
		display: flex; 
		align-items: center;
		justify-content: center; 
		font-style: italic; 
	}

</style>