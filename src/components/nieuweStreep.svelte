<script>
	import { strepers, addStreep } from '$lib/streepStore';
	import Modal from './Modal.svelte';
	import NieuweStreper from './nieuweStreper.svelte';
	import { notifications } from '$lib/toastStore.js';
	import Select from 'svelte-select';

	var selectBox
	var streper = ''; // invoerveld streper
	var aantalStrepen = 1; // aantal te strepen drankjes
	var streperId; // wat is de ID van de streper
	var streperBekend = false; // is de ingevoerde naam bekend
	var showNieuweStreper = false; //toggle voor de Modal
	
	var justValue ='';
	const optionIdentifier = 'naam_kort';
	const labelIdentifier = 'naam_kort';

	// const newstreper = $strepers.map(item => {
	//   return {
	//     label: item.naam_kort,
	//     value: item.id
	//   };
	// }); Optie om $strepers de keys van naam te veranderen

	$: checkStreper(justValue)
	$: strepers;

	// const getStreperOld = () => {
	// 	var obj = $strepers.find((o) => o.naam_kort.toLowerCase() === streper.toLowerCase());
	// 	obj ? (streperBekend = true) : (streperBekend = false);
	// 	streperBekend ? streperId = obj.id : ''

	// 	//check of Streper bekend is, en haal z'n ID nummer op (op te kunnen synchroniseren)
	// 	//
	// };

	const checkStreper = (justValue) => {
		var obj = $strepers.find(
			(o) => o.naam_kort.toLowerCase() === justValue?.toLowerCase()
		);
		obj ? (streperBekend = true) : (streperBekend = false);
		console.log(justValue)
	}

	const getStreper = (event) => {
		// var obj = $strepers.find((o) => o.naam_kort.toLowerCase() === streper.toLowerCase());
		// obj ? (streperBekend = true) : (streperBekend = false);
		// streperBekend ? streperId = obj.id : ''
		//	console.log(event);
		var obj = $strepers.find(
			(o) => o.naam_kort.toLowerCase() === event?.detail.naam_kort.toLowerCase()
		);
		obj ? (streperBekend = true) : (streperBekend = false);
		streperBekend ? (streperId = obj.id) : '';
		streperBekend ? (streper = obj.naam_kort) : '';
		//event?.detail ? (streper = event.detail.naam_kort) : '';
		//check of Streper bekend is, en haal z'n ID nummer op (op te kunnen synchroniseren)
	};

	const createItem = (filterText) => {
		return {
			naam_kort: filterText
			//id: filterText
		};
	};

	export let getOptionLabel = (option, filterText) => {
		return option.isCreator ? `Aanmaken \"${filterText}\"` : option.naam_kort;
	};
	// vertaling voor de Create optie

	const toggleNieuweStreper = (event) => {
		// console.log(event)
		event?.detail ? (streper = event.detail) : streper;
		//console.log(typeof event?.detail)
		showNieuweStreper = !showNieuweStreper;
	//	getStreper();
		checkStreper(justValue)
		//toggle the Modal, en ververs de drinkers
	};



	const checkStreep = () => {
		console.log(streper)
		streperBekend
			? addStreep(aantalStrepen, streperId, streper)
			: notifications.danger('Onbekende Gebruiker! Geen boeking gemaakt!', 2000);
			
		streper = '';
		streperBekend = false;
		aantalStrepen = 1;
		selectBox.handleClear();
		
	}; // check of er gestreept mag worden **NOG UITWERKEN**
</script>

<div class="flex m-1">
	<!-- <input
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
	</datalist> -->

	<div id="streperDropDown" class="dropdown m-1  {streperBekend && streper !== '' ? 'streper_bekend' : ''}">
		<!-- <Select items={newstreper} isCreatable on:itemCreated={setStreper}   on:select={getStreperNew} /> -->
		
		<Select
			items={$strepers}
			{labelIdentifier}
			{optionIdentifier}
			{createItem}
			{getOptionLabel}
			isCreatable
			placeholder="Wie wil er strepen?"
			on:itemCreated={toggleNieuweStreper}
			on:select={getStreper}
			bind:this={selectBox}
			bind:justValue
		/>
	</div>
	
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
		<div slot="body"><NieuweStreper {streper} on:close={() => toggleNieuweStreper()} /></div>
	</Modal>
{/if}



<style>
	.dropdown {
		--border-radius: 0.5rem;
		--item-hover-bg: rgb(191 219 254);
		--width: 230px;
		/* --padding: 30px 8px; */
		--border: 2px solid rgb(229 231 235);
		--height: 54px;
		--padding: 0px 8px;
		--input-font-size: 16px;
		--placeholder-color: rgb(156 163 175);
	}
	.streper_bekend {
		--background: rgb(220 252 231);
	}
</style>
