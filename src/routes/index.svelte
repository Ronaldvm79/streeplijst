<script>
	import { loading, getStrepenTotaal, getStrepen, getStrepers } from '$lib/streepStore';
	
	import Strepers from '../components/Strepers.svelte';
	import NieuweStreep from '../components/nieuweStreep.svelte';

	const getData = async () => {
		$loading = true;
			await getStrepen();
			await getStrepers();
			await getStrepenTotaal();
		$loading = false;
	};



</script>

<div class="font-bold text-blue-400 flex justify-center text-lg "><h1>Streeplijst</h1></div>

{#await getData()}
.	
{:then}
	<NieuweStreep />
	<Strepers />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
