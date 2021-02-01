<template>
	<div class="form-container">
		<h2>Créer une nouvelle publication :</h2>
		<form id="form-create-post" method="post" enctype="multipart/form-data" @submit="createPost" >
			<p><label for="title">Titre</label> : 
				<input type="text" name="title" autofocus required v-model="title"/></p>
			<p><label for="content">Texte</label> : 
				<textarea type="text" name="content" row="15" cols="80" required v-model="content" /></p>
			<p><label for="image">Choisissez une image pour accompagner votre publication</label> : 
				<input type="file" name="image" /></p>
			<p>
				<input type="submit" value="Publier" /></p>
		</form>
		<p class="feedback-message">{{ feedbackMessage }}</p>
	</div>
</template>

<script>
import router from '@/router/index.js'
import store from '../store'

export default {
	name: "CreatePostBlock",
	data() {
		return {
			title:'', 
			content: '', 
			feedbackMessage: '', 
			userId: store.state.userId, 
			token: localStorage.getItem('token')
		}
	},
	methods: {
		createPost(e) {
			e.preventDefault(); 
			let formContent = document.getElementById("form-create-post"); 
			let newPost = new FormData(formContent);
			
			if (!this.userId) {
				console.error("L'utilisateur n'est pas reconnu"); 
			} else {
				newPost.append('author_id', this.userId); 

				const options = {
					method: 'POST', 
					body: newPost
				}

				fetch("http://localhost:3000/posts/", options) 
					.then(response => response.json())
						.then(response => {
							console.log(response); 
							this.feedbackMessage = 'Votre compte est créé !'; 
							setTimeout(router.push({ path: '../posts' }), 3000);
						})
					.catch(error => console.log(error)); 
			}
		}
	}
}
</script>