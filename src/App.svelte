<script>
	import Contributions from "./components/Contributions.svelte";
	import Repos from "./components/Repos.svelte";
    import Languages from "./components/Languages.svelte";
    import Entry from "./pages/Entry.svelte";
	import Typewriter from 'typewriter-effect/dist/core';
	import { onMount } from 'svelte';

	let name = "";
	let entry_style = "";
	let src = "favicon.png";
	let username = "John Doe";
	let contributions = [];
	let repos_sorted = [];
	let languages_list = {};
	let languages = [];
	let sorted_languages = {};
	let repos;
	let hcolor = "a699bc";
	let type;
	let typewriter;

	onMount(async () => {
		typewriter = new Typewriter(type, {
			delay: 75,
		});
		console.log(typewriter, "test")
	});


	let jokes = {
		JavaScript:
			"Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
		Python: "What do you call a snake that works in a programming team? A Python developer.",
		Java: "Why was the Java developer sad? They didn't have any closures.",
		Ruby: "Why do Ruby developers wear glasses? Because they can't C#.",
		PHP: "Why was the PHP developer sad? Because they didn't know what the 'else' statement was for.",
		"C++": "Why do C++ developers wear glasses? Because they can't C#.",
		"C#": "Why do C# developers wear glasses? Because they can't C#.",
		TypeScript:
			"Why was the TypeScript developer sad? Because they didn't know how to 'null' their feelings.",
		Shell: "Why do Shell developers wear glasses? Because they can't C#.",
		Go: "Why was the Go developer sad? They didn't have any closures.",
		Swift: "Why do Swift developers wear glasses? Because they can't C#.",
		Kotlin: "Why was the Kotlin developer sad? They didn't have any closures.",
		Scala: "Why was the Scala developer sad? They didn't have any closures.",
		CSS: "Why was the CSS developer sad? They didn't know how to 'null' their feelings.",
		C: "Why do C developers wear glasses? Because they can't C#.",
		"Objective-C":
			"Why do Objective-C developers wear glasses? Because they can't C#.",
		Rust: "Why was the Rust developer sad? They didn't have any closures.",
		Dart: "Why do Dart developers wear glasses? Because they can't C#.",
		Elixir: "Why was the Elixir developer sad? They didn't have any closures.",
		Perl: "Why was the Perl developer sad? They didn't know what the 'else' statement was for.",
		Groovy: "Why was the Groovy developer sad? They didn't know what the 'else' statement was for.",
		"F#": "Why do F# developers wear glasses? Because they can't C#.",
		CoffeeScript:
			"Why do CoffeeScript developers wear glasses? Because they can't C#.",
		R: "Why was the R developer sad? They didn't have any closures.",
		Vue: "Why do Vue developers wear glasses? Because they can't C#.",
		Sass: "Why was the Sass developer sad? They didn't know how to 'null' their feelings.",
		Erlang: "Why was the Erlang developer sad? They didn't have any closures.",
		Julia: "Why was the Julia developer sad? They didn't have any closures.",
		HTML: "Why was the HTML developer sad? They didn't know what the 'else' statement was for.",
	};

	const githubRequest = (url, name) => {
		return new Promise((resolve, reject) => {
			fetch(url.replace("$name$", name))
				.then((response) => response.json())
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error);
				});
		});
	};

	const createCV = async () => {
		handleProfile()
		// handleContributions()
		// handleLanguages()
	};

	const handleProfile = async () => {
		repos = await githubRequest(
			`https://api.github.com/users/$name$/repos?per_page=100`,
			name
		);

		repos_sorted = repos.sort(function(a, b) {
			return b.stargazers_count - a.stargazers_count;
		}).slice(0, 3);

		if(repos.length != 0){
			src = repos[0]["owner"]["avatar_url"];
			username = repos[0]["owner"]["login"];
		}


		typeProfile()
	}

	const typeProfile = () => {
		entry_style = "fade-out";

		typewriter
			.pauseFor(1500)
			.typeString('Hello fuckface')
			.pauseFor(100)
			.deleteAll()
			.typeString(`I mean hello <b style='color: #${hcolor};'>${name}</b>, let's see if you actualy #code haha.`)
			.pauseFor(500)
			.typeString('<br><br> ' + reposAmountText())
			.pauseFor(500)
			.deleteChars(100)
			.start();
	}

	const reposAmountText = () => {
		switch(true){
			case repos.length == 0:
				return `wow you have <b style='color: #${hcolor};'> 0 public repos </b> you either hate open source or ur my mom checking out this project I shared (hi mom)`
			case repos.length > 0 && repos.length < 10:
				return `cool you have <b style='color: #${hcolor};'> ${repos.length} repositories </b> really that's all? bump that up to atleast second digits. disgraceful`
			case repos.length > 9 && repos.length < 50:
				return `Wow in the second digits impressive, you have <b style='color: #${hcolor};'> ${repos.length} public repositories. </b> Though I wonder what kind of person needs that many projects to hide their insecurities and inadequacies.`
			case repos.length > 49 && repos.length < 100:
				return `It's clear that you've put in some work with over 50 public repos, it's quite a number huh <b style='color: #${hcolor};'> (to be exact ${repos.length})</b>, but this is not enough, you need to keep pushing, don't be satisfied with mediocrity.`
			case repos.length > 99:
				return `You have an impressive number of <b style='color: #${hcolor};'>${repos.length} public repositories </b> in the hundreds, but I can't help but wonder if it's a way to compensate for something deeper and more profound that's missing in your life.`
		}
	}

	const handleContributions = async () => {
		fetch("http://localhost:3000/" + name)
				.then((response) => response.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => {
					console.log(error);
				});
	};

	const handleLanguages = async () =>{
		let top_repos = await githubRequest(
			`https://api.github.com/users/$name$/repos?per_page=100`,
			name
		);

		top_repos = top_repos.sort(function(a, b) {
			return b.stargazers_count - a.stargazers_count;
		}).slice(0, 3);

		for (const repo of top_repos){

			let languages = await githubRequest(
				`https://api.github.com/repos/$name$/`+ repo.name + `/languages`,
				name
			);

			for (const [key, value] of Object.entries(languages)) {
				if(languages_list[key] == undefined){
					languages_list[key] = value;
				}else{
					languages_list[key] += value;
				}
			}
		}

		languages = Object.entries(languages_list).sort(function(a, b) {
			return b[1] - a[1];
		});
	}

