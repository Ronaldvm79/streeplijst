<script>
    export var aantal = 0
    var vijf
    var een
    $: vijf = Math.floor(aantal/5)
    $: een = aantal % 5
   
</script>

{#each Array(vijf) as _  }
<img class="fill-white" src="vijf.svg" alt="vijf" />
{/each}
{#each Array(een) as _}
<img class="fill-white" src="een.svg" alt="een" />
    {/each}

    <style>
        img {
            display: inline;
            filter: invert(87%) sepia(15%) saturate(201%) hue-rotate(174deg) brightness(104%) contrast(77%);
        }
    </style>