<template>
	<div class="form-container card-style">
		<form id="form-edit" method="post" enctype="multipart/form-data" @submit="editUser" >
			<p><label for="name">Nom</label> : <br/>
				<input class="input-txt" type="text" name="name" autofocus v-model="userInfos.name" /></p>
			<p><label for="email">Email</label> : <br/>
				<input class="input-txt" type="email" name="email" v-model="userInfos.email" /></p>
			<p><label for="position">Poste occupé</label> : <br/>
				<input class="input-txt" type="text" name="position" v-model="userInfos.position"/></p>
			<p><label for="image">Choisissez une nouvelle photo de profil</label> : 
				<input type="file" name="image" /></p>
			<p>
				<input type="submit" value="Valider les changements" id="confirm-edit" class="btn submit-form-edit-btn"/></p>
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
			id: this.$route.params.id
		}
	}, 
	mounted() {
		axios
			.get(process.env.VUE_APP_API_URL + "/users/" + this.id)
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
					"Authorization": `Bearer ${localStorage.getItem('token')}`
				}
			}

			fetch(process.env.VUE_APP_API_URL + "/users/" + this.id, options) 
				.then(() => {
						router.push({ path: '/user/' + this.id });
					})
				.catch(error => console.log(error)); 
		}
	}
}
</script>

<style lang="scss">
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
		.submit-form-edit-btn {
			width: 100%;
			height: 38px;
			border-radius: 50px;
			border: none;
			font-size: 20px;
			margin-top: 12px;
			cursor: pointer;
			background-color: #d1515a; 
			color: white; 
		}
	}
</style>