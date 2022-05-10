<script>
	import { loading, getStrepenTotaal, getStrepen, getStrepers, getTotalen } from '$lib/streepStore';
	
	import Strepers from '../components/Strepers.svelte';
	import NieuweStreep from '../components/nieuweStreep.svelte';
	import Toast from '../components/Toast.svelte'
	import Totalen from '../components/Totalen.svelte'
	import Payoff from '../components/Payoff.svelte';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';




	const getData = async () => {
		$loading = true;
			await getStrepen();
			await getStrepers();
			await getStrepenTotaal();
			await getTotalen()
		$loading = false;
	};

	let darkMode;
	let darkModeReady = false;
	onMount(() => {
		darkMode = document.documentElement.classList.contains('dark');
		document.body.classList.add('transition', 'ease-in-out', 'duration-500');
		darkModeReady = true;
	});



</script>
<!-- {#if darkModeReady}
		<div class="h-8 toggle" in:fade={{ duration: 800 }}>
			<input
				type="checkbox"
				id="toggle"
				bind:checked={darkMode}
				on:change={() => document.documentElement.classList.toggle('dark')}
			/>
			<label
				id="darkicon"
				title="Toggle dark mode"
				for="toggle"
				data-dark={darkMode ? '🌒' : '🌞'}
			/>
		</div>
	{/if} -->

<div class="mx-12 -rotate-12 text-transparent bg-clip-text bg-gradient-to-b  from-cyan-400 via-cyan-600 to-cyan-400 flex justify-center text-[164px] outline-4 font-playball  -translate-x-28 outline-shadow"><h1>Streeplijst</h1></div>

{#await getData()}
.	
{:then}

	<NieuweStreep />
	<Strepers />
	<Payoff />
	<Totalen />

	<Toast />

{:catch error}
	<p>Something went wrong while fetching the data:</p>
	<pre>{error}</pre>
{/await}

<!-- <style type="postcss">
		.toggle input[type='checkbox'] {
		display: none;
	}
	.toggle label {
		@apply inline-block cursor-pointer relative transition-all ease-in-out duration-300 w-12 h-6 rounded-3xl border border-solid border-gray-700 bg-yellow-100;
	}
	.toggle label::after {
		content: attr(data-dark);
		@apply flex items-center justify-center rounded-full cursor-pointer absolute top-px left-px transition-all ease-in-out duration-300 w-5 h-5 bg-transparent align-middle;
	}
	.toggle input[type='checkbox']:checked ~ label {
		@apply bg-gray-500;
	}
	.toggle input[type='checkbox']:checked ~ label::after {
		transform: translateX(24px);
	}

	.outline-shadow {
		-webkit-filter: drop-shadow(6px 6px #333);
          filter: drop-shadow(6px 6px #333);
	}

	
</style> -->


