let formContent = document.getElementById("form-signup"); 

formContent.addEventListener('submit', function(e) {
	e.preventDefault(); 

	for (let i = 0; i < formContent.length; i++) {
		console.log(formContent[i].value); 
	}

	const newUser = {
		"name": formContent[0].value,
		"email": formContent[1].value,
		"password": formContent[2].value,
		"position": formContent[3].value,
		"profile_picture": formContent[4].value
	}

	console.log(newUser); 

	const options = {
		method: 'POST', 
		body: JSON.stringify(newUser), 
		headers: {
			"Content-type": "application/json; charset=UTF-8"
		}
	}

	fetch("http://localhost:3000/users/signup", options) 
		.then(response => response.json())
			.then(response => {
				console.log(`Le client n° ${response.id} a été créé`); 
			})
		.catch(error => console.log(error)); 

}); 