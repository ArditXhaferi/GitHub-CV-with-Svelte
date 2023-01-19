<script>

    import Input from "../components/Input.svelte";

</script>

<div class="entry">
    <div>
        <img src="./github.png">
        <div>
            <h1>How Bad Is Your GitHub Profile?</h1>
            <h4>Check urself before you wreck urself in those FAANG interviews</h4>
        </div>
    </div>
    <Input />
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
        text-align: center;
        display: flex;
        height: 100%;
        flex-direction: column;
        color: black;
        background-color: white;
        border-radius: 16px;
        padding: 40px 40px;
        align-items: center;
        justify-content: space-between;
    }

    .entry img{
        width: 100px;
        height: auto;
    }
</style>
