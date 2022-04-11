<script>
    export var aantal = 0
    var vijf
    var een
    $: vijf = Math.floor(aantal/5)
    $: een = aantal % 5
   
</script>

{#each Array(vijf) as _  }
<img src="vijf.svg" alt="vijf" />
{/each}
{#each Array(een) as _}
<img src="een.svg" alt="een" />
    {/each}

    <style>
        img {
            display: inline
        }
    </style>