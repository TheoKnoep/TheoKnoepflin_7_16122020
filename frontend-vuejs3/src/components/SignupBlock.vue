<template>
	<div class="form-container">
		<h2>Créer un compte :</h2>
		<form id="form-signup" method="post" enctype="multipart/form-data" @submit="signupUser" >
			<p><label for="name">Nom</label> : 
				<input type="text" name="name" autofocus required v-model="name"/></p>
			<p><label for="email">Email</label> : 
				<input type="email" name="email" required v-model="email" /></p>
			<p><label for="password">Mot de passe</label> : 
				<input type="password" name="password" required v-model="password" /></p>
			<p><label for="position">Poste occupé</label> : 
				<input type="text" name="position" v-model="position"/></p>
			<p><label for="image">Choisissez une photo de profil</label> : 
				<input type="file" name="image" /></p>
			<p>
				<input type="submit" value="Création du compte" id="confirm-signup"/></p>
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

			fetch("http://localhost:3000/users/signup", options) 
				.then(response => response.json())
					.then(response => {
							this.$store.dispatch('get_user_token', response.token); 
							this.$store.dispatch('get_user_id', response.userId); 
							this.$store.dispatch('get_user_role', response.isAdmin); 
							this.feedbackMessage = 'Votre compte est créé !'; 
							setTimeout(router.push({ path: 'account' }), 3000);
					})
				.catch(error => console.log(error)); 
		}
	}
}

</script>

<style scoped lang="scss">
</style>