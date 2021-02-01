<template>
	<div class="add-comment" > 
		<form method="post" @submit="addComment" :id=" 'comment_form_' + postId">
			<input type="hidden" name="user_id" :value="userId" />
			<input type="hidden" name="post_id" :value="postId" />
			<label for="content">Ajouter un commentaire : </label>
				<textarea name="content" placeholder="Tapez votre commentaire" ></textarea>
			<input type="submit" value="Envoyer" class="add-comment-submit" />
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
			newCommentHtml.setAttribute('class', 'single-comment')
			let cleanDate = new Date(newComment.comment_date); 
			console.log(newComment); 
			newCommentHtml.innerHTML = `<img src="${newComment.profile_picture}" width="25" height="25">
										<p>${cleanDate.toLocaleString()}</p>
										<p><strong><a href="./#/user/${newComment.comment_author_id}">${newComment.name}</a></strong></p>
										<p class="single-comment__content">${newComment.content}</p>`
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
			border: solid 2px teal; 
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
		background-color: teal; 
		margin-top: 12px;
		cursor: pointer;
		&:hover {
			box-shadow: 2px 2px 2px rgba(0,0,0,0.25); 
		}
	}

</style>