<script lang="ts">
    import type { EncounterDbInfo } from "$lib/types";
    import { settings } from "$lib/utils/settings";
    import { tooltip } from "$lib/utils/tooltip";
    import { invoke } from "@tauri-apps/api";
    import { onMount } from "svelte";
    import NProgress from "nprogress";
    import SettingItem from "$lib/components/settings/SettingItem.svelte";
    import { writable } from "svelte/store";

    let encounterDbInfo: EncounterDbInfo;
    let deleteConfirm = false;
    let deleteInProgress = false;
    let deleteMsg = "";
    let deleteFn: (() => void) | undefined;
    let optimized = writable(false);
    let optimizing = writable(false);

    async function openDbFolder() {
        await invoke("open_db_path");
    }

    onMount(() => {
        (async () => {
            encounterDbInfo = await invoke("get_db_info", { minDuration: $settings.logs.minEncounterDuration });
        })();
    });

    async function deleteEncounterBelowMinDuration() {
        NProgress.start();
        deleteInProgress = true;
        await invoke("delete_encounters_below_min_duration", {
            minDuration: $settings.logs.minEncounterDuration,
            keepFavorites: $settings.general.keepFavorites
        });
        encounterDbInfo = await invoke("get_db_info", { minDuration: $settings.logs.minEncounterDuration });
        deleteConfirm = false;
        deleteInProgress = false;
        NProgress.done();
    }

    async function deleteAllUnclearedEncounters() {
        NProgress.start();
        deleteInProgress = true;
        await invoke("delete_all_uncleared_encounters", { keepFavorites: $settings.general.keepFavorites });
        encounterDbInfo = await invoke("get_db_info", { minDuration: $settings.logs.minEncounterDuration });
        deleteConfirm = false;
        deleteInProgress = false;
        NProgress.done();
    }

    async function deleteAllEncounters() {
        NProgress.start();
        deleteInProgress = true;
        await invoke("delete_all_encounters", { keepFavorites: $settings.general.keepFavorites });
        encounterDbInfo = await invoke("get_db_info", { minDuration: $settings.logs.minEncounterDuration });
        deleteConfirm = false;
        deleteInProgress = false;
        NProgress.done();
    }
</script>

