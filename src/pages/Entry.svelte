<script>

    import Input from "../components/Input.svelte";

    export let name
    export let create
    export let className

</script>

<div class="entry {className}">
    <div>
        <img alt="github-icon" src="./github.png">
        <div>
            <h1>How Bad Is Your GitHub Profile?</h1>
            <h4>Check urself before you wreck urself in those FAANG interviews</h4>
        </div>
    </div>
    <div>
        <p>Hello <span class="i">"{name || "stranger"}"</span> !</p>
        <Input bind:name="{name}" create={create} />
    </div>
</div>

<style>
    h1{
        font-size: 40px;
    }
    h4{
        font-weight: 400;
        font-size: 18px;
    }

    .entry {
        transition: all 1s cubic-bezier(0.39, 0.575, 0.565, 1);
        text-align: center;
        display: flex;
        flex-direction: column;
        color: black;
        background-color: white;
        border-radius: 16px;
        padding: 40px 40px;
        align-items: center;
        justify-content: space-between;
    }

    @media only screen and (max-width: 768px) {
		.entry {
			width: 100%;
            padding: 16px;
		}
	}

    .entry img{
        width: 100px;
        height: auto;
    }

    .entry p{
        font-size: 18px;
    }
    .i{
        font-style: italic;
        font-weight: 700;
    }

    .fade-out{
        transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(-200%);
	}

    .last-fade{
        transition: all .7s cubic-bezier(0.39, 0.575, 0.565, 1);
		transform: translateX(-200%);
	}
</style>
