<template>
	<div class="form-container">
		<h2>Mettre à jour les informations de votre compte : USERID = {{ userId }}</h2>
		<form id="form-edit" method="post" enctype="multipart/form-data" @submit="editUser" >
			<p><label for="name">Nom</label> : 
				<input type="text" name="name" autofocus v-model="userInfos.name" /></p>
			<p><label for="email">Email</label> : 
				<input type="email" name="email" v-model="userInfos.email" /></p>
			<p><label for="position">Poste occupé</label> : 
				<input type="text" name="position" v-model="userInfos.position"/></p>
			<p><label for="image">Choisissez une nouvelle photo de profil</label> : 
				<input type="file" name="image" /></p>
			<p>
				<input type="submit" value="Valider les changements" id="confirm-edit"/></p>
		</form>
		<p class="feedback-message" v-if="feedbackMessage">{{ feedbackMessage }}</p>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../store'
import router from '../router/index.js'

export default {
	name: 'AccountEdit', 
	data () {
		return {
			userInfos: 
				{
					name: '',
					email: '', 
					profile_picture: '', 
					position: ''
				}, 
			userId: store.state.userId, 
			token: store.state.token,
			feedbackMessage: ''
		}
	}, 
	mounted() {
		axios
			.get("http://localhost:3000/users/" + this.userId)
			.then(response => {
				if (response.data.profile_picture != '') {
					this.userInfos.profile_picture = response.data.profile_picture;
				}
				if (response.data.position != '' && response.data.position != null) { this.userInfos.position = response.data.position}
				this.userInfos.name = response.data.name;
				this.userInfos.email = response.data.email;
			})
	}, 
	methods: {
		editUser(e) {
			e.preventDefault(); 

			let editedUser = new FormData(document.getElementById("form-edit"));

			const options = {
				"method": 'PUT', 
				"body": editedUser, 
				"headers": {
					"Authorization": `Bearer ${this.token}`
				}
			}

			fetch("http://localhost:3000/users/" + this.userId, options) 
				.then(() => {
						this.feedbackMessage = 'Votre compte a été modifié avec succès !'; 
						setTimeout(router.push({ path: '../account' }), 3000);
					})
				.catch(error => console.log(error)); 
		}
	}
}
</script>

<style lang="scss">
	pre {
		text-align: left; 
	}
</style>