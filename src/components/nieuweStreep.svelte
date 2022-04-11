<script>
import { drinkers, addStreep}  from '$lib/streepStore';
import Modal from './Modal.svelte';

var drinker = '';
var drankjes = 1;
var drinkerId
var drinkerBekend = false
var showNieuweDrinker = false
var naamKleur = "bg-white"

const getDrinker = () => {
    var obj = $drinkers.find((o) => o.naam_kort.toLowerCase() === drinker.toLowerCase());
    obj ?  drinkerBekend = true : drinkerBekend = false;
    drinkerId = obj.id
    console.log(obj)
     
    //drinker = '';
};

const addNieuwDrinker = () => {
    showNieuweDrinker = !showNieuweDrinker
  }

const checkStreep = () => {
    drinkerBekend ? 
        addStreep(drankjes, drinkerId) : alert("onbekende drinker")
        drinker = ''
        drinkerBekend = false
        
    }
  

</script>

<div class="flex m-1">
    
    <input list="drinkers" placeholder="Vul een naam " bind:value={drinker} class="border-2 rounded-lg p-2 " class:bg-rose-100={!drinkerBekend && drinker!==''} class:bg-green-100={drinkerBekend} class:bg-white={drinker==''} on:input={() => getDrinker()}/>
    <datalist id="drinkers">
        {#each $drinkers as { naam_kort, id }}
            <option>{naam_kort}</option>
        {/each}
    </datalist>

    <select bind:value={drankjes} class="border-2 rounded-lg p-2 ml-1">
        {#each Array(3) as _, i}
            <option value={i + 1}>{i + 1}</option>
        {/each}
    </select>
    <button class="btn" disabled={drinker == ''} on:click={() => checkStreep()}>Streep</button>
    {#if !drinkerBekend && drinker !== ''}
    <button class="btn" on:click={() => addNieuwDrinker()}>Nieuwe Drinker!</button>
    {/if}
</div>


{#if showNieuweDrinker}
<Modal on:close={() => addNieuwDrinker()}  title="Nieuwe Drinker" />
{/if}
