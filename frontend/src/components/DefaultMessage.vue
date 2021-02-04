<template>
		<aside class="feedback">
			<p class="feedback__message"><i class="fas fa-times"></i> Vous devez être connecté pour afficher ce contenu</p>
			<router-link to="/">Retour à l'accueil</router-link>
		</aside>
</template>

<script>
export default {
	name: 'DefaultMessage'
}
</script>

<style scoped lang="scss">

	.feedback {
		display: flex; 
		justify-content: center; 
		align-items: center;
		height: 50vh; 
		margin: 10% 15%; 
		flex-direction: column;
		font-style: italic;
		background-color: #FFD7D7; 
		border-radius: 3px; 
		p {
			margin-bottom: 1em; 
		}
	}

</style>