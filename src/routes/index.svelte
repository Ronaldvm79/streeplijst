
<script>
import supabase from '$lib/db'
import { onMount } from 'svelte';
import { loading, strepen, loadTodos } from '$lib/streepStore'
import { flip } from 'svelte/animate';

 var asc = true
// async function getData() {
//   const { data, error } = await supabase
//     .from('strepen')
//     .select(`id,aantal, betaald, gebruiker (naam_kort) `)
   
//   if (error) throw new Error(error.message)
  
//   return data
// }

onMount(async () => {
    

    await loadTodos()
    
    
})

async function setBetaald(id,betaald) {
    
    const { error} = await supabase
  .from('strepen')
  .update({'betaald': !betaald})
  //.eq('id', id)
    .match({id})
    
  if(error){
   console.log(error)}
   strepen.update(($strepen) => {
		let index = -1;
		for (let i = 0; i < $strepen.length; i++) {
			if ($strepen[i].id === id) {
				index = i;
				break;
			}
		}
		if (index !== -1) {
			$strepen[index].betaald = !$strepen[index].betaald;
		}
    console.log($strepen)
    return $strepen
    

})
}

const sortStrepen= () => {

  $strepen = ($strepen.sort((a,b) => asc ? a.aantal-b.aantal : b.aantal-a.aantal))
  asc = !asc
}

</script>

{#if $loading}
    loading!

{:else}


 <!-- {#await getData()}
  <p>Fetching data...</p>
  {:then data} -->
  {#each $strepen as {id, aantal, betaald, gebruiker : {naam_kort}}(id)}
    <div animate:flip>
    {#if !betaald}
      <li>{id} {naam_kort}</li><button on:click={()=> setBetaald(id,betaald)}> betaald </button>{aantal} {betaald}
      {/if}
  </div>
  {/each}
 {/if} 

 <button on:click={()=>sortStrepen()}> sort </button>
<!-- {:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await} -->