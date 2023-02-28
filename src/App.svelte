<script>
	import Contributions from "./components/Contributions.svelte";
	import Repos from "./components/Repos.svelte";
    import Languages from "./components/Languages.svelte";
    import Entry from "./pages/Entry.svelte";
	import Typewriter from 'typewriter-effect/dist/core';
	import { onMount } from 'svelte';
	import html2canvas from 'html2canvas';

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
	let export_this;
	let error = "";

	onMount(async () => {
		typewriter = new Typewriter(type, {
			delay: 40,
			loop: false
		});
	});


	let jokes = {
		javascript:
			"Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
		python: "What do you call a snake that works in a programming team? A Python developer.",
		java: "Why was the Java developer sad? They didn't have any closures.",
		ruby: "What kind of girl would a Rails guy date? A fat model.",
		php: "Why was the PHP developer sad? Because he was old as fuck.",
		"c++": "Why do C++ developers wear glasses? Because they can't C#.",
		"c#": "Why do C# developers wear glasses? Because they can't C#.",
		typescript: "Your favorite technology is TypeScript, yet all this just to make 90% of your code to be any",
		go: "Why was the Go developer sad? Because it has a ugly ass mascot.",
		swift: "Why do Swift developer sad? Because they couldn't afford a M1 macbook.",
		css: "Why was the CSS developer sad? Because it isn't even a programming language.",
		c: "Why do C developers wear glasses? Because they can't C#.",
		"objective-c":
			"Why do Objective-C developers wear glasses? Because they can't C#.",
		rust: "Why was the Rust developer sad? They didn't have any closures.",
		perl: "Why was the Perl developer sad? Because they are unable to read any of their fucking code.",
		coffeescript: "Why are CoffeeScript developers hyped? Because of the cocaine abuse.",
		vue: "Why was the Vue developer happy? Because Vue is way better than React.",
		html: "HTML?!, your most used techonlogy really? you pagan.",
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
		handleContributions()
		handleLanguages()
	};

	const handleProfile = async () => {
		repos = await githubRequest(
			`https://api.github.com/users/$name$/repos?per_page=100`,
			name
		);


		if(repos.message === 'Not Found' || repos.length == 0){
			error = `Sorry, can't find user: "` + name + '", or not enough data available.';
		}

		repos_sorted = repos.sort(function(a, b) {
			return b.stargazers_count - a.stargazers_count;
		}).slice(0, 3);

		if(repos.length != 0){
			src = repos[0]["owner"]["avatar_url"];
			username = repos[0]["owner"]["login"];
		}

		if(repos.message != 'Not Found' || repos.length == 0){
			typeProfile()
		}
	}

	function end(){
		entry_style = "last-fade"
	}

	const typeProfile = async () => {
		entry_style = "fade-out";

		let contributions_text =  await contributionsText();
		let languageCurrentText = await languageText();
		let repos_text = "<br><br>Let's have a look at your idiotic open source projects that shouldn't even exist.<br><br>" + reposAmountText();
		typewriter
			.pauseFor(200)
			.typeString('Hello fuckface')
			.pauseFor(200)
			.deleteAll()
			.typeString(`I mean hello <b style='color: #${hcolor};'>${name}</b>, let's see if you actualy #code haha.`)
			.pauseFor(500)
			.typeString(repos_text)
			.pauseFor(500)
			.typeString(contributions_text)
			.pauseFor(1000)
			.typeString(`<br><br> Now let's check out ur favorite technology. Oh ${languageCurrentText[0]} a connoisseur choice. <br><br>Here is a joke for you: `)
			.pauseFor(500)
			.typeString(languageCurrentText[1])
			.pauseFor(500)
			.typeString("<br><br> Sorry for cursing to much and being mean here is a nice graphic if you want to share it with your friends ... but we both know you don't have any.")
			.pauseFor(1000)
			.typeString("<br><br> loading...")
			.pauseFor(1000)
			.callFunction(end)
			.start()
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

	const contributionsText = async () => {
		let textToReturn = "<br><br> Let's review your contributions for the last month. <br><br>";

		let latest_contributions = await githubRequest(
			`https://github-contributions-gold.vercel.app/api/contributions?username=$name$`,
			name
		);

		let streakOfnotPushing = 0;

		latest_contributions.every(latest_contribution => {
			if(latest_contribution.count != 0){
				return false;
			}

			streakOfnotPushing++;
			return true;
		});

		let amount = 0;

		latest_contributions.forEach(latest_contribution => {
			amount += latest_contribution.count
		});

		if(streakOfnotPushing == 0){
			textToReturn += "Wow you pushed code today, okay you nerd";
		}
		if(streakOfnotPushing == 1){
			textToReturn += "Wow you pushed code yesterday, okay you nerd";
		}
		if(streakOfnotPushing == 2){
			textToReturn += "Hmm you didn't push code yesterday or the day before that ... fraud";
		}
		if(streakOfnotPushing > 2 && streakOfnotPushing < 10){
			textToReturn += `${streakOfnotPushing} is the number of days you didn't push code, how are you able to look into your mother's eyes like this?`;
		}
		if(streakOfnotPushing > 9 && streakOfnotPushing < 25){
			textToReturn += `It's been weeks since you didn't push code bruh, <b style='color: #${hcolor};'>(to be precise: ${streakOfnotPushing} days)</b>, get back into it you dumbfuck.`;
		}
		if(streakOfnotPushing > 24 && streakOfnotPushing != latest_contributions.length){
			textToReturn += `Almost a fucking month without contributions, a whole ${streakOfnotPushing} days without pushing anything, why are you even on this app? just close it right now.`;
		}
		if(streakOfnotPushing == latest_contributions.length){
			textToReturn += `A whole month doing jack shit, I'm just dissapointed in you. You had ${latest_contributions.length} days to push anything but yet you chose to do fuckall`
		}

		textToReturn += `<br><br> But besides that good job for <b style='color: #${hcolor};'> ${amount} contributions last month </b>, amazing really.`;

		return textToReturn
	}

	const handleContributions = async () => {
		fetch("https://github-contributions-gold.vercel.app/api/contributions?username=" + name)
			.then((response) => response.json())
			.then((data) => {
				contributions = data;
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
		}).slice(0, 4);


		return languages[0][0];
	}

	const languageText = async () => {
		let language = await handleLanguages(); 

		return [language, jokes[language.toLowerCase()]]
	}

</script>

<main bind:this={export_this}>
	<Entry className="{entry_style}" bind:name="{name}" create={createCV} error="{error}" />
	<div class="container text {entry_style}">
		<div class="text-box">
			<div bind:this={type}>
			</div>
		</div>
		<img src="./icons.png" class="icons" alt="Icons" width="35">
	</div>
	<div class="container export {entry_style}">
		<div class="img-container">
			<img src="./icons.png" class="icons" alt="Icons" width="35">
		</div>
		<div class="export">
			<div class="profile_container">
				<img {src} alt="profile" class="profile" />
				<div class="contributions_container">
					<h2>{username}</h2>
					<p class="contributions_info">You last month of suffering</p>
					<Contributions contribution_list={contributions} />
				</div>
			</div>
			<div class="repo_lan_con">
				<Repos repos_list={repos_sorted}/>
				<Languages languages={languages} />
			</div>
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
		height: 100vh;
	}

	.text-box{
		overflow-y: auto;
		display: flex;
		flex-direction: column-reverse;
	}

	.contributions_info{
		color: #dedede;
        font-size: 12px;
        margin: 0 0 8px 0;
	}

	.icons{
		position: absolute;
		left: 12px;
		top: -17px;
	}

	.profile_container {
		display: flex;
		color: white;
		margin-bottom: 20px;
		justify-content: space-between;
		flex-direction: row-reverse;
	}

	.repo_lan_con{
		display: flex;
    	justify-content: space-between;
		flex-wrap: wrap;
	}

	h2 {
		font-weight: 800;
		font-size: 32px;
		margin: 0;
	}

	.container {
		border-top: 25px solid #423d38;
		max-height: 80vh;
		width: 50%;
		background-color: #1f1e1e;
		color: white;
		border-radius: 16px;
        padding: 30px 40px 40px 40px;
		display: flex;
		flex-direction: column;
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(100vw);
		position: absolute;
	}

	.text.fade-out{
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(0%);
	}

	.text.last-fade{
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(-200%);
	}

	.export.last-fade{
		transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(0%);
	}

	.profile {
		width: 100px;
		height: 100px;
		border-radius: 20px;
	}

	@media only screen and (max-width: 768px) {
		.container {
			width: 80%;
			padding: 16px;
		}
		.export.container {
			width: 80%;
			padding: 16px;
		}
	}
	
</style>
