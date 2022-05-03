<script>
    export let totaal
</script>

<div class="grid overflow-hidden grid-cols-[minmax(0,1fr)_300px] grid-rows-[60px_10px]   gap-0.5 mx-8 mt-2 bg-zinc-100 dark:bg-slate-700">
	<div class="box row-span-1 col-span-1 border-cyan-700  border-l-8 "></div>
	<div class="box col-span-2 box "></div>
	<div class="box row-start-1 col-start-2 box flex justify-center items-center text-xl font-bold italic dark:text-zinc-500 text-slate-700">Totaal Openstaand <span class="text-zinc-300 ml-3">€ {totaal.toFixed(2)}</span></div>
</div>

{totaal}