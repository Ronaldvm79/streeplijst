<script>
	import '../app.css';
	import { loading } from '$lib/streepStore';
</script>




{#if $loading}
	<div class="modal bg-slate-700 z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0"><img src="/Blocks-1s-410px.svg" alt="spinner" /></div>
{/if}

<div class="container mx-auto my-6 w-3/5  bg-auto bg-no-repeat bg-right-top bg-[url('/achtergrond.svg')]">     
 
<slot />


</div>

<style>

</style>
