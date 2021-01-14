<template>
  <section>
    <div class="form-container">
      <h2>Connexion :</h2>
      <form method="post" id="form-login" @submit="loginUser" >
        <p>
			<label for="email">Email</label> : <input type="email" name="email" v-model="email" />
        </p>
        <p>
			<label for="password">Mot de passe</label> : <input type="password" name="password" v-model="password" />
        </p>
        <p><input type="submit" value="Connexion" /></p>
      </form>
    </div>
    <p>
      Vous ne disposez pas encore de compte ?<br /><router-link to="/account">Créer un compte</router-link
      >
    </p>
    <p>
      Récap du formulaire : {{ email }} et {{ password }}
    </p>
  </section>
</template>

<script>
import router from '@/router/index.js'
export default {
  name: "LoginBlock",
  data() {
    return {
		email: '', 
		password: ''
	};
  },
  methods: {
	loginUser(e) {
		e.preventDefault(); 
		alert("Ok, connexion de l'utilisateur"); 
		
		const loginRequest = {
			"email": this.email, 
			"password": this.password
		} 
		console.log(loginRequest); 

		const options = {
			method: 'POST', 
			body: JSON.stringify(loginRequest),
			headers: {
				"Content-type": "application/json; charset=UTF-8"
			}
		}
		fetch("http://localhost:3000/users/login", options) 
			.then(response => response.json())
				.then(response => {
					console.log(response); 
					localStorage.setItem('userId', response.userId); 
					localStorage.setItem('token', response.token); 
					router.push({ path: 'account' }); 
				})
			.catch(error => console.log(error)); 
		}
	},
};
</script>