<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from '$lib/toastStore';
	import { defaultIcon, successIcon, errorIcon, warningIcon, infoIcon } from '$lib/icons';

	import Icon from '../components/Icon.svelte';

	export let themes = {
		danger: '#E26D69',
		success: '#84C991',
		warning: '#f0ad4e',
		info: '#5bc0de',
		default: '#aaaaaa'
	};

	export let icons = {
		danger: errorIcon,
		success: successIcon,
		warning: warningIcon,
		info: infoIcon,
		default: defaultIcon
	};
</script>

<div class="fixed top-2 left-0 right-0  z-50 flex flex-col justify-start items-center m-auto">
	<!-- <div class="notifications "> -->
	{#each $notifications as notification (notification.id)}
		<div
			animate:flip
			class="flex rounded-lg"
			style="background: {themes[notification.type]};"
			transition:fly={{ y: 30 }}
		>
			<div class="py-3 pl-2">
				<Icon d={icons[notification.type]} stroke="white" size="1.5em" />
			</div>
			<div class="py-3 px-2 block text-white">{notification.message}</div>
			
		</div>
	{/each}
</div>
