<template>
	<div class="add-comment" > 
		<form method="post" @submit="addComment" :id=" 'comment_form_' + postId">
			<input type="hidden" name="user_id" :value="userId" />
			<input type="hidden" name="post_id" :value="postId" />
			<label for="content">Ajouter un commentaire : </label>
				<textarea name="content" placeholder="Tapez votre commentaire" ></textarea>
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
 
			fetch("http://localhost:3000/comments", options)
				.then(response => { 
					response.json()
						.then(message => {
							this.addImmediatlyNewComment(message); 
							this.hideCommentForm();
						})
				})
				.catch(err => { console.error(err); }); 
		}, 
		addImmediatlyNewComment(newComment) {
			this.$emit('increment-number-of-comments'); 
			let newCommentHtml = document.createElement("div"); 
			let cleanDate = new Date(newComment.comment_date); 
			newCommentHtml.innerHTML = `<div class="single-comment">
											<img src="${newComment.profile_picture}" width="25" height="25">
											<p>${cleanDate.toLocaleString()}</p>
											<p><strong>${newComment.name}</strong></p>
											<p class="single-comment__content">${newComment.content}</p>
										</div>`
			console.log(newCommentHtml); 
			let commentsSection = document.getElementById('comments-wrapper#' + this.postId); 
			commentsSection.appendChild(newCommentHtml); 
		},
		hideCommentForm() {
			this.$emit('hide-comment-form')
		}
	}
}
</script>

<style lang="scss">

	textarea {
		width: 100%; 
		font-family: 'Trebuchet', sans-serif; 
		border-radius: 4px; 
		border: none;
		padding: .4em 1em;
		&:focus {
			outline: none; 
		}
	}

</style>