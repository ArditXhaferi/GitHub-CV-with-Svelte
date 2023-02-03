<script>
    export let languages;
</script>

<div class="languages">
    <div class="language_info">Time spent on your top 4 technologies</div>

    {#each languages as language, i}
        <div class="language">
            {Math.round(((language[1] / 200) / 60)) + " hours on "} <b style='color: #a699bc;'>{language[0]}</b>
        </div>
    {/each}
</div>

<style>
    .language_info{
        color: #dedede;
        font-size: 12px;
        margin-bottom: 16px;
        text-align: right;
    }

    .language{
        margin-bottom: 8px;
        font-weight: bold;
        text-align: right;
    }
    .languages{
        display: flex;
        flex-direction: column;
        margin-left: auto;
    }
</style>