<script>
	import { strepenTotaal } from '$lib/streepStore';
	import StreperDetails from '../components/streperDetails.svelte';
	import { flip } from 'svelte/animate';
	import Streepjes from '../components/Streepjes.svelte';
	var asc = true;

	const sortStrepen = () => {
		$strepenTotaal = $strepenTotaal.sort((a, b) =>
			asc ? a.aantal - b.aantal : b.aantal - a.aantal
		);
		asc = !asc;
	};
</script>

{#each $strepenTotaal as { gebruiker, aantal, naam_kort } (gebruiker)}
	<div animate:flip>
		<StreperDetails {gebruiker} {naam_kort} {aantal}>
			<span slot="titel">{naam_kort} ({aantal}) </span>
		</StreperDetails>
	</div>
{/each}

<button on:click={() => sortStrepen()}> sort </button>

<div class="event-container">
	
	<div class="shadow-lg flex flex-col rounded-lg mx-8 lg:flex-row">
	  <div class="bg-slate-800 lg:w-40  flex justify-center  text-slate-300 text-center font-bold lg:rounded-none lg:py-2 lg:px-8 lg:rounded-l-lg p-0 rounded-t-lg w-full">
		<div class="pt-2">
		  <div class="lg:text-5xl lg:block inline-block text-2xl py-3">8</div>
		  <div class="lg:text-base lg:block inline-block text-2xl">Nov</div>
		</div>
	  </div>

	  <div class="flex flex-col justify-center px-6">
		<h3 class="text-2xl mt-6 mb-2 uppercase text-cyan-700 ">Some Title Here</h3>



		<div class="bg-yellow-200 flex items-center justify-center w-24 p-1 rounded-2xl my-6 text-sm">
		  <img src="images/time.png" alt="" /> 10:00 am
		</div>
	  </div>
	</div>

	<div class="event">
	  <div class="event-left">
		<div class="event-date">
		  <div class="date">22</div>
		  <div class="month">Dec</div>
		</div>
	  </div>

	  <div class="event-right">
		<h3 class="event-title">Some Title Here</h3>

		<div class="event-description">
		  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
		  ratione.
		</div>

		<div class="event-timing">
		  <img src="images/time.png" alt="" /> 10:45 am
		</div>
	  </div>
	</div>

	<h3 class="year">2021</h3>

	<div class="event">
	  <div class="event-left">
		<div class="event-date">
		  <div class="date">8</div>
		  <div class="month">Jan</div>
		</div>
	  </div>

	  <div class="event-right">
		<h3 class="event-title">Some Title Here</h3>

		<div class="event-description">
		  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
		  ratione.
		</div>

		<div class="event-timing">
		  <img src="images/time.png" alt="" /> 10:00 am
		</div>
	  </div>
	</div>

	<div class="event">
	  <div class="event-left">
		<div class="event-date">
		  <div class="date">9</div>
		  <div class="month">Mar</div>
		</div>
	  </div>

	  <div class="event-right">
		<h3 class="event-title">Some Title Here</h3>

		<div class="event-description">
		  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
		  ratione.
		</div>

		<div class="event-timing">
		  <img src="images/time.png" alt="" /> 10:30 am
		</div>
	  </div>
	</div>

	<div class="event">
	  <div class="event-left">
		<div class="event-date">
		  <div class="date">4</div>
		  <div class="month">Apr</div>
		</div>
	  </div>

	  <div class="event-right">
		<h3 class="event-title">Some Title Here</h3>

		<div class="event-description">
		  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
		  ratione.
		</div>

		<div class="event-timing">
		  <img src="images/time.png" alt="" /> 10:00 am
		</div>
	  </div>
	</div>

	<div class="event">
	  <div class="event-left">
		<div class="event-date">
		  <div class="date">8</div>
		  <div class="month">Jun</div>
		</div>
	  </div>

	  <div class="event-right">
		<h3 class="event-title">Some Title Here</h3>

		<div class="event-description">
		  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus,
		  ratione.
		</div>

		<div class="event-timing">
		  <img src="images/time.png" alt="" /> 10:00 am
		</div>
	  </div>
	</div>
  </div>
