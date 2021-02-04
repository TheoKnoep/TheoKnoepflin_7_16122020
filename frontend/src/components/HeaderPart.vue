<template>
  <header class="header">
    
      <div class="main-line">
        <div class="img-container">
          <img class="default-logo" src="../assets/logo-color.png" alt="Logo de Groupomania" />
          <img class="responsive-logo" src="../assets/logo-mobile-color.png" alt="Logo de Groupomania" />
        </div>
        <h1>{{ pageTitle }}</h1>
        <div class="burger-menu" @click="togglBurgerMenu">
          <div :class="burgerMenuClass"></div>
          </div>
      </div>
      <pre>{{ userId }}</pre>
      <nav id="nav" class="nav" :class="mobileMenuNav" >
        <router-link to="/" class="nav__item" >Accueil</router-link><span class="nav__item--sep"> | </span>
        <router-link to="/account" class="nav__item" >Compte</router-link><span class="nav__item--sep"> | </span>
        <router-link to="/posts" class="nav__item" >Publications</router-link>
        <button @click="logOut">Déconnexion</button>
      </nav>
  </header>
</template>

<script>
import router from '@/router/index.js'
import store from '@/store'

export default {
  name: "HeaderPart",
  props: {
    pageTitle: String,
  },
  data () {
    return {
      mobileMenuNav: 'nav--closed',
      burgerMenuClass: 'burger-menu__inside--closed', 
      userId: store.state.userId
    }
  },
  methods: {
    togglBurgerMenu() {
      if (this.burgerMenuClass === 'burger-menu__inside--closed') {
        this.burgerMenuClass = 'burger-menu__inside--opened'; 
        this.mobileMenuNav = 'nav--opened';
      } else {
        this.burgerMenuClass = 'burger-menu__inside--closed'; 
        this.mobileMenuNav = 'nav--closed';
      }
    }, 
    logOut () {
      localStorage.clear(); 
      document.location.reload(); 
      router.push({ path: '/' }); 
      
    }
  }
};
</script>

<style scoped lang="scss">

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
  }
  .main-line {
    display: flex;
    align-items: center;
  }
  .img-container {
    margin-left: 1em; 
    img {
      width: 200px;
      height: auto;
    }
  }

  h1 {
    font-style: italic;
    font-size: 1.4em;
    margin-left: 1em; 
  }

  .nav {
    padding: 1.2em;
    .nav {
      display: none; 
    }
    a {
      font-weight: bold;
      color: #2c3e50;
      border-bottom: solid #a4afb9 1px;

      &.router-link-exact-active {
        color: #A12B33;
        border-bottom: solid #A12B33 1px;
      }
    }
  }




  .burger-menu {
    margin-left: auto; 
    margin-right: 1em; 
		width: 38px; height: 38px; 
		border: solid 1px #A12B33; 
		cursor: pointer; 
		border-radius: 2px;
		display: flex; 
		align-items: center;
		justify-content: center;
		&__inside--closed {
			width: 24px; 
			height: 3px; 
			background-color: #A12B33;
			&::before {
				content: ''; 
				display: block;
				background-color: #A12B33; 
				width: 24px; 
				height: 3px;
				position: relative;
				bottom: 8px;
			}
			&::after {
				content: ''; 
				display: block;
				background-color: #A12B33; 
				width: 24px; 
				height: 3px;
				position: relative;
				top: 5px;
			}
		}
		&__inside--opened {
			width: 24px; 
			height: 3px; 
			background-color: rgba(255,255,255,0);
			&::before {
				content: ''; 
				display: block;
				background-color: #A12B33; 
				width: 24px; 
				height: 3px;
				position: relative;
				bottom: 0px;
				transform: rotate(45deg);
			}
			&::after {
				content: ''; 
				display: block;
				background-color: #A12B33; 
				width: 24px; 
				height: 3px;
				position: relative;
				top: -3px;
				transform: rotate(-45deg);
			}
		}
	}

/* desktop-only */
@media screen and (min-width: 860px) {
  .responsive-logo {
    display: none; 
  }
  .burger-menu {
    display: none; 
  }
}

/* mobile-only */
@media screen and (max-width: 860px) {
  .header {
        display: block; 
    h1 {
      font-size: 1.15em; 
      text-align: left; 
    }
  }
  .main-line {
    box-shadow: 1px 1px 16px rgba(0, 0, 0, 0.1);
    .mobile-menu-toggl {
      margin-left: auto; 
      margin-right: 1em; 
    }
  }
  .img-container {
    img {
      width: 42px; 
      height: auto; 
    }
    .default-logo {
      display: none; 
    }
  }
  .nav__item--sep {
    display: none;
  }
  .nav--opened { 
    display: flex;
    flex-direction: column;  
    background-color: #FFD7D7; 
    a {
      margin: .4em 0;
      border: none; 
      background-color: darken(#FFD7D7, 3%); 
      border-radius: 2px; 
      padding: 0.4em; 
    }
  }
  .nav--closed {
    display: none; 
  }
}

@media screen and (max-width: 380px) {
  .header {
    h1 {
      max-width: 160px; 
    }
  }
}
</style>