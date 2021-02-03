<template>
	<div v-if="message" class="feedback-box">
		<p >{{ message }}</p>
		<div class="close-message" @click="closeMessage">x</div>
	</div>
</template>

<script>
export default {
	name: 'FeedbackBox', 
	props: {
		message: {
			type: String
		}
	}, 
	methods: {
		closeMessage () {
			console.log('coucou :| ');
		}
	}
}
</script>

<style scoped lang="scss">

	.feedback-box {
		position: fixed; 
		bottom: 24px; 
		left: 24px; 
		border: solid red 2px; 
		background-color: pink; 
	}

	.close-message {
		cursor: pointer;
		border-radius: 50px; 
		width: 20px; 
		height: 20px; 
		background-color: black; 
		color: white; 
		text-align: center; 
		position: absolute; 
	}
</style>