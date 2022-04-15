<script>
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "$lib/toastStore";

    export let themes = {
        danger: "#E26D69",
        success: "#84C991",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa",
    };
</script>

<div class="fixed top-2 left-0 right-0  z-50 flex flex-col justify-start items-center m-auto" >
    <!-- <div class="notifications "> -->
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="flex  rounded-lg" 
            style="background: {themes[notification.type]};"
            transition:fly={{ y: 30 }}
        >
            <div class="p-2 block text-white">{notification.message}</div>
            {#if notification.icon}<i class={notification.icon} />{/if}
        </div>
    {/each}
</div>

