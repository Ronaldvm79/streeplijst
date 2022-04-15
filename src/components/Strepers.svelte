<script>
	import { strepenTotaal } from '$lib/streepStore';
	import StreperDetails from '../components/streperDetails.svelte';
	import { flip } from 'svelte/animate';
	import Streepjes from '../components/Streepjes.svelte';
	var asc = true;

	const sortStrepen = () => {
		$strepenTotaal = $strepenTotaal.sort((a, b) =>
			asc ? a.aantal - b.aantal : b.aantal - a.aantal
		);
		asc = !asc;
	};
</script>

{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
	<div animate:flip>
		<StreperDetails {gebruiker} {naam_kort} {aantal}>
			<span slot="titel">{naam_kort} ({aantal}) </span>
		</StreperDetails>
	</div>
{/each}

<button on:click={() => sortStrepen()}> sort </button>
