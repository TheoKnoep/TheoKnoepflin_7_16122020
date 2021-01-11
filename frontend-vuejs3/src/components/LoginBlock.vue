<template>
	<section>
		<div class="form-container">
			<h2>Connexion :</h2>
			<form method="post" id="form-login">
				<p><label for="email">Email</label> : <input type="email" name="email"/></p>
				<p><label for="password">Mot de passe</label> : <input type="password" name="password"/></p>
				<p><input type="submit" value="Connexion"/></p>
			</form>
		</div>
		<p>Vous ne disposez pas encore de compte ?<br/><router-link to="/account">Créer un compte</router-link></p>
		<button @click="console.log('Koukou')">Click me!</button>
	</section>
</template>

<script>
export default {
	name: "LoginBlock", 
	methods: {
		testFunction() {
			console.log("Koukou"); 
		}
	}
}
</script>