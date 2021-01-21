<template>
	<div class="posts-list">
		<!-- <pre>{{ postsData }}</pre> -->
		<article class="articles-cards">
			<div class="post-card" v-for="item in postsData" v-bind:key="item.index">
				<!-- début du single-post -->
					<h2>{{ item.title }}</h2>
					<p class="post-card__data">
						<img class="author-picture" v-bind:src="item.profile_picture" width="40" height="40" />
						Publié par <strong>{{ item.name}}</strong>, le {{ item.publication_local_date }} : 
					</p>
					<img v-bind:src="item.media" />
					<p>{{ item.content }}</p>
				<!-- fin du single-post -->

					<div class="comments-section" v-if="item.comments.length">
						<hr />
						<h3>Commentaires :</h3>
						<div class="single-comment" v-for="comment in item.comments" v-bind:key="comment.index"> 
							<img v-bind:src="comment.profile_picture" width="25" height="25" />
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
			let commentForm = document.getElementById(postId); 
			commentForm.innerHTML = `<form id=${postId} method="post">
										<label for="comment">Votre commentaire</label> : <input type="text" name="comment" v-model="comment"/>
										<input type="submit" />
									</form>`; 
			alert(`Fonctionnalité à venir : commentaire pour le post # ${postId}`); 
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
					for (let y in response.data[i].comments) {
						let commentDate = new Date(response.data[i].comments[y].comment_date); 
						this.postsData[i].comments[y].comment_date = commentDate.toLocaleString(); 
					}
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

	.add-publication {
		background-color: teal; 
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