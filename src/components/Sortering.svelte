<script>
	import { sortType, sortAsc } from '$lib/sortStore';
	import Icon from '../components/Icon.svelte';
	import { sortAantalIcon, sortNaamIcon, sortAscIcon, sortDescIcon } from '$lib/icons';

	let sortering = 'asc';
	let type = 'abc';

	$: console.log(sortering);
	$: sortType.set(type);
	$: sortAsc.set(sortering);
</script>



<div class="flex justify-start ml-2 mt-2 text-zinc-400">


	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700  rounded-full w-8 h-8 flex justify-center items-center mx-4 ">
		<input
			class="peer hidden"
			type="radio"
			bind:group={type}
			name="sort"
			value="abc"
			id="radio_a"
		/>
        
		<Icon
			d={sortNaamIcon}
			class="peer-checked:stroke-cyan-600 peer-checked:bg-slayte-700 hover:stroke-cyan-700  stroke-slate-600 bg-cyan-900 rounded-full peer-checked:rounded-full transition duration-5000 "
			size="2em"
		/>
	</label>

    <svg class="h-10 w-6 mt-2 -ml-6">
        <line x1="0" y1="100%" x2="100%" y2="0" stroke-width="3"
            class="stroke-cyan-700"/>
    </svg>
	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700  rounded-full w-8 h-8 flex justify-center items-center mx-2 mt-5 -ml-1">
		<input
			class="peer hidden"
			type="radio"
			bind:group={type}
			name="sort"
						value="123"
            id="radio_#"
		/>
		<Icon
			d={sortAantalIcon}
			class="peer-checked:stroke-cyan-600 peer-checked:bg-slate-700 hover:stroke-cyan-700  stroke-slate-600 bg-cyan-900 rounded-full peer-checked:rounded-full transition duration-5000"
			size="2em"
		/>
	</label>
	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full w-8 h-8 flex justify-center items-center mx-2 mt-2">
		<input type="checkbox" bind:group={sortering} class="peer hidden" value="asc" />
		<div class:hidden={sortering==""}><Icon
			d={sortAscIcon}
			class="hover:stroke-cyan-700  bg-cyan-900 rounded-full  stroke-cyan-600 transition duration-5000"
			size="2em"
		/></div>
		<div class:hidden={sortering=="asc"}><Icon
			d={sortDescIcon}
			class="hover:stroke-cyan-700  bg-cyan-900 rounded-full stroke-cyan-600  transition duration-5000"
			size="2em"
		/></div>
        </label>
</div>
