<script>
	import { strepenTotaal } from '$lib/streepStore';
	import Details from '../components/Details.svelte';
	import { flip } from 'svelte/animate';
	import Streepjes from '../components/Streepjes.svelte';
	var asc = true;

	const sortStrepen = () => {
		$strepenTotaal = $strepenTotaal.sort((a, b) => (asc ? a.aantal - b.aantal : b.aantal - a.aantal));
		asc = !asc;
	};
</script>

{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
	<div animate:flip>
		<Details option={gebruiker}>
			<span slot="head">{naam_kort} ({aantal}) <Streepjes {aantal}/></span>

		</Details>
	</div>
{/each}

<button on:click={() => sortStrepen()}> sort </button>
