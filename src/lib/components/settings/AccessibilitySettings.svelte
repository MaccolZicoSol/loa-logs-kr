<script lang="ts">
    import { settings } from "$lib/utils/settings";
    import { invoke } from "@tauri-apps/api";
    import SettingItem from "./SettingItem.svelte";

    async function toggleBlur() {
        if ($settings.general.blur) {
            await invoke("enable_blur");
        } else {
            await invoke("disable_blur");
        }
    }

    async function toggleBlurWin11() {
        if ($settings.general.blurWin11) {
            await invoke("enable_blur");
        } else {
            await invoke("disable_blur");
        }
    }

    async function setStartOnBoot() {
        await invoke("set_start_on_boot", { set: $settings.general.startOnBoot });
    }

    $: {
        (async () => {
            $settings.general.startOnBoot = await invoke("check_start_on_boot");
        })();
    }

</script>

<div class="flex flex-col space-y-4 divide-y-[1px]">
    <div class="mt-4 flex flex-col space-y-2 px-2">
        <div class="flex items-center space-x-2 py-1">
            <div>
                <select
                    id="modifiers"
                    bind:value={$settings.general.scale}
                    class="focus:ring-accent-500 focus:border-accent-500 yx-2 block w-28 rounded-lg border border-gray-600 bg-gray-700 py-1 text-sm text-white placeholder-gray-400">
                    <option value="0">작게</option>
                    <option value="1">보통</option>
                    <option value="2">크게</option>
                    <option value="3">엄청 크게</option>
                </select>
            </div>
            <div>미터기 UI 크기</div>
        </div>
        <div class="flex items-center space-x-2 py-1">
            <div>
                <select
                    id="modifiers"
                    bind:value={$settings.general.logScale}
                    class="focus:ring-accent-500 focus:border-accent-500 yx-2 block w-28 rounded-lg border border-gray-600 bg-gray-700 py-1 text-sm text-white placeholder-gray-400">
                    <option value="0">작게</option>
                    <option value="1">보통</option>
                    <option value="2">크게</option>
                    <option value="3">엄청 크게</option>
                </select>
            </div>
            <div>로그 UI 크기</div>
        </div>
        <label class="flex items-center">
            <input
                type="checkbox"
                bind:checked={$settings.general.startOnBoot}
                on:change={setStartOnBoot}
                class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
            <div class="ml-5">
                <div class="text-gray-100">Windows 시작 시 실행</div>
                <div class="text-xs text-gray-300">Windows가 시작될 때 자동으로 앱을 실행합니다.</div>
            </div>
        </label>
        <SettingItem
            name="실행 시 미터기 숨기기"
            description={"앱을 시작할 때 미터기 창을 숨깁니다."}
            bind:setting={$settings.general.hideMeterOnStart} />
        <SettingItem
            name="실행 시 로그 숨기기"
            description={"앱을 시작할 때 로그 창을 숨깁니다."}
            bind:setting={$settings.general.hideLogsOnStart} />
        <SettingItem
            name="라인 나누기"
            description={"가독성을 높이기 위해 집계 라인을 교대로 배경 색상으로 나눕니다."}
            bind:setting={$settings.general.splitLines} />
        <SettingItem
            name="호버 시 밑줄"
            description="행 위에 마우스를 올렸을 때 텍스트에 밑줄을 표시하여 가독성을 높입니다."
            bind:setting={$settings.general.underlineHovered} />
        <div class="">
            {#if $settings.general.isWin11}
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={$settings.general.blurWin11}
                        on:change={toggleBlurWin11}
                        class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
                    <div class="ml-5">
                        <div class="text-gray-100">미터기 배경 흐리게</div>
                        <div class="text-xs text-gray-300">
                            미터기 창에 배경 흐림 효과를 추가합니다. Windows 11에서 활성화할 경우 창을 드래그할 때마다 끊길 수 있습니다.
                        </div>
                    </div>
                </label>
            {:else}
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={$settings.general.blur}
                        on:change={toggleBlur}
                        class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
                    <div class="ml-5">
                        <div class="text-gray-100">미터기 배경 흐리게</div>
                        <div class="text-xs text-gray-300">
                            미터기 창에 배경 흐림 효과를 추가합니다.
                        </div>
                    </div>
                </label>
            {/if}
        </div>
        {#if $settings.general.isWin11}
            <SettingItem
                name="미터기 창 투명하게"
                description="Windows 11의 다크 모드를 활성화하려면 이 옵션을 끄세요. (흐리게 설정 비활성화)."
                bind:setting={$settings.general.transparent} />
        {:else}
            <SettingItem
                name="미터기 창 투명하게"
                description="미터기 창을 투명하게 합니다."
                bind:setting={$settings.general.transparent} />
        {/if}
        <SettingItem
            name="로컬 플레이어 색상 고정"
            description={"클래스에 관계없이 로컬 플레이어의 색상을 동일하게 유지합니다. (클래스 색상 탭에서 변경)"}
            bind:setting={$settings.general.constantLocalPlayerColor} />
    </div>
</div>
