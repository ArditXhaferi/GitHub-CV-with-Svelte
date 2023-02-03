<script>
    export let rating;
</script>

<div class="stars" style="--rating: {rating || 0};" aria-label="Rating of this product is {rating || 0} out of 5."></div>

<style>

    :root {
        --star-size: 30px;
        --star-color: #fff;
        --star-background: #a699bc;
    }

    .stars {
        --percent: calc(var(--rating) / 5 * 100%);
        display: inline-block;
        font-size: var(--star-size);
        font-family: Times;
        line-height: 1;
        margin-bottom: 8px;
    }

    .stars::before {
        content: "★★★★★";
        letter-spacing: 3px;
        background: linear-gradient(
            90deg,
            var(--star-background) var(--percent),
            var(--star-color) var(--percent)
        );
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
</style>
