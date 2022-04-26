<script>
	export let showDetails = false;
	export let gebruiker;
	export let naam_kort;
	export let aantal;

	import { slide } from 'svelte/transition';
	import { strepen, setBetaald, addStreep,setCurrentStreper } from '$lib/streepStore';
	import { convDatum } from '$lib/utils';
	import Icon from '../components/Icon.svelte';
	import { successIcon, euroIcon, infoIcon } from '$lib/icons';
	import Modal from '../components/Modal.svelte'
	import StrepenDetails from '../components/strepenDetails.svelte'

	const toggleDetails = () => (showDetails = !showDetails);

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

	
	$: streperDetails = Object.values(
		$strepen
			.filter((drinker) => drinker.gebruiker == gebruiker)
			.sort((a, b) => b.id - a.id)
		).slice(0, 10);
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
	</div>  Eerste Versie-->

<!-- <div class="py-2">
	
		<div class="shadow-lg flex flex-col rounded-lg mx-8 lg:flex-row">
		  <div class="bg-slate-800 lg:w-2/4  flex justify-center  text-slate-300 text-center font-bold lg:rounded-none lg:py-2 lg:px-8 lg:rounded-l-lg p-0 rounded-t-lg w-full">
			<div class="pt-2">
			  <div class="lg:text-3xl lg:block inline-block text-2xl py-3">{aantal}</div>
			  <div class="lg:text-base lg:block inline-block text-2xl"><Streepjes {aantal}/></div>
			</div>
		  </div>
	
		  <div class="flex lg:flex-row flex-col justify-center lg:justify-between lg:space-around w-full lg:w-screen text-center">
		  <div class="flex flex-col justify-top px-6">
			<h3 class="text-xl mt-6 mb-2 uppercase text-cyan-700 lg:">{naam_kort}</h3>
	
	
			{#if streepVerschil > 1}
			<div class="bg-red-200 flex items-center justify-center w-20 p-1 rounded-2xl my-3 text-xs">
				
				Wanbetaler
			
			</div>
			{/if} -->
<!-- <button class="btn" on:click={() => setBetaald(gebruiker, naam_kort)}> betaald </button> -->

<!-- 			
		  </div>
		  <div class="flex justify-end items-end pr-2 pb-1" on:click={toggleDetails}>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
			<div class='h-2 w-2 m-0.5 bg-slate-700 rounded full'>	 </div>
		</div>

		</div>
		
		</div> Tweede Versie -->

<div
	class="grid overflow-hidden grid-cols-[120px_minmax(0,1fr)_minmax(0,1fr)_110px] grid-rows-[60px_40px_10px]  mx-8 mt-2 bg-slate-700 hover:bg-slate-600 " on:click={()=>setCurrentStreper(naam_kort)}
>
	<div
		class="box row-span-2 border-cyan-500 border-l-8 flex flex-col items-center justify-center"
	>
		<div class="flex font-extrabold text-4xl text-zinc-100 items-center justify-center">
			<div
				class="flex items-center justify-center rounded-full w-4  h-4  text-zinc-400 hover:text-zinc-100 transition duration-500 border-zinc-400 hover:border-zinc-100 hover:border-2 text-base mr-1 mt-1 "
				on:click|stopPropagation={() => addStreep(-1, gebruiker, naam_kort, 'CORR')}	>
				<span class="-translate-y-0.5">-</span>
			</div>

			{aantal}
			<div
				class="flex items-center justify-center rounded-full w-4  h-4 text-zinc-400 hover:text-zinc-100 transition duration-500 border-zinc-400 hover:border-zinc-100  hover:border-2 text-base ml-1 mt-1 "
				on:click|stopPropagation={() => addStreep(1, gebruiker, naam_kort, 'ADD')}
			>
				<span class="-translate-y-0.5">+</span>
			</div>
		</div>
		<div class="flex text-base italic text-zinc-500">
			{#if aantal == 1} streep {:else} strepen {/if}
		</div>
	</div>
	<div
		class="box col-start-2 col-span-1 text-3xl uppercase text-zinc-100 pt-3 px-4 font-semibold"
	>
		{naam_kort}
	</div>
	<div class="box col-start-2 col-span-2  px-4 -translate-y-2">
		{#if streepVerschil > 1}
			<div
				class="bg-red-200 text-slate-700 flex items-center justify-center w-20 p-1 rounded-2xl my-3 text-xs px-4  "
			>
				Wanbetaler
			</div>
		{/if}
	</div>
	<div class="box col-span-4 border-slate-500 border-b-2" />
	<div
		class="box row-start-1 row-end-3 col-start-4 flex flex-col justify-center items-center text-2xl font-bold text-zinc-100"
	>
		€ {aantal.toFixed(2)}
		<div class="flex flex-row pt-1">
			<div on:click|stopPropagation={() => setBetaald(gebruiker, naam_kort, aantal, 'BET')}>
				<Icon
					d={successIcon}
					class="hover:text-green-600 transition duration-500 text-zinc-400"
					stroke="currentColor"
					size="1.5em"
				/>
			</div>
			<div  on:click|stopPropagation={toggleDetails}>
			<Icon
				d={infoIcon}
				class="hover:text-blue-600 transition duration-500 text-zinc-400"
				stroke="currentColor"
				size="1.5em"
			/>
		</div>
			<Icon
				d={euroIcon}
				class="hover:text-cyan-500 transition duration-500 text-zinc-400"
				stroke="currentColor"
				size="1.5em"
			/>
		</div>
	</div>
	<div class="box row-start-1 col-start-3" />
</div>

<!-- {#if detailsOpen}
	<div class="bg-blue-100 m-2" transition:slide>
		Niet Betaald
		{#each streepDrinkerNB as drinker}
			<ul>
				<li>{drinker.aantal} {convDatum(drinker.created_at)}</li>
			</ul>
		{/each}
		Betaald
		{#each streepDrinkerBet as drinker}
			<ul>
				<li>{drinker.aantal} - {drinker.betaal_datum}</li>
			</ul>
		{/each}
		{#each streepStreper as drinker}
		<ul>
			<li>{drinker.aantal} {convDatum(drinker.created_at)}</li>
		</ul>
		{/each}
	</div>
{/if} -->

{#if showDetails}
	<Modal on:close={() => toggleDetails()} titel="Streep Details">
		<div slot="body"><StrepenDetails {streperDetails} {gebruiker} on:close={() => toggleDetails()} /></div>
	</Modal>
{/if}


<style>
</style>
