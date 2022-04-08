<script>
	import { loading, strepen, drinkers, loadStrepen, loadUsers, setBetaald } from '$lib/streepStore';
	import { flip } from 'svelte/animate';
	
  var asc = true;
	
 const getData = async() => {
	$loading = true	
    await loadStrepen();
		await loadUsers();
  $loading = false
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
		{#each $drinkers as {naam_kort}}
			<option>{naam_kort}</option>
		{/each}
	</datalist>

	{#each $strepen as { id, aantal, betaald, gebruiker: { naam_kort } } (id)}
		<div animate:flip>
			<li>{id} {naam_kort}</li>
			<button on:click={() => setBetaald(id, betaald)}> betaald </button>{aantal}
			{betaald}
		</div>
	{/each}

	<button on:click={() => sortStrepen()}> sort </button>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
