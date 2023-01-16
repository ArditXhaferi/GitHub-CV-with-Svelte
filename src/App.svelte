<script>
	let name = "arditxhaferi";

    const githubRequest = (name) => {
        return new Promise((resolve, reject) => {
			fetch(`https://api.github.com/users/${name}/repos`)
				.then(response => response.json())
				.then(data => {
					resolve(data);
				}).catch(error => {
					reject(error);
			});
        });
    };
  


	const createCV = () => {
		let data = githubRequest(name);
		console.log(name)
   		data.then((result) => {
            console.log(result, 'test');
        })
        .catch((error) => {
            console.log(error,'test');
        });
	}

	// fetch(`https://api.github.com/repos/arditxhaferi/5HQ1P/languages`)
	// 	.then(response => response.json())
	// 	.then(data => {
	// 		console.log(data);
	// 	}).catch(error => {
	// 		console.log(error);
	// 		return [];
	// 	});

		
		
</script>

<main>
	<p>Hello {name || 'stranger'}!</p>
	<input on:change={createCV} bind:value={name} placeholder="enter your name">
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>