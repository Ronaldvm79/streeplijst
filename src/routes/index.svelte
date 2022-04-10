<script>
	import {
		loading,
		strepen,
		drinkers,
		strepenTotaal,
		getStrepenTotaal,
		loadStrepen,
		loadUsers,
		addStreep
	} from '$lib/streepStore';
	import { flip } from 'svelte/animate';
	import Details from '../components/Details.svelte';

	var asc = true;
	var drinker = '';
	var drankjes = 1;

	const getData = async () => {
		$loading = true;
			await loadStrepen();
			await loadUsers();
			await getStrepenTotaal();
		$loading = false;
	};

	const sortStrepen = () => {
		$strepen = $strepen.sort((a, b) => (asc ? a.aantal - b.aantal : b.aantal - a.aantal));
		asc = !asc;
	};

	const getDrinker = () => {
		let obj = $drinkers.find((o) => o.naam_kort === drinker);
		addStreep(drankjes, obj.id);
		drinker = '';
	};
</script>

{#await getData()}
	loading
{:then}
	<input list="drinkers" bind:value={drinker} />
	<datalist id="drinkers">
		{#each $drinkers as { naam_kort, id }}
			<option>{naam_kort}</option>
		{/each}
	</datalist>

	<select bind:value={drankjes}>
		{#each Array(3) as _, i}
			<option value={i + 1}>{i + 1}</option>
		{/each}
	</select>
	<button disabled={drinker == ''} on:click={() => getDrinker()}>Add</button>

	{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
		<div animate:flip>
			<Details option={gebruiker}>
				<span slot="head">{naam_kort} ({aantal})</span>
				<div slot="details">
					<!-- <button on:click={() => setBetaald(id, betaald)}> betaald </button> -->

					<!-- {betaald} -->
				</div>
			</Details>
		</div>
	{/each}

	<button on:click={() => sortStrepen()}> sort </button>
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
