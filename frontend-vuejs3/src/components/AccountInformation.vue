<template>
	<div class="account-info">
		<div class="account-data" id="account-data">
			<div class="profile-picture-container">
				<img v-if="has_profile_picture" v-bind:src="profile_picture_url" v-bind:alt="alt_text" />
				<img v-else src="@/assets/profil.jpg" alt="L'utilisateur n'a pas renseigné de photo de profil" />
			</div>
			<ul>
				<li>Nom : {{ name }}</li>
				<li>Adresse email : {{ email }}</li>
				<li>Poste : {{ position }}</li>
			</ul>
		</div>
		<div class="edit-account-button"> <!-- à n'afficher que si le compte consulté est celui de l'utilisateur ou un admin -->
			<router-link to="/account/edit">Modifier les informations du compte</router-link>
		</div>
	</div>
</template>

<script>
import axios from 'axios' 
import router from '@/router/index.js'

export default {
	name: "AccountInformation", 
	data ()  {
		return{
			userId : '',
			name: '', 
			email: '', 
			position: 'Pas de poste renseigné', 
			has_profile_picture: false,
			profile_picture_url: '', 
			alt_text: ''
		}
	},
	mounted() {
		const userId = localStorage.getItem('userId'); 
		axios
			.get("http://localhost:3000/users/" + userId)
			.then(response => {
				if (response.data.profile_picture != '') {
					this.has_profile_picture = true; 
					this.profile_picture_url = response.data.profile_picture;
				}
				if (response.data.position != '' && response.data.position != null) { this.position = response.data.position}
				this.name = response.data.name;
				this.email = response.data.email;
				this.alt_text = 'Photo de profil de ' + response.data.name;
			})
	},
	methods: {
		//script pour récupérer l'id utilisateur dans le localStorage : 
		getUserId() {
			return localStorage.getItem('userId'); 
		}, 
		redirectToEdit() {
			router.push({ path: 'account' })
		}
	}
}
</script>