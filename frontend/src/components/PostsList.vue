<template>
	<div class="posts-list">
		<pre style="text-align: left; ">{{ postsData }}</pre>
		<div class="articles-cards">
			<SinglePost v-for="(post, index) in postsData" 
				:key="post.id" 
				:post="post"
				:index="index"
				:nbOfComment="numberOfComments"
				:publishComment="publishComment"
				:updatePostList="updatePostList" /> 
		</div>
		<router-link to="/posts/new" class="add-publication" title="Ajouter une nouvelle publication">
			<span class="wrapper">
				<span class="add-publication__ico">✒</span><span class="add-publication__text-line">Ajouter une nouvelle publication</span>
			</span>
		</router-link>
		<p><em>Fin des articles</em></p>
	</div>
</template>

<script>

import axios from 'axios'
import store from '../store'
import SinglePost from '@/components/SinglePost.vue'

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
		SinglePost
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
		}
	},
	mounted() {
		axios
			.get(process.env.VUE_APP_API_URL + "/posts/")
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
		background-color: #d1515a; 
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
		&:hover {
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

</style>