</script>

<main>
	<Entry className="{entry_style}" bind:name="{name}" create={createCV} />
	<div class="container {entry_style}">
		<div bind:this={type}>
		</div>
		<img src="./icons.png" class="icons" alt="Icons" width="35">
		<div class="export">
			<div class="profile_container">
				<img {src} alt="profile" class="profile" />
				<div class="contributions_container">
					<h2>{username}</h2>
					<Contributions contribution_list={contributions} />
				</div>
			</div>
			<Repos repos_list={repos_sorted}/>
			<Languages languages={languages} />
		</div>
	</div>
</main>

<style>
	main {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		overflow: hidden;
		padding: 50px;
		background-image: url("/pattern1.svg");
		background-size: 200px;
	}

	.icons{
		position: absolute;
		left: 12px;
		top: -17px;
	}

	.profile_container {
		display: flex;
		color: white;
	}

	h2 {
		font-weight: 800;
		font-size: 32px;
		margin: 0 0 8px 0;
	}

	.container {
		border-top: 25px solid #423d38;
		min-width: 400px;
		max-width: 400px;
		background-color: #1f1e1e;
		color: white;
		border-radius: 16px;
        padding: 40px 40px;
		display: flex;
		flex-direction: column;
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(300%);
		position: absolute;
		padding-top: 30px;
	}

	.fade-out{
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(0%);
	}

	.profile {
		width: 100px;
		height: 100px;
		border-radius: 20px;
	}

	.contributions_container {
		margin-left: 24px;
	}

	.export{
		display: none;
	}
</style>
