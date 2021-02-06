<template>
	<div class="add-comment" > 
		<form method="post" @submit="addComment" :id=" 'comment_form_' + postId">
			<input type="hidden" name="user_id" :value="userId" />
			<input type="hidden" name="post_id" :value="postId" />
			<label for="content">Ajouter un commentaire : </label>
				<textarea id="content" name="content" placeholder="Tapez votre commentaire" required ></textarea>
			<input type="submit" value="Envoyer" class="btn add-comment-submit" />
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
		},
		publishComment: {
			type: Function
		}
	}, 
	methods: {
		addComment(e) {
			e.preventDefault(); 
			let commentForm = document.getElementById('comment_form_' + this.postId); 

			let requestBody = JSON.stringify({
				"author_id": commentForm[0].value, 
				"post_id": commentForm[1].value, 
				"content": commentForm[2].value
			}); 
			
			const options = {
				"method": 'POST', 
				"headers": {
					"Content-Type": "application/json", 
					"Authorization": "Bearer " + localStorage.getItem('token')
				}, 
				"body": requestBody
			}
 
			fetch(process.env.VUE_APP_API_URL + "/comments", options)
				.then(response => { 
					response.json()
						.then(message => {
							if (message.error) {
								alert('Une erreur est survenue lors de la création du commentaire, merci de rééssayer'); 
							} else {
								this.addImmediatlyNewComment(message); 
								this.$emit('increment-number-of-comments'); 
								this.$emit('hide-comment-form'); 
							}
						})
				})
				.catch(err => { console.error(err); }); 
		}, 
		addImmediatlyNewComment(newComment) {
			this.publishComment({"newComment":newComment, "post_id": this.postId} );
		}
	}
}
</script>

<style scoped lang="scss">

	textarea {
		width: 100%; 
		border-radius: 32px;
		border: none;
		background-color: rgba(0,0,0,0.05);
		box-sizing: border-box; 
		font-family: 'Trebuchet', sans-serif; 
		padding: 1em; 
		margin: 2px; 
		&:focus {
			outline: none; 
			border: solid 2px #A12B33; 
			margin: 0; 
		}
	}

	.add-comment-submit {
		width: 180px; 
		height: 38px;
		border-radius: 50px;
		border: none;
		font-weight: bold;
		color: white; 
		background-color: #A12B33; 
		margin-top: 12px;
		cursor: pointer;
		&:hover {
			box-shadow: 2px 2px 2px rgba(0,0,0,0.25); 
		}
	}

</style>