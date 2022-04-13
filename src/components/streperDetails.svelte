<script>
	export let detailsOpen = false;
	export let gebruiker;
	
	import { slide } from 'svelte/transition';
	import { strepen, setBetaald } from '$lib/streepStore';
	import { convDatum } from '$lib/utils';

	const toggleDetails = () => (detailsOpen = !detailsOpen);

	var streepDrinkerNB;
	var streepDrinkerBet;

	$: streepDrinkerNB = $strepen.filter(
		(drinker) => drinker.gebruiker == gebruiker && drinker.betaald == false
	); // filter de niet betaalde strepen 

	$: streepDrinkerBet = Object.values(
		$strepen
			.filter((drinker) => drinker.gebruiker == gebruiker && drinker.betaald == true)
			.sort((a, b) => b.id - a.id)
			.reduce(
				(r, o) => (
					r[o.betaal_datum]
						? (r[o.betaal_datum].aantal += o.aantal)
						: (r[o.betaal_datum] = { ...o }),
					r
				),
				{}
			)
	).slice(0, 5); // Groepeer / Sorteer / Filter de betaalde strepen
</script>

<div class=" ">
	<div class="flex items-center justify-between rounded-lg px-3 py-1 m-1 border-2">
		<div>
			<slot name="titel" />
		</div>
		<div>
			{gebruiker}
			<button class="btn" on:click={() => setBetaald(gebruiker)}> betaald </button>
			<button class="btn" on:click={toggleDetails}> +/- </button>
		</div>
	</div>
	{#if detailsOpen}
		<div class="bg-blue-100 m-2" transition:slide>
			
			Niet Betaald
			{#each streepDrinkerNB as drinker}
				<ul>
					<li>{drinker.aantal}</li>
				</ul>
			{/each}
			Betaald
			{#each streepDrinkerBet as drinker}
				<ul>
					<li>{drinker.aantal} - {convDatum(drinker.betaal_datum)}</li>
				</ul>
			{/each}

		</div>
	{/if}
</div>

<style>
</style>
