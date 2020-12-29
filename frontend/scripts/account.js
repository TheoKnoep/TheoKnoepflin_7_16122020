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
			console.log(result.name); 
			console.log(result.email); 
			console.log(result.position); 
			console.log(result.profile_picture); 
			displayInfos(result); 
		})
	.catch(error => console.log('error', error));

function displayInfos(data) {
	let profilePictureUrl = './media/profil.jpg'; 
	if (data.profile_picture != null) {
		profilePictureUrl = data.profile_picture; 
	}
	let positionDescription = "<em>pas d'information renseignée</em>"; 
	if (data.position != null) {
		positionDescription = data.position; 
	}
	accountInfo.innerHTML = `<img src="${profilePictureUrl}" alt="Photo de profil de ${data.name}" />
				<ul>	
					<li>Nom : ${data.name}</li>
					<li>Email : ${data.email}</li>
					<li>Poste : ${positionDescription}</li>
				</ul>`; 
}