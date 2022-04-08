<script>
import { loading } from "$lib/streepStore";
</script>
Streeplijst

{#if $loading}

<div class="loader"> <img src="/Spin-1s-410px.svg" alt="spinner"> </div>


{/if}

<slot/>

<style>
    .loader {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: grid;
        place-items: center;
        background-color: white;
        z-index: 999;
    }
</style>