<div class="mt-4 flex flex-col space-y-2 px-2">
    <div class="flex items-center space-x-4">
        <div>데이터베이스 폴더:</div>
        <button class="rounded-md bg-zinc-600 p-1 hover:bg-zinc-700" on:click={openDbFolder}>열기</button>
    </div>
    <div class="flex items-center space-x-4">
        <div use:tooltip={{ content: "Use this feature if searching is slow" }}>
            데이터베이스 최적화 (검색 속도가 느릴 때만 사용):
        </div>
        <button
            class="w-20 rounded-md p-1 {$optimized ? 'disabled bg-gray-600' : 'bg-accent-800 hover:bg-accent-900'}"
            on:click={async () => {
                $optimizing = true;
                await invoke("write_log", { message: "optimizing database..." });
                await invoke("optimize_database");
                $optimizing = false;
                $optimized = true;
            }}>
            {#if $optimized}
                최적화됨
            {:else}
                최적화
            {/if}
        </button>
    </div>
    <SettingItem
        name="즐겨찾기 유지"
        description="아래 옵션들을 사용해도 즐겨찾기한 전투는 삭제되지 않습니다."
        bind:setting={$settings.general.keepFavorites} />
    {#if encounterDbInfo}
        <div class="flex items-center space-x-2">
            <div>데이터베이스 용량:</div>
            <div class="font-gothic">
                {encounterDbInfo.size}
            </div>
        </div>
        <div class="flex items-center space-x-2">
            <div use:tooltip={{ content: "Total encounters" }}>저장된 총 전투 수:</div>
            <div class="font-gothic">
                {encounterDbInfo.totalEncounters.toLocaleString()}
            </div>
        </div>
        {#if encounterDbInfo.totalEncounters - encounterDbInfo.totalEncountersFiltered > 0}
            <div class="flex items-center space-x-2">
                <div use:tooltip={{ content: "Total encounters > minimum duration" }}>필터링된 총 전투 수:</div>
                <div class="font-gothic">
                    {encounterDbInfo.totalEncountersFiltered.toLocaleString()}
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div>최소 소요 시간 이하의 전투 삭제:</div>
                <button
                    class="rounded-md bg-red-800 p-1 hover:bg-red-900"
                    on:click={() => {
                        deleteConfirm = true;
                        deleteMsg = `정말로 ${(
                            encounterDbInfo.totalEncounters - encounterDbInfo.totalEncountersFiltered
                        ).toLocaleString()}개의 전투를 삭제하시겠습니까? (시간이 걸릴 수 있습니다)`;
                        deleteFn = deleteEncounterBelowMinDuration;
                    }}>
                    삭제
                </button>
            </div>
        {/if}
        {#if encounterDbInfo.totalEncounters > 0}
            <div class="flex items-center space-x-4">
                <div>클리어되지 않은 모든 전투 삭제:</div>
                <button
                    class="rounded-md bg-red-800 p-1 hover:bg-red-900"
                    on:click={() => {
                        deleteConfirm = true;
                        deleteMsg = `정말로 클리어되지 않은 모든 전투를 삭제하시겠습니까?`;
                        deleteFn = deleteAllUnclearedEncounters;
                    }}>
                    삭제
                </button>
            </div>
        {/if}
        {#if encounterDbInfo.totalEncounters > 0}
            <div class="flex items-center space-x-4">
                <div>모든 전투 삭제:</div>
                <button
                    class="rounded-md bg-red-800 p-1 hover:bg-red-900"
                    on:click={() => {
                        deleteConfirm = true;
                        deleteMsg = `정말로 모든 ${encounterDbInfo.totalEncounters.toLocaleString()}개의 전투를 삭제하시겠습니까? (이 작업은 취소할 수 없습니다)`;
                        deleteFn = deleteAllEncounters;
                    }}>
                    삭제
                </button>
            </div>
        {/if}
    {/if}
</div>
{#if $optimizing}
    <div class="fixed inset-0 z-50 bg-zinc-900 bg-opacity-80" />
    <div class="fixed left-0 right-0 top-0 z-50 h-modal w-full items-center justify-center p-4">
        <div class="relative top-[40%] mx-auto flex max-h-full w-full max-w-md">
            <div class="relative mx-auto flex flex-col rounded-lg border-gray-700 bg-zinc-800 text-gray-400 shadow-md">
                <div id="modal" class="flex-1 space-y-2 overflow-y-auto overscroll-contain p-6 text-center">
                    <div>
                        데이터베이스 최적화 중입니다. <span class="font-bold">앱을 닫지 마세요</span>.
                    </div>
                    <div>
                        앱이 응답하지 않을 수 있습니다. 잠시만 기다려 주세요.
                    </div>
                    <div class="">이 작업은 시간이 걸릴 수 있습니다...</div>
                </div>
            </div>
        </div>
    </div>
{/if}
{#if deleteConfirm && encounterDbInfo}
    <div class="fixed inset-0 z-50 bg-zinc-900 bg-opacity-80" />
    <div class="fixed left-0 right-0 top-0 z-50 h-modal w-full items-center justify-center p-4">
        <div class="relative top-[25%] mx-auto flex max-h-full w-full max-w-md">
            <div class="relative mx-auto flex flex-col rounded-lg border-gray-700 bg-zinc-800 text-gray-400 shadow-md">
                <button
                    type="button"
                    class:invisible={deleteInProgress}
                    class="absolute right-2.5 top-3 ml-auto whitespace-normal rounded-lg p-1.5 hover:bg-zinc-600 focus:outline-none"
                    aria-label="Close modal"
                    on:click={() => (deleteConfirm = false)}>
                    <span class="sr-only">Close modal</span>
                    <svg class="size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <div id="modal" class="flex-1 space-y-6 overflow-y-auto overscroll-contain p-6">
                    <div class="text-center">
                        <svg
                            aria-hidden="true"
                            class="mx-auto mb-4 h-14 w-14 text-gray-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                class="s-Qbr4I8QhaoSZ" />
                        </svg>
                        <h3 class="mb-5 text-lg font-normal text-gray-400">
                            {deleteMsg}
                        </h3>
                        {#if !deleteInProgress}
                            <button
                                type="button"
                                class="mr-2 inline-flex items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-center text-sm text-white hover:bg-red-800 focus:outline-none"
                                on:click={deleteFn}>
                                네, 삭제합니다
                            </button>
                            <button
                                type="button"
                                class="inline-flex items-center justify-center rounded-lg bg-gray-800 bg-transparent px-5 py-2.5 text-center text-sm text-gray-400 hover:bg-zinc-700 hover:text-white focus:text-white focus:outline-none"
                                on:click={() => (deleteConfirm = false)}>
                                아니요, 취소
                            </button>
                        {:else}
                            <div>삭제중...</div>
                        {/if}
                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
