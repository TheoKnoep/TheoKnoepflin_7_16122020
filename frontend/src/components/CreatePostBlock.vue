<template>
	<main class="form-container card-style">
		<form id="form-create-post" method="post" enctype="multipart/form-data" @submit="createPost" >
			<p><label for="title">Titre<span class="required-item">*</span></label> : 
				<input id="title" type="text" name="title" autofocus required v-model="title" class="input-style"/></p>
			<p><label for="content">Texte</label><span class="required-item">*</span> : 
				<textarea id="content" type="text" name="content" row="15" cols="80" required v-model="content" /></p>
			<p><label for="image">Choisissez une image pour accompagner votre publication</label> : 
				<input id="image" type="file" name="image" /></p>
			<p><label for="alt_tag">Description de l'image</label> : 
				<input id="alt_tag" type="text" name="alt_tag" v-model="alt_tag" class="input-style" /></p> 
			<p>
				<input type="submit" value="Publier" class="btn submit-post-btn"/></p>
				<p class="required-item required_item_text">* élément requis</p>
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
					"method": 'POST', 
					"body": newPost, 
					"headers" : {
						"authorization" : "Bearer " + localStorage.getItem('token') 
					}
				}

				console.log(newPost.entries); 

				fetch(process.env.VUE_APP_API_URL + "/posts/", options) 
					.then(response => response.json())
						.then(response => {
							if (response.error) {
								alert('Une erreur est survenue lors de la création de la publication'); 
							} else {
								console.log(response); 
								this.feedbackMessage = 'C\'est publié !'; 
								setTimeout(router.push({ path: '../posts' }), 3000);
							}
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
		.input-style {
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
		.required-item {
			color: red; 
		}
		.required_item_text {
			font-style: italic; 
			font-size: .7em; 
		}
	}
</style>