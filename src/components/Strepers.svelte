<script>
	import { strepenTotaal } from '$lib/streepStore';
	import Sortering from './Sortering.svelte';
	import StreperDetails from '../components/streperDetails.svelte';

	import { flip } from 'svelte/animate';
	import Totaal from './Totaal.svelte';
	import { sortType, sortAsc } from '$lib/sortStore';
	import { sortStrepen } from '$lib/utils';

	$: console.log($sortType);
	$: sortStrepen($sortAsc, $sortType);

	var totaal;

	$: totaal = $strepenTotaal.reduce((totaal, a) => totaal + a.aantal, 0);

	// const sortStrepen = (volgorde, type) => {
	// 	if (type == 'abc') {
	// 		console.log(type)
	// 	$strepenTotaal = $strepenTotaal.sort((a, b) =>
	// 		volgorde == "asc" ? a.naam_kort.localeCompare(b.naam_kort) : -1*a.naam_kort.localeCompare(b.naam_kort)
	// 	);}
	// 	else {
	// 	$strepenTotaal = $strepenTotaal.sort((a, b) =>
	// 		volgorde == "asc" ? a.aantal - b.aantal : b.aantal - a.aantal
	// 	);}

	//	};
</script>

{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
	<div animate:flip>
		<StreperDetails {gebruiker} {naam_kort} {aantal} />
		<!-- <span slot="titel">{naam_kort} ({aantal}) </span> -->
	</div>
{/each}
{#if totaal > 0}
	<Totaal {totaal} />
{/if}


<!-- <Sortering /> -->

