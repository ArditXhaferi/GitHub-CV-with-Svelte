<script>
	import Contributions from "./Contributions.svelte";

	let name = "arditxhaferi";
	let src = "favicon.png"
	let username = "John Doe"

    const githubRequest = (url, name) => {
        return new Promise((resolve, reject) => {
			fetch(url.replace("$name$", name))
				.then(data => {
					resolve(data);
				}).catch(error => {
					reject(error);
			});
        });
    };
  


	const createCV = async () => {
		let repos = await githubRequest(`https://api.github.com/users/$name$/repos`, name);
		let contributions = await githubRequest(`https://github.com/users/$name$/contributions`, name);

		
		console.log(contributions, 'TEST')
		// src = repos[0]['owner']['avatar_url']
		// username = repos[0]['owner']['login']
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
	<div class="container">
		<div class="profile_container">
			<img src="{src}" alt="profile" class="profile">
			<div class="contributions_container">
				<h2>{username}</h2>
				<Contributions />
			</div>
		</div>
	</div>
</main>

<style>

	main {
		width: 100%;
		height: 1000px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow-y: scroll;
		padding: 50px;
	}

	.profile_container{
		display: flex;
		color: white;
	}

	h2{
		font-weight: 800;
		font-size: 32px;
	}

	.container {
		width: 800px;
		height: 1000px;
		background-color: #22272D;
		border-radius: 80px;
		padding: 50px;
	}

	.profile{
		width: 200px;
		height: 200px;
		border-radius: 40px;
	}

	.contributions_container{
		margin-left: 24px;
	}
</style>