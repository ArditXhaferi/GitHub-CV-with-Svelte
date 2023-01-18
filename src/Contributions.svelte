<script>
    export let contribution_list;
    let colors = [
        "#f1eef4",
        "#c5bbd4",
        "#9a87b4",
        "#6e5494",
        "#584376"
    ]
</script>

<div class="contributions">
    {#each contribution_list as contribution}
        <div style="background-color: {colors[contribution.intensity]};" class="contribution"></div>
    {/each}
</div>

<style>

    .contributions{
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        grid-gap: 10px;
    }

    .contribution{
        width: 20px;
        height: 20px;
        border-radius: 4px;
        background-color: aliceblue;
    }

</style>