<script lang="ts">
    import LogSidebar from "$lib/components/logs/LogSidebar.svelte";
    import Title from "$lib/components/shared/Title.svelte";
    import { writable } from "svelte/store";
    import { settings } from "$lib/utils/settings";
    import Notification from "$lib/components/shared/Notification.svelte";
    import { invoke } from "@tauri-apps/api";

    let hidden: boolean = true;

    const saveChangedStore = writable(false);
    const readChangedStore = writable(false);

    async function readPacket() {
        $settings.general.readPacket = true;
        $readChangedStore = true;
    }
    
    async function openDbFolder() {
        await invoke("open_db_path");
    }
</script>

<LogSidebar bind:hidden />
<div class="custom-scroll h-screen overflow-y-scroll bg-zinc-800 pb-8">
    <div class="sticky top-0 flex h-16 justify-between bg-zinc-800 px-8 py-5 shadow-md">
        <Title text="베타 테스트" bind:hidden />
    </div>

    <div class="mx-8 my-4 tracking-tight text-gray-200">
        <p class="px-4 text-base">
            로스트아크 패치 직후 미터기 업데이트가 아직 되지 않아 집계가 불가능할 때
        </p>
        <p class="px-4 text-base">
            패킷을 저장해 두었다가 미터기 업데이트 후에 저장된 패킷을 다시 분석하고 집계하여 로그를 남기는 기능
        </p>
        <p class="mt-16 px-4 text-base">
            ※ 저장된 패킷을 로그로 남긴 후 기존 패킷 파일은 삭제를 권합니다
        </p>
    </div>

    {#if !$readChangedStore}
        <div class="mx-8 mt-16 flex flex-col space-y-2 px-4">
            <div class="flex items-center space-x-4">
                <div>저장된 패킷 파일 폴더(packets.bin):</div>
                <button class="w-20 rounded-md p-1 bg-accent-800 hover:bg-accent-900" 
                    on:click={openDbFolder}>
                    열기
                </button>
            </div>

            <div class="flex items-center space-x-4">
                <div>패킷 저장:</div>
                <button class="w-20 rounded-md p-1 {$settings.general.savePacket ? 'disabled bg-gray-600' : 'bg-accent-800 hover:bg-accent-900'}" 
                    on:click={()=>{
                        $settings.general.savePacket = !$settings.general.savePacket;
                        $saveChangedStore = true;
                    }}>
                    {#if $settings.general.savePacket}
                        중지
                    {:else}
                        시작
                    {/if}
                </button>
            </div>
            
            {#if !$settings.general.savePacket}
                <div class="flex items-center space-x-4">
                    <div>
                        저장된 패킷 집계:
                    </div>
                    <button
                        class="w-20 rounded-md p-1 bg-accent-800 hover:bg-accent-900"
                        on:click={readPacket}>
                        시작
                    </button>
                </div>
            {/if}
        </div>
    {/if}
    
    {#if $saveChangedStore}
        <Notification
            bind:showAlert={$saveChangedStore}
            text={"패킷 저장 설정이 변경되었습니다. 앱을 다시 실행해주세요."}
            dismissable={false}
            width="25rem"
            isError={true} />
    {/if}
    {#if $readChangedStore}
        <Notification
            bind:showAlert={$readChangedStore}
            text={"앱을 다시 실행하면 로그 집계가 시작됩니다."}
            dismissable={false}
            width="20rem"
            isError={true} />
    {/if}
</div>
