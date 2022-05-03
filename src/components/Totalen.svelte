<script>
	import { totalen } from '$lib/streepStore';
   
    import { tweened } from 'svelte/motion';
	import { cubicOut,cubicInOut } from 'svelte/easing';
	import Modal from '../components/Modal.svelte'
	import Grafiek from '../components/Grafiek.svelte';
	import Icon from '../components/Icon.svelte';
	import {grafiekIcon } from '$lib/icons';

	var isJaar = true
	var showGrafiek = false
	var grafType

	const toggleGrafiek = (type) => {
		 grafType=type
		 
		
		showGrafiek = !showGrafiek
	}
	
    
    

    $: isJaar ? totaalStrepen.set($totalen['streeptotaal']) : totaalStrepen.set($totalen['streepmaand'])
    $: isJaar ? gemiddeldStrepen.set($totalen['gemtotaal']) : gemiddeldStrepen.set($totalen['gemmaand'])
    $: isJaar ? aantalStrepers.set($totalen['gebtotaal']) : aantalStrepers.set($totalen['gebmaand'])

    const toggleJaar = () => {
        !isJaar ? totaalStrepen.set($totalen['streeptotaal']) : totaalStrepen.set($totalen['streepmaand'])
        !isJaar ? gemiddeldStrepen.set($totalen['gemtotaal']) : gemiddeldStrepen.set($totalen['gemmaand'])
        !isJaar ? aantalStrepers.set($totalen['gebtotaal']) : aantalStrepers.set($totalen['gebmaand'])
        isJaar = !isJaar
    }

    const totaalStrepen = tweened (0,{duration: 2000, easing: cubicInOut})
    const gemiddeldStrepen = tweened (0,{duration: 2000, easing: cubicOut})
    const aantalStrepers = tweened (0,{duration: 2000, easing: cubicInOut})



    function typewriter(node, { speed = 1 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.005);

		return {
			duration,
			tick: t => {
				const i = Math.trunc(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}

</script>


	<div
		class="grid overflow-hidden grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] grid-rows-[60px_40px_10px] gap-0.5 m-8"
	>
		<div
			class="box row-span-2 border-cyan-700  border-l-8 flex flex-col items-center justify-center text-3xl text-zinc-100 uppercase font-bold py-4" on:click={() => toggleJaar()}
		>
        <div>{#if isJaar} <span transition:typewriter> dit </span> {:else}  <span transition:typewriter> deze </span>{/if} </div>
        <div>{#if isJaar} <span transition:typewriter> jaar </span> {:else}  <span transition:typewriter> maand </span>{/if}   </div>
          
		</div>
		<div class="box row-span-2 col-start-2 flex flex-col justify-center ">
		
         
            <div class="text-zinc-100 text-3xl font-bold self-center">{$totaalStrepen.toFixed()} </div>
           
		          <div class="flex flex-row justify-start relative">  
					  <div class="text-zinc-500 italic text-xl flex-initial absolute left-1/2 -translate-x-1/2">strepen</div>
					<div class ="flex-initial ml-auto mr-4 mt-1"  on:click={()=>toggleGrafiek(isJaar ? 'aantalmaandjaar': 'aantaldagmaand')}> <Icon
						d={grafiekIcon}
						class="hover:text-blue-600 transition duration-500 text-zinc-400"
						stroke="currentColor"
						size="1.5em"
					/>
					</div>
				</div> 

		</div>
		<div class="box col-span-4  border-slate-500 border-b-2" />
		<div class="box row-start-1 row-end-3 col-start-4 flex flex-col justify-center items-center border-l-2 border-slate-500">
			<div class="text-zinc-100 text-3xl font-bold">{$gemiddeldStrepen.toFixed(2)}</div>
			<div class="text-zinc-500 italic text-xl">per order</div>
		</div>
		<div class="box row-start-1 row-span-2 col-start-3 border-l-2 border-slate-500 flex flex-col justify-center items-center">
            <div class="text-zinc-100 text-3xl font-bold" >{$aantalStrepers.toFixed()}</div>
			<div class="text-zinc-500 italic text-xl">strepers</div>
        </div>
	</div>

	

    {#if showGrafiek}
	<Modal on:close={() => toggleGrafiek()} titel="Strepen per Dag">
		<div slot="body"><Grafiek {grafType} on:close={() => toggleGrafiek()} /></div>
	</Modal>
{/if}