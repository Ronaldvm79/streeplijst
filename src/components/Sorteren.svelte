<script>



	import Icon from '../components/Icon.svelte';
	import { successIcon, euroIcon, infoIcon } from '$lib/icons';
	import { sortType } from '$lib/sortStore';
	let sortering;

$: sortType.set = sortering 
$: console.log(sortering)

const onChange = () =>{
	console.log(sortering)
}
</script>

<div class="flex justify-center">
	<input
		class="hidden"
		type="radio"
		bind:group={sortering}
		on:change={()=>onChange()}
		name="sort"
		id="radio_#"
		value="abc"
	/>

	<label class="border-cyan-500 border=2" for="radio_#">
		<Icon
			d={infoIcon}
			class="hover:text-blue-600 transition duration-500 text-zinc-400"
			stroke="currentColor"
			size="3.5em"
		/>
	</label>

	<label>
		<input type="radio" bind:group={sortering} name="sort" value={2} />
		Ab
	</label>

<h1> {sortering} </h1>
</div>
