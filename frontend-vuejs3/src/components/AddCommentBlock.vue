<template>
	<div class="add-comment" > 
		<form method="post" @submit="addComment">
			<input type="hidden" name="user_id" :value="userId" />
			<input type="hidden" name="post_id" :value="postId" />
			<label for="content">Ajouter un commentaire : </label>
				<textarea name="content" ></textarea>
			<input type="submit" value="Envoyer" />
		</form>
	</div>	
</template>

<script>
export default {
	name: 'AddCommentBlock', 
	props: {
		userId: {
			type: Number
		}, 
		postId: {
			type: Number
		}
	}, 
	methods: {
		addComment(e) {
			e.preventDefault(); 
			let commentForm = document.querySelector('form'); 
			for (let i = 0; i < commentForm.length; i++) {
				console.log(commentForm[i].value);
			}
			let requestBody = {
				"author_id": commentForm[0].value, 
				"post_id": commentForm[1].value, 
				"content": commentForm[2].value
			}
			console.log(requestBody); 
		}
	}
}
</script>

<style lang="scss">

	textarea {
		width: 100%; 
	}
</style>