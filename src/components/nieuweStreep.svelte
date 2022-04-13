<script>
	import { strepers, addStreep } from '$lib/streepStore';
	import Modal from './Modal.svelte';
    import NieuweStreper from './nieuweStreper.svelte';

	var streper = '';  // invoerveld streper
	var aantalStrepen = 1; // aantal te strepen drankjes
	var streperId; // wat is de ID van de streper
	var streperBekend = false; // is de ingevoerde naam bekend
	var showNieuweStreper = false; //toggle voor de Modal
	
   
    $:strepers

	const getStreper = () => {
		var obj = $strepers.find((o) => o.naam_kort.toLowerCase() === streper.toLowerCase());
		obj ? (streperBekend = true) : (streperBekend = false);
		streperBekend ? streperId = obj.id : ''

		//check of Streper bekend is, en haal z'n ID nummer op (op te kunnen synchroniseren)
	};

	const toggleNieuweStreper = () => {
		showNieuweStreper= !showNieuweStreper;
        getStreper()
        //toggle the Modal, en ververs de drinkers
	};

	const checkStreep = () => {
		streperBekend ? addStreep(aantalStrepen, streperId) : alert('onbekende streper');
		streper = '';
		streperBekend = false;
		aantalStrepen = 1;
	}; // check of er gestreept mag worden **NOG UITWERKEN**
</script>

<div class="flex m-1">
	<input
		list="strepers"
		placeholder="Vul een naam "
		bind:value={streper}
		class="border-2 rounded-lg p-2 "
		class:bg-rose-100={!streperBekend && streper !== ''}
		class:bg-green-100={streperBekend}
		class:bg-white={streper == ''}
		on:input={() => getStreper()}
	/>
	<datalist id="strepers">
		{#each $strepers as { naam_kort }}
			<option>{naam_kort}</option>
		{/each}
	</datalist>

	<select bind:value={aantalStrepen} class="border-2 rounded-lg p-2 ml-1">
		{#each Array(3) as _, i}
			<option value={i + 1}>{i + 1}</option>
		{/each}
	</select>
	<button class="btn" disabled={streper == ''} on:click={() => checkStreep()}>Streep</button>
	{#if !streperBekend && streper !== ''}
		<button class="btn" on:click={() => toggleNieuweStreper()}>Nieuwe Streper!</button>
	{/if}
</div>

{#if showNieuweStreper}
	<Modal on:close={() => toggleNieuweStreper()} titel="Nieuwe Streper">
		<div slot="body"><NieuweStreper {streper} on:close={() => toggleNieuweStreper()}/></div>
	</Modal>
{/if}
