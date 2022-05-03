<script>
	import { strepenTotaal } from '$lib/streepStore';
	import StreperDetails from '../components/streperDetails.svelte';
	import { flip } from 'svelte/animate';
import Totaal from './Totaal.svelte';


	var asc = true;
	var totaal 

	$: totaal = $strepenTotaal.reduce((totaal,a) => totaal + a.aantal, 0   )

	const sortStrepen = () => {
		$strepenTotaal = $strepenTotaal.sort((a, b) =>
			asc ? a.aantal - b.aantal : b.aantal - a.aantal
		);
		asc = !asc;
	};
</script>



{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
	<div animate:flip>
		<StreperDetails {gebruiker} {naam_kort} {aantal} />
			<!-- <span slot="titel">{naam_kort} ({aantal}) </span> -->
		
	</div>
{/each}
{#if  totaal>0  }
<Totaal {totaal}/>
{/if}
<button on:click={() => sortStrepen()}> sort </button>

