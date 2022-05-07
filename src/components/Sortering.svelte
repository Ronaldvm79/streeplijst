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



<div class="flex justify-center text-zinc-400">


	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-l-none rounded-r-2xl w-12 h-12 flex justify-center items-center mx-2">
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
			class="peer-checked:stroke-zinc-100 hover:stroke-cyan-700  stroke-zinc-400  transition duration-5000"
			size="2.5em"
		/>
	</label>
	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-r-none rounded-l-2xl w-12 h-12 flex justify-center items-center -ml-3">
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
			class="peer-checked:stroke-zinc-100 hover:stroke-cyan-700  stroke-zinc-400 transition duration-500 "
			size="2.5em"
		/>
	</label>
	<label class="bg-gradient-to-br from-cyan-600 to-cyan-700 rounded-full w-12 h-12 flex justify-center items-center mx-2">
		<input type="checkbox" bind:group={sortering} class="peer hidden" value="asc" />
		<div class:hidden={sortering==""}><Icon
			d={sortAscIcon}
			class="hover:stroke-blue-600  stroke-white  transition duration-5000"
			size="2.5em"
		/></div>
		<div class:hidden={sortering=="asc"}><Icon
			d={sortDescIcon}
			class="hover:stroke-blue-600  stroke-white  transition duration-5000"
			size="2.5em"
		/></div>
        </label>
</div>
