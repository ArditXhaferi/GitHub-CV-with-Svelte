<script>
    export let name = ''
    export let create;
</script>

<form class="inputWithButton" on:submit|preventDefault={create()}>
    <div class="item">
        <input
            bind:value={name}
            class="searchInpt"
            type="text"
            placeholder="Github Username"
        />
    </div>
    <div class="item">
        <button 
            on:click={create()}
            class="btnSearch">
            Check urself
            <i class="icon">
                <svg
                    width="14"
                    height="9"
                    viewBox="0 0 14 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0 3.76172H10.6172L7.94531 1.05469L9 0L13.5 4.5L9 9L7.94531 7.94531L10.6172 5.23828H0V3.76172Z"
                        fill="white"
                    />
                </svg>
            </i>
        </button>
    </div>
</form>

<style>
    .inputWithButton {
        background-color: #fff;
        display: flex;
        border: 1px solid #b5b5b5;
        border-radius: 5px;
        align-items: center;
        overflow: hidden;
        max-width: 400px;
        width: 100%;
    }
    .searchInpt {
        height: 100%;
        width: 100%;
        border: none;
        padding: 0 50px 0 20px;
        color: #6a6a6a;
        font-size: 16px;
        line-height: 20px;
        font-weight: 400;
        margin: 0;
    }
    
    .searchInpt:focus {
        outline: none;
    }
    
    .btnSearch {
        margin: 10px;
        border: none;
        padding: 10px 15px;
        cursor: pointer;
        border-radius: 5px;
        color: #ffffff;
        font-size: 13px;
        line-height: 20px;
        display: inline-flex;
        align-items: center;
        justify-content: space-between;
        background-color: #6a5590;
    }
    
    .btnSearch .icon {
        margin-left: 10px;
        display: inline-flex;
    }

    .item:first-child {
        flex-grow: 1;
    }
</style>
