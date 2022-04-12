<script>
	export let open = false;
	export let option;
	import { slide } from 'svelte/transition';
	import { strepen, setBetaald, drinkers } from '$lib/streepStore';
	import { convDatum } from '$lib/utils';

	var result;

	const handleClick = () => (open = !open);

	var streepDrinkerNB;
	var streepDrinkerBet;

	$: streepDrinkerNB = $strepen.filter(
		(drinker) => drinker.gebruiker == option && drinker.betaald == false
	);
	// $: streepDrinkerBet = $strepen.filter(
	// 	(drinker) => drinker.gebruiker == option && drinker.betaald == true
	// ).sort((a,b)=>b.id-a.id).slice(0,5);
	$: streepDrinkerBet = Object.values(
		$strepen
			.filter((drinker) => drinker.gebruiker == option && drinker.betaald == true)
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
	).slice(0, 5);
</script>

<div class=" ">
	<div class="flex items-center justify-between rounded-lg px-3 py-1 m-1 border-2">
		<div>
			<slot name="head" />
		</div>
		<div>
			<button class="btn" on:click={() => setBetaald(option)}> betaald </button>
			<button class="btn" on:click={handleClick}> +/- </button>
		</div>
	</div>
	{#if open}
		<div class="bg-blue-100 m-2" transition:slide>
			<!-- {JSON.stringify(streepDrinker)}  -->
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
