<template>
	<div class="posts-list">
		<!-- <pre>{{ postsData }}</pre> -->
		<article class="articles-cards">
			<div class="post-card" v-for="item in postsData" v-bind:key="item.index">
				<h2>{{ item.title }}</h2>
				<p class="post-card__data">Publié par <strong>{{ item.name}}</strong>, le {{ item.publication_local_date }} : </p>
				<img v-bind:src="item.media" />
				<p>{{ item.content }}</p>
				<div class="comments-section" v-if="item.has_comments">
					<hr />
					<h3>Commentaires :</h3>
					<div class="single-comment" v-for="comment in item.comments" v-bind:key="comment.index"> 
						<p>{{ comment.comment_date }}</p>
						<p><strong>{{ comment.name }}</strong></p>
						<p class="single-comment__content">{{ comment.content }}</p>
					</div> 
				</div>
				<div class="add-comment" v-bind:id="item.id"> 
					<button @click="addComment(item.id)">Ajouter un commentaire</button>
				</div>
			</div>
		</article>

		<p><em>Fin des articles</em></p>
	</div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'PostsList', 
	data () {
		return {
			postsData: []
		}
	},
	methods: {
		addComment(postId) {
			/*
			let newCommentForm = document.createElement("form"); 
			newCommentForm.appendChild("input").setAttribute("type", "text");
			newCommentForm.appendChild("input").setAttribute("type", "submit");
			document.getElementById(postId).appendChild(newCommentForm); 
			*/
			alert("Fonctionnalité à venir"); 
			let commentForm = document.getElementById(postId); 
			commentForm.innerHTML = `<form id=${postId} method="post">
										<label for="comment">Votre commentaire</label> : <input type="text" name="comment" v-model="comment"/>
										<input type="submit" />
									</form>`; 
		}
	},
	mounted() {
		axios
			.get("http://localhost:3000/posts/")
			.then(response => {
				this.postsData = response.data; 
				for (let i in response.data) {
					let datePost = new Date(response.data[i].publication_date); 
					this.postsData[i].publication_local_date = datePost.toLocaleString(); 

					this.postsData[i].has_comments = false; 
					axios 
						.get("http://localhost:3000/comments/" + response.data[i].id)
							.then(res => {
								console.log(res.data); 
								if (res.data) {
									this.postsData[i].has_comments = true; 
									this.postsData[i].comments = res.data.response ; 
									for (let y in res.data.response) {
										console.log(res.data.response[y].comment_date);
										let dateComment = new Date(res.data.response[y].comment_date); 
										this.postsData[i].comments[y].comment_date = dateComment.toLocaleString();
									}
								}
							}); 
				}
			})
	}
}
</script>

<style lang="scss" scoped>
	pre {
		text-align: left; 
	}

	.articles-cards {
		text-align: left;
		width: 80%; 
		margin: auto; 
	}

	.post-card {
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

	.comments-section {
		margin-top: 2em; 
	}

	.single-comment {
		padding: 1em 1em 1em 2em; 
	}

</style>