<script>
	import { strepers, addStreper } from '$lib/streepStore';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let streper;
	let email = ''; 
	var error
    var naam;
	var bier = false;
	var emailOK = true;
	var streperBekend = false;
	var emailBekend = false;

	const validateEmail = () => {
		var re = /\S+@\S+\.\S+/;
		emailOK = re.test(email);
		emailBekend = $strepers.find((o) => o.email.toLowerCase() === email.toLowerCase());
		//checke of het email adres aan het juiste formaat voldoet
        // check of het email adres al bekend is
	};

	const validateStreper = () => {
		streperBekend = $strepers.find((o) => o.naam_kort.toLowerCase() === streper.toLowerCase());
		// check of the streepnaam nog niet bekend is

	};

	const slaOp = async () => {
		if (emailOK && !streperBekend && !emailBekend && naam && email){
        await addStreper(email, naam, streper, bier);
		dispatch('close');} else {
            error = "Niet alle gegevens zijn correct ingevuld"
        }
        // controleer of alle velden juist zijn ingevuld **VERDER TESTEN**
        // verstuur DB opdracht en sluit venster    
	};
</script>

<div class="flex flex-col">
	{#if error}<span class="text-red-400">{error}</span>{/if}
    <label class="mb-2" for="naam"> Streepnaam: </label>
	<input
		class="border-2 rounded-lg p-2 mb-2 "
		on:blur={() => validateStreper()}
		bind:value={streper}
	/>
	{#if streperBekend}<span class="text-red-400">Deze streper bestaat al!</span>{/if}
	<label class="mb-2" for="naam"> Voor en Achternaam: </label>

	<input class="border-2 rounded-lg p-2 mb-2 " bind:value={naam} />
	<label class="mb-2" for="email"> Email: </label>
	<input
		class="border-2 rounded-lg p-2 mb-2 "
		type="email"
		bind:value={email}
		on:blur={() => validateEmail()}
	/>
	{#if !emailOK && email != ''}<span class="text-red-400">Email adres niet correct</span>{/if}
	{#if emailBekend}<span class="text-red-400">Deze streper bestaat al!</span>{/if}
	<div class="flex justify-between items-center">
		<div class="flex items-center">
			<div
				class="w-12 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
				on:click={() => (bier = !bier)}
				class:bg-blue-400={bier}
			>
				<div
					class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out hover:bg-blue-500"
					class:translate-x-4={bier}
				/>
			</div>
			18+
		</div>
		<button class="btn" on:click={() => slaOp()}> Sla Op</button>
	</div>
</div>
