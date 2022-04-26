<script>
	export var streperDetails;
    export var gebruiker;
	import { convDatum } from '$lib/utils';
    import {getFavorieteDag, getGemStrepen, getStrepenTotGebr} from '$lib/streepStore'
</script>

<!-- {#each streperDetails as drinker} -->
<div class="flex">

<div>
	<table class="table text-zinc-300  space-y-6 text-sm border-separate">
		<thead class="bg-gray-800 text-zinc-300 border-b-4  border-slate-700">
			<tr>
				<th class="p-3  border-l-4 border-cyan-600 ">Datum</th>
				<th class="p-3 text-left">Gestreept</th>
				<th class="p-3 text-left">Betaald</th>
			</tr>
		</thead>

		<tbody>
			{#each streperDetails as drinker}
				<tr class="bg-gray-800">
					<td class="p-2 border-l-4 border-cyan-600">
						{convDatum(drinker.created_at)}
					</td>
					{#if drinker.aantal >= 1}
						<td class="p-2 text-center text-green-500 {drinker.krat ? 'animate-bounce': '' }">
							{drinker.aantal}
						</td>
						<td class="p-2" />
					{:else}
						<td class="p-2" />
						<td class="p-2 text-red-500 text-center">
							{drinker.aantal}
						</td>
					{/if}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
<div class="flex flex-col pl-10 items-center">
<div class="text-zinc-300  mt-2 text-lg font-bold  text-center border-lg">
    Totaal Aantal Strepen
</div>
<div class="flex justify-center items-center font-bold text-xl text-zinc-300 w-16 h-10 rounded-2xl bg-cyan-600 mt-3">
    {#await getStrepenTotGebr(gebruiker)} loading.. {:then totaal} {totaal} {/await}
</div> 

<div class="text-zinc-300  mt-2 text-lg font-bold  text-center border-lg">
    Gemiddelde Order
</div>
<div class="flex justify-center items-center font-bold text-xl text-zinc-300 w-16 h-10 rounded-2xl bg-cyan-600 mt-3">
    {#await getGemStrepen(gebruiker)} loading.. {:then gem} {gem} {/await}
</div>
<div class="text-zinc-300  mt-2 text-lg font-bold  text-center border-lg">
    Favoriete Streepdag
</div>
<div class="flex justify-center items-center font-bold text-xl text-zinc-300 w-28 h-10 rounded-2xl bg-cyan-600 mt-3">
    {#await getFavorieteDag(gebruiker)} loading..  {:then dag} {dag} {/await}
</div> 
</div>
</div>