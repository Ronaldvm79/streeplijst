<script>
	import supabase from '$lib/db';
	import { onMount } from 'svelte';
	import { loading, strepen, drinkers, loadStrepen, loadUsers, setBetaald } from '$lib/streepStore';
	import { flip } from 'svelte/animate';
	var asc = true;

	async function getData() {
		await loadStrepen();
		await loadUsers();
	}



	const sortStrepen = () => {
		$strepen = $strepen.sort((a, b) => (asc ? a.aantal - b.aantal : b.aantal - a.aantal));
		asc = !asc;
	};
</script>

{#await getData()}
	loading
{:then}
	<input list="drinkers" />
	<datalist id="drinkers">
		{#each $drinkers as d}
			<option>{d.naam_kort}</option>
		{/each}
	</datalist>

	<!-- {#each $strepen as streep}
{streep.gebruiker}
{/each} -->
	<!-- {#await getData()}
  <p>Fetching data...</p>
  {:then data} -->

	{#each $strepen as { id, aantal, betaald, gebruiker: { naam_kort } } (id)}
		<div animate:flip>
			<!-- {#if !betaald} -->
			<li>{id} {naam_kort}</li>
			<button on:click={() => setBetaald(id, betaald)}> betaald </button>{aantal}
			{betaald}
			<!-- {/if} -->
		</div>
	{/each}
{/await}

<button on:click={() => sortStrepen()}> sort </button>
<!-- {:catch error}
  <p>Something went wrong while fetching the data:</p>
  <pre>{error}</pre>
{/await} -->
