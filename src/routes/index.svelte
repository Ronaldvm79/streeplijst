
<script>
import supabase from '$lib/db'
import { onMount } from 'svelte';
import { loading, strepen, loadTodos } from '$lib/streepStore'

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

}

</script>

{#if $loading}
    loading!

{:else}


 <!-- {#await getData()}
  <p>Fetching data...</p>
  {:then data} -->
  {#each $strepen as {id, aantal, betaald, gebruiker : {naam_kort}}}
    
    <li>{id} {naam_kort}</li><button on:click={()=> setBetaald(id,betaald)}> betaald </button>{aantal} {betaald}
  {/each}
 {/if} 
<!-- {:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await} -->