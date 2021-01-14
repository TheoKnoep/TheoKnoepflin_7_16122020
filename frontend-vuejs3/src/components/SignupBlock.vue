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
		<p>Nom = {{ name }}</p>
	</div>
</template>

<script>
	export default {
		name: "SignupBlock",
		data() {
			return {
				name:'', 
				email: '', 
				password: '', 
				position: ''
			}
		},
		methods: {
			signupUser(e) {
				e.preventDefault(); 
				let formContent = document.getElementById("form-signup"); 
				let newUser = new FormData(formContent); //ne marche pas
				/*
				let newUser = new FormData(); 
				console.log(this.name); 
				newUser.append("name", this.name);
				newUser.append("email", this.email); 
				newUser.append("password", this.password);
				newUser.append("position", this.position); */
				console.log(newUser.get("name")); 
/*
				console.log(newUser); 
				console.log(newUser.length); 
				for (let i = 0; i < newUser.length; i++) {
					console.log(newUser[i]); 
				}
				*/
			}
		}
	}

</script>

<style scoped lang="scss">
</style>