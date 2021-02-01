<template>
	<div>
		<div class="account-info" v-if="userId != '' && name != ''">
			<div class="account-data" id="account-data" >
				<pre>{{ token }}</pre>
				<div class="profile-picture-container">
					<img v-if="has_profile_picture" v-bind:src="profile_picture_url" v-bind:alt="alt_text" />
				</div>
				<ul>
					<li>Nom : {{ name }}</li>
					<li>Adresse email : {{ email }}</li>
					<li>Poste : {{ position }}</li>
					<li v-if="currentUserIsAdmin">ADMINISTRATEUR</li>
				</ul>
			</div>
			<div class="edit-account-button" v-if="has_buttons_access"> <!-- à n'afficher que si le compte consulté est celui de l'utilisateur ou un admin -->
				<router-link to="/account/edit">Modifier les informations du compte</router-link>
				<button @click="deleteAccount">Supprimer le compte</button>
			</div>
		</div>
		<div v-else>
			<p>Vous devez être connecté pour afficher ce contenu</p>
			<p> UserId = {{ $store.state.userId }}</p>
			<p> Ou userId = {{ userId }}</p>
			<router-link to="/">Retour à l'accueil</router-link>
		</div>
	</div>
</template>

<script>
import axios from 'axios' 
import router from '../router/index'
import store from '../store'

export default {
	name: "AccountInformation", 
	props: {
		id: {
			type: Number
		}
	},
	data ()  {
		return{
			userId : store.state.userId,
			isAdmin : store.state.isAdmin,
			name: '', 
			email: '', 
			position: 'pas de poste renseigné', 
			has_profile_picture: false,
			profile_picture_url: '', 
			alt_text: '', 
			token: localStorage.getItem('token'), 
			has_buttons_access: false, 
			currentUserIsAdmin: false
		}
	},
	mounted() {
		axios
			.get("http://localhost:3000/users/" + this.id)
			.then(response => {
				if (response.data.profile_picture != '') {
					this.has_profile_picture = true; 
					this.profile_picture_url = response.data.profile_picture;
				}
				console.log(response.data); 
				if (response.data.position != '' && response.data.position != null) { this.position = response.data.position}
				this.name = response.data.name;
				this.email = response.data.email;
				this.alt_text = 'Photo de profil de ' + response.data.name;
				if (this.isAdmin === true || response.data.id === this.userId) {
					console.log("Oui, les droits !"); 
					this.has_buttons_access = true
				} else {
					console.log("Non, pas le droit de voir les boutons :("); 
				}
				console.log(response.data.is_admin);
				if (response.data.is_admin) {
					console.log(response.data.is_admin);
					this.currentUserIsAdmin = true
				}
			})
	},
	methods: {
		deleteAccount() {
			if (window.confirm("Êtes vous sûr de vouloir supprimer le compte ?")) { 
				const options = {
					"method": 'DELETE', 
					"headers": {
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				}
				fetch("http://localhost:3000/users/" + this.userId, options) 
					.then(response => response.json())
						.then(response => {
							console.log(response); 
							router.push({ path: '/' });
						})
					.catch(error => console.log(error)); 
			}
		}
	}
}
</script>