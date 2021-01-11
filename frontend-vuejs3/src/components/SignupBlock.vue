<template>
	<div class="form-container">
			<h2>Créer un compte :</h2>
			<form id="form-signup" method="post" enctype="multipart/form-data">
				<p><label for="name">Nom</label> : 
					<input type="text" name="name" autofocus required/></p>
				<p><label for="email">Email</label> : 
					<input type="email" name="email" required/></p>
				<p><label for="password">Mot de passe</label> : 
					<input type="password" name="password" required/></p>
				<p><label for="position">Poste occupé</label> : 
					<input type="text" name="position"/></p>
				<p><label for="profile_picture">Choisissez une photo de profil</label> : 
					<input type="file" name="profile_picture"/></p>
				<p>
					<input type="submit" value="Création du compte" id="confirm-signup"/></p>
			</form>
		</div>
	
</template>

<script>
export default {
	name: "SignupBlock"
}
</script>

<style scoped lang="scss">
</style>