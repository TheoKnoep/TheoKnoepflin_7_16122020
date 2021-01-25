<template>
	<article class="single-post-content">
		<h2>{{ post.title }}</h2>
		<p>{{ content }}</p>
		<pre>#{{ index }}</pre>
	</article>
</template>

<script>
export default {
	name: 'SinglePost', 
	props: {
		post: {
			type: Array, 
			default: () => []
		}
	}
}
</script>