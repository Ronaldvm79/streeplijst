<script>
	import { loading, getStrepenTotaal, loadStrepen, loadUsers } from '$lib/streepStore';
	
	import Strepen from '../components/Strepen.svelte';
	import NieuweStreep from '../components/nieuweStreep.svelte';

	const getData = async () => {
		$loading = true;
		await loadStrepen();
		await loadUsers();
		await getStrepenTotaal();
		$loading = false;
	};
</script>

<div class="font-bold text-blue-400 flex justify-center text-lg ">Streeplijst</div>
{#await getData()}
	
{:then}
	<NieuweStreep />
	<Strepen />
{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}
