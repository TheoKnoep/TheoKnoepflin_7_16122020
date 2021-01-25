<template>
		<div class="form-container">
			<pre>{{ userInfos }}</pre>
		<h2>Mettre à jour les informations de votre compte : USERID = {{ userId }}</h2>
		<form id="form-signup" method="post" enctype="multipart/form-data" @submit="editUser" >
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
				<input type="submit" value="Valider les changements" id="confirm-edit"/></p>
		</form>
		<p class="feedback-message">{{ feedbackMessage }}</p>
	</div>
</template>

<script>
import axios from 'axios'
import store from '../store'

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
			userId: store.state.userId
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
	}
}
</script>

<style lang="scss">
	pre {
		text-align: left; 
	}
</style>