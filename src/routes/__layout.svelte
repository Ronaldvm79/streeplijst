<script>
	import '../app.css';
	import { loading } from '$lib/streepStore';
</script>




{#if $loading}
	<div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"><img src="/Spin-1s-410px.svg" alt="spinner" /></div>
{/if}

<div class="container mx-auto my-6 w-2/5">     
 
<slot />

</div>
<style>

</style>
