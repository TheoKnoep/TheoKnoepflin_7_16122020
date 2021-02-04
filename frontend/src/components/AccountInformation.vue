<template>
	<div>
		<main class="account-info card-style" v-if="userId">
			<div class="account-data" id="account-data" >
				<div class="profile-picture-container">
					<img v-if="has_profile_picture" v-bind:src="profile_picture_url" v-bind:alt=" 'Photo de profil de ' + name" />
				</div>
				<ul class="account-data__text">
					<li>Nom : <strong>{{ name }}</strong></li>
					<li>Adresse email : <strong><a :href="'mailto:' + email" >{{ email }}</a></strong></li>
					<li>Poste : <strong>{{ position }}</strong></li>
					<li v-if="currentUserIsAdmin" class="user-is-admin">ADMINISTRATEUR</li>
				</ul>
			</div>
			<div class="edit-account-button" v-if="has_buttons_access"> <!-- à n'afficher que si le compte consulté est celui de l'utilisateur ou un admin -->
				<router-link :to=" '/account/edit/' + id" class="btn edit-account-button__btn edit-account-button__btn--main">Modifier les informations du compte</router-link>
				<button @click="deleteAccount(id)" class="btn edit-account-button__btn edit-account-button__btn--second">Supprimer le compte</button>
			</div>
		</main>

		<DefaultMessage v-else />
	</div>
</template>

<script>
import axios from 'axios' 
import router from '../router/index'
import store from '../store'
import DefaultMessage from '@/components/DefaultMessage.vue'

export default {
	name: "AccountInformation", 
	components: {
		DefaultMessage
	}, 
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
			token: localStorage.getItem('token'), 
			has_buttons_access: false, 
			currentUserIsAdmin: false
		}
	},
	mounted() {
		axios
			.get(process.env.VUE_APP_API_URL + "/users/" + this.id)
			.then(response => {
				if (response.data.profile_picture != '') {
					this.has_profile_picture = true; 
					this.profile_picture_url = response.data.profile_picture;
				}
				if (response.data.position != '' && response.data.position != null) { this.position = response.data.position}
				this.name = response.data.name;
				this.email = response.data.email;
				this.alt_text = 'Photo de profil de ' + response.data.name;
				if (this.isAdmin === true || response.data.id === this.userId) {
					this.has_buttons_access = true
				} 
				if (response.data.is_admin) {
					this.currentUserIsAdmin = true
				}
			})
	},
	methods: {
		deleteAccount(id) {
			if (window.confirm("Êtes vous sûr de vouloir supprimer ce compte utilisateur ?")) { 
				const options = {
					"method": 'DELETE', 
					"headers": {
						"Authorization": `Bearer ${localStorage.getItem('token')}`
					}
				}
				fetch(process.env.VUE_APP_API_URL + "/users/" + id, options) 
					.then(response => response.json())
						.then(response => {
							console.log(response)
							router.push({ path: '/' });
						})
					.catch(error => console.log(error)); 
			}
		}
	}
}
</script>

<style scoped lang="scss">

	.account-info {
		display: flex; 
		flex-direction: column;
		justify-content: space-between;
	}

	.account-data {
		display: flex; 
		justify-content: center;
		align-items: center;
		.profile-picture-container {
			width: 200px; 
			height: 200px;
			border-radius: 1000px;
			overflow: hidden;
			display: flex; 
			justify-content: center;
			align-content: center;
			img {
				height: 100%;
			}
		}
		&__text {
			text-align: left;
			margin-left: 1em; 
			li {
				list-style: none; 
				margin: 1em 0; 
			}
		} 
	}
	.user-is-admin {
		border: solid 1px gray; 
		color: gray; 
		background-color: rgba(0,0,0,0.05);
		border-radius: 2px; 
		width: 100%; 
		text-align: center;
	}

	.edit-account-button {
		display: flex; 
		align-items: center;
		flex-direction: column;
		margin-top: 48px; 
		&__btn {
			width: 100%;
			height: 38px;
			border-radius: 50px;
			border: none;
			font-size: 18px;
			margin-top: 12px;
			cursor: pointer;
			&--main {
				background-color: #A12B33; 
				color: white; 
				display: flex;
				justify-content: center;
				align-items: center;
			}
			&--second {
				font-style: italic; 
				color: #b5b5b5; 
			}
		}
	}
</style>