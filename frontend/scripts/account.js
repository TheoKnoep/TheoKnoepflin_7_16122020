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
			displayInfos(result); 
		})
	.catch(error => console.log('error', error));

function displayInfos(data) {
	let profilePictureUrl = './media/profil.jpg'; 
	if (data.profile_picture != null && data.profile_picture != "") {
		profilePictureUrl = data.profile_picture; 
	}
	let positionDescription = "<em>pas d'information renseignée</em>"; 
	if (data.position != "" && data.position != null) {
		positionDescription = data.position; 
	}
	accountInfo.innerHTML = `<img src="${profilePictureUrl}" alt="Photo de profil de ${data.name}" width="180"/>
				<ul>	
					<li>Nom : ${data.name}</li>
					<li>Email : ${data.email}</li>
					<li>Poste : ${positionDescription}</li>
				</ul>`; 
}