let formContent = document.getElementById("form-signup"); 

formContent.addEventListener('submit', function(e) {
	e.preventDefault(); 
	let newUser = new FormData(formContent); 
	console.log(newUser); 
	const options = {
		method: 'POST', 
		body: newUser
	}

	fetch("http://localhost:3000/users/signup", options) 
		.then(response => response.json())
			.then(response => {
				console.log(response); 
				console.log(`Le client a été créé`); 
				displayFeedback(response.name); 
				localStorage.setItem('userId', JSON.stringify(response.id)); 
				setTimeout(redirectPage, 3000); 
			})
		.catch(error => console.log(error));
	
}); 

function displayFeedback(nameUser) {
	let feedbackDiv = document.createElement("div");
	feedbackDiv.innerHTML = `<p class="feeback-form">Félicitations ${nameUser} ! Votre compte a été créé avec succès</p>`; 
	formContent.appendChild(feedbackDiv); 
}; 

function redirectPage() {
	window.location.replace("./account.html");
}; 