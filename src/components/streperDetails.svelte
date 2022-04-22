<script>
	export let detailsOpen = false;
	export let gebruiker;
	export let naam_kort;
	export let aantal;

	import { slide } from 'svelte/transition';
	import { strepen, setBetaald } from '$lib/streepStore';
	import { convDatum } from '$lib/utils';
	import Streepjes from '../components/Streepjes.svelte';

	const toggleDetails = () => (detailsOpen = !detailsOpen);

	var streepDrinkerNB;
	var streepDrinkerBet;
	var streepOudste;
	var streepVerschil;

	$: streepDrinkerNB = $strepen.filter(
		(drinker) => drinker.gebruiker == gebruiker && drinker.betaald == false
	); // filter de niet betaalde strepen

	$: streepOudste =
		Object.keys(streepDrinkerNB).length !== 0
			? streepDrinkerNB.reduce((acc, cur) =>
					!acc.created_at ||
					(cur.created_at &&
						new Date(cur.created_at).getTime() < new Date(acc.created_at).getTime())
						? cur
						: acc
			  )
			: ''; // bepaal oudste niet gestreepte streepje (extra check op bestaan van Object - anders reduce error)
	$: streepVerschil = (Date.now() - Date.parse(streepOudste.created_at)) / (1000 * 60 * 60 * 24); // check het verschil tussen het oudste streepje en de huidige tijd

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

<!-- <div class=" ">
	<div class="flex items-center justify-between rounded-lg px-3 py-1 m-1 border-2">
		<div class="flex font">
			<slot name="titel" class="font-catamaran"/>
			{#if streepVerschil > 1}
				<div class="text-xs mb-2 ml-2 px-2 bg-red-200 text-red-800 rounded-full">Wanbetaler</div>
			{/if}
			<Streepjes {aantal} />
		</div>
		<div>
			{gebruiker}
			<button class="btn" on:click={() => setBetaald(gebruiker, naam_kort)}> betaald </button>
			<button class="btn" on:click={toggleDetails}> +/- </button>
		</div>
	</div> -->

	<div class="py-2">
	
		<div class="shadow-lg flex flex-col rounded-lg mx-8 lg:flex-row">
		  <div class="bg-slate-800 lg:w-40  flex justify-center  text-slate-300 text-center font-bold lg:rounded-none lg:py-2 lg:px-8 lg:rounded-l-lg p-0 rounded-t-lg w-full">
			<div class="pt-2">
			  <div class="lg:text-5xl lg:block inline-block text-2xl py-3">{aantal}</div>
			  <div class="lg:text-base lg:block inline-block text-2xl"><Streepjes {aantal}/></div>
			</div>
		  </div>
	
		  <div class="flex lg:flex-row flex-col justify-center lg:justify-between lg:space-around w-full lg:w-96 text-center">
		  <div class="flex flex-col justify-top px-6">
			<h3 class="text-2xl mt-6 mb-2 uppercase text-cyan-700 lg:">{naam_kort}</h3>
	
	
			{#if streepVerschil > 1}
			<div class="bg-red-200 flex items-center justify-center w-20 p-1 rounded-2xl my-6 text-xs">
				
				Wanbetaler
			
			</div>
			{/if}
			<!-- <button class="btn" on:click={() => setBetaald(gebruiker, naam_kort)}> betaald </button> -->
		
			
		  </div>
		  <div class="flex justify-end items-end pr-2 pb-1" on:click={toggleDetails}>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
		</div>

		</div>
		
		</div>








	{#if detailsOpen}
		<div class="bg-blue-100 m-2" transition:slide>
			Niet Betaald
			{#each streepDrinkerNB as drinker}
				<ul>
					<li>{drinker.aantal} {drinker.created_at}</li>
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
