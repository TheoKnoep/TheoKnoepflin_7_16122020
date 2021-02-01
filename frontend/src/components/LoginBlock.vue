<template>
  <section class="login-section card-style">
    <div class="form-container">
		<h2>Connexion :</h2> 
		<form method="post" id="form-login" @submit="loginUser" >
        <p>
			<label for="email">Email</label> : <br/> <input class="input-txt" type="email" name="email" v-model="email" />
        </p>
        <p>
			<label for="password">Mot de passe</label> : <br/> <input class="input-txt" type="password" name="password" v-model="password" />
        </p>
        <p class="submit-login"><input type="submit" value="Connexion" class="submit-login__btn"/></p>
      </form>
    </div>
    <p class="signup-link">
      Vous ne disposez pas encore de compte ?<br /><router-link to="/signup">Créer un compte</router-link
      >
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
		
		const loginRequest = {
			"email": this.email, 
			"password": this.password
		} 

		console.log(loginRequest); 

		const options = {
			"method": 'POST', 
			"body": JSON.stringify(loginRequest),
			"headers": {
				"Content-type": "application/json; charset=UTF-8"
			}
		}
		fetch("http://localhost:3000/users/login", options) 
			.then(response => response.json())
				.then(response => {
					console.log(response);
					localStorage.setItem('token', response.token); 
					this.$store.dispatch('get_user_id', response.userId); 
					this.$store.dispatch('get_user_role', response.isAdmin); 
					router.push({ path: 'account' }); 
				})
			.catch(error => console.log(error)); 
		}
	},
};
</script>


<style scoped lang="scss">

	.login-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		input {
			margin: 12px 0; 
		}
	}

.form-container {
		text-align: left; 
		display: flex; 
		flex-direction: column;
		justify-content: center;
		label {
			font-variant: small-caps; 
		}
		input {
			width: 100%;
			margin: 12px 0; 
		}
		.input-txt {
			border-radius: 50px;
			border: none;
			background-color: rgba(0,0,0,0.05);
			height: 32px;
			width: 85%; 
			margin-left: 5%; 
			margin-bottom: 24px; 
			padding-left: 1em; 
		}
		textarea {
			width: 100%; 
			height: 132px; 
			border-radius: 32px;
			border: none;
			background-color: rgba(0,0,0,0.05);
			box-sizing: border-box; 
		}
		.submit-login {
			display: flex;
			justify-content: center;
			.submit-login__btn {
				width: 180px;
				height: 38px;
				border-radius: 50px;
				border: none;
				font-size: 20px;
				margin-top: 12px;
				cursor: pointer;
				background-color: teal; 
				color: white; 
			}
		}
	}

	.signup-link {
		font-style: italic; 
		font-size: 0.9em; 
		margin-top: 2em; 
	}


@media screen and (max-width: 860px) {
	
}

</style>