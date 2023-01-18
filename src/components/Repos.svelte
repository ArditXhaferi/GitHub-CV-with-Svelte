<script>
    import Rating from "./Rating.svelte";

    export let repos_list;
</script>

<div class="repos">
    Repo stars ({ repos_list.length == 0 ? 1 : (repos_list[0].stargazers_count/5) } stars by real)
    {#each repos_list as repo}
        <div class="repo">{repo.name}-{repo.stargazers_count}</div>
        <Rating rating={repo.stargazers_count/(repos_list[0].stargazers_count/5)}/>
    {/each}
</div>

<style>


</style>