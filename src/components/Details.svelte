<script>
	export let open = false;
	export let option;
	import { slide } from 'svelte/transition';
	import { drinkers, strepen, setBetaald } from '$lib/streepStore';
	const handleClick = () => (open = !open);

	var streepDrinkerNB;
	var streepDrinkerBet;

	$: streepDrinkerNB = $strepen.filter(
		(drinker) => drinker.gebruiker == option && drinker.betaald == false
	);
	$: streepDrinkerBet = $strepen.filter(
		(drinker) => drinker.gebruiker == option && drinker.betaald == true
	);
</script>

<div class="accordion">
	<div class="header">
		<div class="text">
			<slot name="head" />
		</div>
		<button on:click={() => setBetaald(option)}> betaald </button>
		<button on:click={handleClick}> +/- </button>
	</div>

	{#if open}
		<div class="details" transition:slide>
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
					<li>{drinker.aantal}</li>
				</ul>
			{/each}
			<slot name="details">
				<!-- {option} -->
				<!-- {streepDrinker.length} -->
			</slot>
		</div>
	{/if}
</div>

<style>
	div.accordion {
		margin: 1rem 0;
	}

	div.header {
		display: flex;
		width: 100%;
	}

	div.header .text {
		flex: 1;
		margin-right: 5px;
	}

	div.details {
		background-color: #cecece;
		padding: 1rem;
	}
</style>
