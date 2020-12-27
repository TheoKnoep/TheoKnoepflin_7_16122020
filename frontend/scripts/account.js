let userId = 2; //comment récupérer l'id de l'utilisateur connecté ? via LocalStorage ?
let accountInfo = document.getElementById("account-data"); 

fetch("http://localhost:3000/users/" + userId)
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