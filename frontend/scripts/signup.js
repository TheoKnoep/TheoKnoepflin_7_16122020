let formContent = document.getElementById("form-signup"); 

formContent.addEventListener('submit', function(e) {
	e.preventDefault(); 
	/*
	const newUser = {
		"name": formContent[0].value,
		"email": formContent[1].value,
		"password": formContent[2].value,
		"position": formContent[3].value,
		"profile_picture": formContent[4].files[0]
	}
	*/
	let newUser = new FormData(formContent); 

	console.log(newUser); 

	const options = {
		method: 'POST', 
		body: newUser,
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	}

	fetch("http://localhost:3000/users/signup", options) 
		.then(response => response.json())
			.then(response => {
				console.log(`Le client n° ${response.id} a été créé`); 
				localStorage.setItem('userId', JSON.stringify(response.id)); 
				/* windows.location.replace = "./account.html"; */
			})
		.catch(error => console.log(error)); 	
}); 