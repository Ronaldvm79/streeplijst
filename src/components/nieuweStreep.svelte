<script>
	// @ts-nocheck

	import { strepers, addStreep,currentStreper, setCurrentStreper } from '$lib/streepStore';
	import Modal from './Modal.svelte';
	import NieuweStreper from './nieuweStreper.svelte';
	import { notifications } from '$lib/toastStore.js';
	import Select from 'svelte-select';

	var krat = false;
	var selectBox;
	var streper = ''; // invoerveld streper
	var aantalStrepen = '#'; // aantal te strepen drankjes
	var streperId; // wat is de ID van de streper
	var streperBekend = false; // is de ingevoerde naam bekend
	var showNieuweStreper = false; //toggle voor de Modal

	var justValue = '';
	const optionIdentifier = 'naam_kort';
	const labelIdentifier = 'naam_kort';

	// const newstreper = $strepers.map(item => {
	//   return {
	//     label: item.naam_kort,
	//     value: item.id
	//   };
	// }); Optie om $strepers de keys van naam te veranderen

	$: checkStreper(justValue);
	$: strepers;

	// const getStreperOld = () => {
	// 	var obj = $strepers.find((o) => o.naam_kort.toLowerCase() === streper.toLowerCase());
	// 	obj ? (streperBekend = true) : (streperBekend = false);
	// 	streperBekend ? streperId = obj.id : ''

	// 	//check of Streper bekend is, en haal z'n ID nummer op (op te kunnen synchroniseren)
	// 	//
	// };

	const checkStreper = (justValue) => {
		var obj = $strepers.find((o) => o.naam_kort.toLowerCase() === justValue?.toLowerCase());
		obj ? (streperBekend = true) : (streperBekend = false);
		streperBekend ? (streperId = obj.id) : '';
		streperBekend ? (streper = obj.naam_kort) : '';
	};

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
		event?.detail ? (streper = event.detail) : streper;

		showNieuweStreper = !showNieuweStreper;

		checkStreper(justValue);
		//toggle the Modal, en ververs de drinkers
	};

	const checkStreep = (aantal) => {
		aantal ? (aantalStrepen = aantal) : '';
		aantal == 24 ? (krat = true) : (krat = false);

		streperBekend
			? addStreep(aantalStrepen, streperId, streper, 'ADD', krat)
			: notifications.danger('Onbekende Gebruiker! Geen boeking gemaakt!', 2000);

		streper = '';
		streperBekend = false;
		krat = false;
		aantalStrepen = '#';
		selectBox.handleClear();
	}; // check of er gestreept mag worden **NOG UITWERKEN**
</script>

<div class="flex m-1 justify-center items-center">
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
	<div class="flex flex-col justify-center items-center">
		<div
			id="streperDropDown"
			class=" dropdown m-1 text-2xl  {streperBekend && streper !== '' ? 'streper_bekend' : ''}"
		>
			<!-- <Select items={newstreper} isCreatable on:itemCreated={setStreper}   on:select={getStreperNew} /> -->
			
			<Select
				items={$strepers}
				value={$currentStreper}
				{labelIdentifier}
				{optionIdentifier}
				{createItem}
				{getOptionLabel}
				isCreatable
				placeholder="Wie wil er strepen?"
				on:itemCreated={toggleNieuweStreper}
				on:select={getStreper}
				on:clear={()=>setCurrentStreper()}
				bind:this={selectBox}
				bind:justValue
			/>
		</div>
		<div class="flex justify-center items-center -mt-1 ml-32 ">
			<select
				bind:value={aantalStrepen}
				class="appearance-none w-24 text-center bg-gradient-to-br text-zinc-100 text-xl font-bold from-cyan-600 to-cyan-700 p-2 ml-1 h-16 cursor-pointer"
				on:change={() => checkStreep()}
			>
				<option class="bg-cyan-600" value="#">#</option>
				{#each Array(16) as _, i}
					<option class="bg-cyan-600" value={i + 1}>{i + 1}</option>
				{/each}
			</select>
			<button class="w-24 text-center bg-gradient-to-br text-zinc-100 text-xl font-bold from-cyan-600 to-cyan-700 p-2 ml-1 h-16" on:click={() => checkStreep(8)}
				>8</button
			>
			<button class="w-24 text-center bg-gradient-to-br text-zinc-100 text-xl font-bold from-cyan-600 to-cyan-700 p-2 ml-1 h-16" on:click={() => checkStreep(24)}
				>Krat</button
			>
			<!-- <button class="btn" disabled={streper == ''} on:click={() => checkStreep()}>Streep</button>
			{#if !streperBekend && streper !== ''}
				<button class="btn" on:click={() => toggleNieuweStreper()}>Nieuwe Streper!</button>
			{/if} -->
		</div>
	</div>
</div>
{#if showNieuweStreper}
	<Modal on:close={() => toggleNieuweStreper()} titel="Nieuwe Streper">
		<div slot="body"><NieuweStreper {streper} on:close={() => toggleNieuweStreper()} /></div>
	</Modal>
{/if}

<style>
	.dropdown {
		--item-hover-bg: rgb(8, 145, 178);
		--item-is-active-bg: rgb(8, 145, 178);
		--width: 430px;
		/* --padding: 30px 8px; */
		--selected-item-font-size: 24px;
		--height: 72px;
		--padding: 0px 8px;
		--input-font-size: 24px;
		--placeholder-color: rgb(156 163 175);
	}
	.streper_bekend {
		--background: #b2ebf2
	}
	
</style>
