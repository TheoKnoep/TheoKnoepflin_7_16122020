<template>
	<div class="single-post">
		<pre>{{ postsData }}</pre>

		<div class="articles-cards">
			<div class="post-card" v-for="item in postsData" v-bind:key="item.index">
				<h2>{{ item.title }}</h2>
				<p class="post-card__data">Publié par {{ item.name}}, le {{ item.publication_local_date }} : </p>
				<img v-bind:src="item.media" />
				<p>{{ item.content }}</p>
			</div>
		</div>

		<p>Fin des articles</p>
	</div>
</template>

<script>
import axios from 'axios'


export default {
	name: 'PostsList', 
	data () {
		return {
			postsData: []
		}
	},
	mounted() {
		axios
			.get("http://localhost:3000/posts/")
			.then(response => {
				this.postsData = response.data; 
				for (let i in response.data) {
					let date = new Date(response.data[i].publication_date); 
					this.postsData[i].publication_local_date = date.toLocaleString(); 
				}
			})
	}
}
</script>

<style lang="scss" scoped>
	pre {
		text-align: left; 
	}

	.articles-cards {
		text-align: left;
		width: 80%; 
		margin: auto; 
	}

	.post-card {
		background-color: #eee; 
		margin: 2em; padding: 2em; 
		border-radius: 12px; 
		box-shadow: 2px 2px 12px rgba(0,0,0,0.2);
		&__data {
			font-style: italic;
			font-size: small;
		}
	}

</style>