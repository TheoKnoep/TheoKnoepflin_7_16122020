let formContent = document.getElementById("form-login"); 

formContent.addEventListener('submit', function(e) {
	e.preventDefault(); 

	console.log(formContent.length); 
	for (let i = 0; i < formContent.length; i++) {
		console.log(formContent[i].value); 
	}
	
	const signupRequest = {
		"email": formContent[0].value, 
		"password": formContent[1].value
	}
	const options = {
		method: 'POST', 
		body: JSON.stringify(signupRequest),
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	}
	fetch("http://localhost:3000/users/login", options) 
		.then(response => response.json())
			.then(response => {
				console.log(response.userId); 
				localStorage.setItem('userId', response.userId); 
				localStorage.setItem('token', response.token); 
				window.location.replace("./account.html");
			})
		.catch(error => console.log(error)); 

}); 