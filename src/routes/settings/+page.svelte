<script lang="ts">
    import LogSidebar from "$lib/components/logs/LogSidebar.svelte";
    import { onMount } from "svelte";
    import { backNavStore, ifaceChangedStore, pageStore, searchStore } from "$lib/utils/stores";
    import Notification from "$lib/components/shared/Notification.svelte";
    import GeneralSettings from "$lib/components/settings/GeneralSettings.svelte";
    import MeterSettings from "$lib/components/settings/MeterSettings.svelte";
    import LogSettings from "$lib/components/settings/LogSettings.svelte";
    import BuffSettings from "$lib/components/settings/BuffSettings.svelte";
    import ShortcutSettings from "$lib/components/settings/ShortcutSettings.svelte";
    import ColorSettings from "$lib/components/settings/ColorSettings.svelte";
    import AccessibilitySettings from "$lib/components/settings/AccessibilitySettings.svelte";
    import DatabaseSettings from "$lib/components/settings/DatabaseSettings.svelte";
    import Title from "$lib/components/shared/Title.svelte";

    let currentTab = 0;
    let hidden: boolean = true;

    onMount(() => {
        // dunno if this is good lol XD
        $pageStore = 1;
        $backNavStore = false;
        $searchStore = "";
    });
</script>

<svelte:window on:contextmenu|preventDefault />
<LogSidebar bind:hidden />
<div class="custom-scroll h-screen overflow-y-scroll bg-zinc-800 pb-8">
    <div class="sticky top-0 z-10 flex h-16 justify-between bg-zinc-800 px-8 py-5 shadow-md">
        <Title text="설정" bind:hidden />
    </div>
    <div class="px-8">
        <div class="flex flex-wrap">
            <button
                class="border-b px-3 py-4 {currentTab === 0
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 0)}>
                일반
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 1
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 1)}>
                미터기
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 2
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 2)}>
                로그
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 3
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 3)}>
                버프
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 4
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 4)}>
                단축키
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 5
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 5)}>
                클래스 색상
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 6
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 6)}>
                접근성
            </button>
            <button
                class="border-b px-3 py-4 {currentTab === 7
                    ? 'text-accent-500 border-accent-500'
                    : 'border-zinc-500 text-gray-400 hover:text-gray-200'}"
                on:click={() => (currentTab = 7)}>
                데이터베이스
            </button>
        </div>
        {#if currentTab === 0}
            <GeneralSettings />
        {:else if currentTab === 1}
            <MeterSettings />
        {:else if currentTab === 2}
            <LogSettings />
        {:else if currentTab === 3}
            <BuffSettings />
        {:else if currentTab === 4}
            <ShortcutSettings />
        {:else if currentTab === 5}
            <ColorSettings />
        {:else if currentTab === 6}
            <AccessibilitySettings />
        {:else if currentTab === 7}
            <DatabaseSettings />
        {/if}
    </div>
    {#if $ifaceChangedStore}
        <Notification
            bind:showAlert={$ifaceChangedStore}
            text={"Network Interface Changed. Please fully Restart the App."}
            dismissable={false}
            width="18rem"
            isError={true} />
    {/if}
</div>
