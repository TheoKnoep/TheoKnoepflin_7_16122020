<template>
	<main class="form-container card-style">
		<form id="form-create-post" method="post" enctype="multipart/form-data" @submit="createPost" >
			<p><label for="title">Titre</label> : 
				<input type="text" name="title" autofocus required v-model="title" class="input-title"/></p>
			<p><label for="content">Texte</label> : 
				<textarea type="text" name="content" row="15" cols="80" required v-model="content" /></p>
			<p><label for="image">Choisissez une image pour accompagner votre publication</label> : 
				<input type="file" name="image" /></p>
			<p>
				<input type="submit" value="Publier" class="btn submit-post-btn"/></p>
		</form>
		<p class="feedback-message">{{ feedbackMessage }}</p>
	</main>
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

				fetch(process.env.VUE_APP_API_URL + "/posts/", options) 
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

<style scoped lang="scss">
	.form-container {
		text-align: left; 
		display: flex; 
		flex-direction: column;
		justify-content: center;
		label {
			font-variant: small-caps; 
		}
		input {
			width: 100%;
			margin: 12px 0; 
		}
		.input-title {
			border-radius: 50px;
			border: none;
			background-color: rgba(20, 14, 14, 0.05);
			height: 32px;
			padding-left: 1em; 
		}
		textarea {
			width: 100%; 
			height: 132px; 
			border-radius: 32px;
			border: none;
			background-color: rgba(0,0,0,0.05);
			box-sizing: border-box; 
			padding: 1em; 
			font-family: 'Trebuchet', sans-serif; 
		}
		.submit-post-btn {
			width: 100%;
			height: 38px;
			border-radius: 50px;
			border: none;
			font-size: 20px;
			margin-top: 12px;
			cursor: pointer;
			background-color: #A12B33; 
			color: white; 
		}
	}
</style>