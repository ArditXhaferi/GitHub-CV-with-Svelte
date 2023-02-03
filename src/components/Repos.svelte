<script>
    import Rating from "./Rating.svelte";

    export let repos_list;
</script>

<div class="repos">
    <div class="repo_info">Repo stars divided by { repos_list.length == 0 ? 1 : (repos_list[0].stargazers_count/5) }</div>
    {#each repos_list as repo}
        <div class="repo">{repo.name}-{repo.stargazers_count}</div>
        <Rating rating={repo.stargazers_count/(repos_list[0].stargazers_count/5)}/>
    {/each}
</div>

<style>
    .repo_info{
        color: #dedede;
        font-size: 12px;
        margin-bottom: 16px;
    }
    .repo{
        font-weight: bold;
        margin-right: 4px;
    }
    .repos{
        margin-bottom: 16px;
    }
</style>