<template>
	<div class="form-container card-style">
		<form id="form-signup" method="post" enctype="multipart/form-data" @submit="signupUser" >
			<p><label for="name">Nom</label><span class="required-item">*</span> : <br/>
				<input id="name" class="input-txt" type="text" name="name" autofocus required v-model="name"/></p>
			<p><label for="email">Email</label><span class="required-item">*</span> : <br/>
				<input id="email" class="input-txt" type="email" name="email" required v-model="email" /></p>
			<p><label for="password">Mot de passe</label><span class="required-item">*</span> : <br/>
				<input id="password" class="input-txt" type="password" name="password" required v-model="password" /></p>
			<p><label for="position">Poste occupé</label> : <br/>
				<input id="position" class="input-txt" type="text" name="position" v-model="position"/></p>
			<p><label for="image">Choisissez une photo de profil</label> : 
				<input id="image" type="file" name="image" /></p>
			<p>
				<input type="submit" value="Création du compte" id="confirm-signup" class="btn confirm-signup-btn" /></p>
			<p class="required-item required_item_text">* élément requis</p>
		</form>
		<p class="feedback-message">{{ feedbackMessage }}</p>
	</div>
</template>

<script>
import router from '@/router/index.js'

export default {
	name: "SignupBlock",
	data() {
		return {
			name:'', 
			email: '', 
			password: '', 
			position: '', 
			feedbackMessage: ''
		}
	},
	methods: {
		signupUser(e) {
			e.preventDefault(); 
			let formContent = document.getElementById("form-signup"); 
			let newUser = new FormData(formContent);

			const options = {
				method: 'POST', 
				body: newUser
			}

			fetch(process.env.VUE_APP_API_URL + "/users/signup", options) 
				.then(response => response.json())
					.then(response => {
						console.log(response); 
						if (response.error) {
							alert('Une erreur est survenue lors de la création du compte. Merci de rééssayer : ' + response.error); 
						} else {
							localStorage.setItem('token', response.token); 
							this.$store.dispatch('get_user_id', response.userId); 
							this.$store.dispatch('get_user_role', response.isAdmin); 
							this.feedbackMessage = 'Votre compte est créé !'; 
							router.push({ path: 'account' });
						}
					})
				.catch(error => console.log(error)); 
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
		.required-item {
			color: red; 
		}
		.required_item_text {
			font-style: italic; 
			font-size: .7em; 
		}
		.input-txt {
			border-radius: 50px;
			border: none;
			background-color: rgba(0,0,0,0.05);
			height: 32px;
			width: 85%; 
			margin-left: 5%; 
			margin-bottom: 24px; 
			padding-left: 1em; 
		}
		textarea {
			width: 100%; 
			height: 132px; 
			border-radius: 32px;
			border: none;
			background-color: rgba(0,0,0,0.05);
			box-sizing: border-box; 
		}
		.confirm-signup-btn {
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