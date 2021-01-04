let userIdStorage = localStorage.getItem("userId"); 
let token = localStorage.getItem("token"); 
let accountInfo = document.getElementById("account-data"); 

let options = {
	method: 'GET',
	headers: {
		"Authorization": "Bearer " + token + " " + userIdStorage
	}
}

fetch("http://localhost:3000/users/" + userIdStorage, options)
	.then(response => response.json())
		.then(result => {
			console.log(result); 
			fulfillFormFields(result); 
		})
	.catch(error => console.log('error', error));


let formEditAccount = document.getElementById("form-edit-account"); 
let profileImage = document.querySelector("#form-edit-account img");


function fulfillFormFields(data) {
	formEditAccount[0].value = data.name; 
	formEditAccount[1].value = data.email; 
	formEditAccount[2].value = data.position; 
	profileImage.src = data.profile_picture;
}


formEditAccount.addEventListener("submit", function(e) {
	e.preventDefault(); 
	console.log("pouic"); 
	let updatedUser = new FormData(formEditAccount); 
	console.log(updatedUser); 

	const options = {
		method: 'PUT', 
		body: updatedUser
	}

	fetch("http://localhost:3000/users/" + userIdStorage, options)
		.then(response => response.json())
			.then(response => {
				console.log(response); 
				displayFeedback(response.name); 
				setTimeout(redirectPage, 3000); 				
			})
		.catch(error => console.log(error)); 
}); 

function displayFeedback(nameUser) {
	let feedbackDiv = document.createElement("div");
	feedbackDiv.innerHTML = `<p class="feeback-form">Félicitations ${nameUser} ! Vos informations ont été modifiées avec succès</p>`; 
	formEditAccount.appendChild(feedbackDiv); 
}; 

function redirectPage() {
	window.location.replace("../account.html");
}; 