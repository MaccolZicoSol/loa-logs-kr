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
            로스트아크 패치 후 미터기의 새 업데이트가 올라올 때까지 패킷들을 저장해놨다가
        </p>
        <p class="px-4 text-base">
            미터기 업데이트 후 저장해놨던 패킷들을 다시 읽어 로그를 남기는 기능
        </p>
        <p class="mt-4 px-4 text-base">
            ※ 주의, 아직 미완성이므로 이 기능으로 집계된 로그들은 "딜"만 체크하는 용도로 사용하세요 
        </p>
        <p class="px-4 text-base">
            그리고 현재는 패킷을 빠르게 읽어버리는 구조라 전투 시간이 30초 미만이 나올수도 있습니다
        </p>
        <p class="px-4 text-base">
            패킷을 로그로 집계한 후 기존 패킷 파일은 삭제를 권합니다
        </p>
    </div>

    {#if !$readChangedStore}
        <div class="mx-8 mt-4 flex flex-col space-y-2 px-4">
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
