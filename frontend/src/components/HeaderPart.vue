<template>
  <header class="header">
      <div class="main-line">
        <div class="img-container">
          <img class="default-logo" src="../assets/logo-color.png" />
          <img class="responsive-logo" src="../assets/logo-mobile-color.png" />
        </div>
        <h1>{{ pageTitle }}</h1>
        <div class="burger-menu" @click="togglBurgerMenu">
          <div :class="burgerMenuClass"></div>
          </div>
      </div>
      
      <nav id="nav" class="nav" :class="mobileMenuNav" >
        <router-link to="/" class="nav__item" >Accueil</router-link><span class="nav__item--sep"> | </span>
        <router-link to="/account" class="nav__item" >Compte</router-link><span class="nav__item--sep"> | </span>
        <router-link to="/posts" class="nav__item" >Publications</router-link>
      </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderPart",
  props: {
    pageTitle: String,
  },
  data () {
    return {
      mobileMenuNav: 'nav--closed',
      burgerMenuClass: 'burger-menu__inside--closed'
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
        color: #d1515a;
        border-bottom: solid #d1515a 1px;
      }
    }
  }




  .burger-menu {
    margin-left: auto; 
    margin-right: 1em; 
		width: 42px; height: 42px; 
		border: solid 1px #d1515a; 
		cursor: pointer; 
		border-radius: 2px;
		display: flex; 
		align-items: center;
		justify-content: center;
		&__inside--closed {
			width: 24px; 
			height: 3px; 
			background-color: #d1515a;
			&::before {
				content: ''; 
				display: block;
				background-color: #d1515a; 
				width: 24px; 
				height: 3px;
				position: relative;
				bottom: 8px;
			}
			&::after {
				content: ''; 
				display: block;
				background-color: #d1515a; 
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
				background-color: #d1515a; 
				width: 24px; 
				height: 3px;
				position: relative;
				bottom: 0px;
				transform: rotate(45deg);
			}
			&::after {
				content: ''; 
				display: block;
				background-color: #d1515a; 
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
      width: 60px; 
      height: auto; 
    }
    .default-logo {
      display: none; 
    }
  }
  .nav--opened { 

    flex-direction: column;  
    background-color: #FFD7D7; 
    &__item--sep {
      display: none;
    }
    a {
      margin: 0 2em;
    }
  }
  .nav--closed {
    display: none; 
  }
}
</style>