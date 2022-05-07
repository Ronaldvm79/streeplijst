<script>
	import { createEventDispatcher } from 'svelte';
	export let titel = '';
	const dispatch = createEventDispatcher();

	import { closeIcon } from '$lib/icons';
	import Icon from '../components/Icon.svelte';
</script>

<div
	class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"
>
	<div class="modal-overlay fixed w-full h-full bg-gray-900 opacity-50" />
	<div class="bg-slate-700 w-3/4 lg:h-max lg:w-2/5   mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
		<div
			class="flex justify-between items-center head bg-cyan-700 py-5 px-8 text-2xl text-zinc-100 font-bold"
		>
			{titel}
			<button
				class="p-1 bg-zinc-100 hover:bg-zinc-300 rounded-full ml-4"
				on:click={() => dispatch('close')}
			>
				<Icon d={closeIcon} class="stroke-slate-700" size="1.5em" />
			</button>
		</div>
		<div class="content p-8">
			<slot name="body" />
		</div>
	</div>
</div>
