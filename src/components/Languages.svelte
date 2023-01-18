<script>
    export let languages;
</script>

<div class="languages">
    {#each languages as language}
        <div class="language">
            {language[0] + ": " + language[1]}
        </div>
    {/each}
</div>

<style>
    .languages{
        display: flex;
    }
</style>