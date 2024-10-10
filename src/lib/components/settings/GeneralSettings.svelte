<script lang="ts">
    import { settings } from "$lib/utils/settings";
    import { invoke } from "@tauri-apps/api";
    import SettingItem from "./SettingItem.svelte";
    import { ifaceChangedStore } from "$lib/utils/stores";
    import { onMount } from "svelte";
    import { emit } from "@tauri-apps/api/event";

    let colorDropdownOpen = false;
    let networkDropdownOpen = false;
    let networkInterfaces: [string, string][];

    const handleColorDropdownFocusLoss = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;

        if (currentTarget.contains(relatedTarget)) return;
        colorDropdownOpen = false;
    };

    const handleColorDropdownClick = () => {
        colorDropdownOpen = !colorDropdownOpen;
    };

    const handleNetDropdownClick = () => {
        networkDropdownOpen = !networkDropdownOpen;
    };

    const handleNetDropdownFocusLoss = (event: FocusEvent) => {
        const relatedTarget = event.relatedTarget as HTMLElement;
        const currentTarget = event.currentTarget as HTMLElement;

        if (currentTarget.contains(relatedTarget)) return;
        networkDropdownOpen = false;
    };

    onMount(() => {
        (async () => {
            networkInterfaces = await invoke("get_network_interfaces");
            networkInterfaces = networkInterfaces.filter((iface) => iface[1] !== "0.0.0.0");
        })();
    });

    async function toggleAlwaysOnTop() {
        if ($settings.general.alwaysOnTop) {
            await invoke("enable_aot");
        } else {
            await invoke("disable_aot");
        }
    }
</script>

<div class="flex flex-col space-y-4 divide-y-[1px]">
    <div class="mt-4 flex flex-col space-y-2 px-2">
        <div class="relative pt-2" on:focusout={handleColorDropdownFocusLoss}>
            <div class="flex items-center">
                <button
                    id=""
                    class="bg-accent-800 inline-flex items-center rounded-lg px-2 py-2 text-center text-sm"
                    type="button"
                    on:click={handleColorDropdownClick}>
                    <svg class="size-4 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"
                        ><path
                            d="M480 996q-86.035 0-162.566-33.158t-133.825-90.451q-57.293-57.294-90.451-133.802Q60 662.08 60 576.062 60 487 93.196 410.724q33.196-76.275 91.5-133.25Q243 220.5 320.769 187.75 398.538 155 487.189 155q83.023 0 157.706 28.207 74.683 28.207 131.885 77.88 57.202 49.672 90.711 118.242Q901 447.9 901 527q0 112.5-62.75 184.5t-175.664 72H605.5q-17 0-29.5 13.25T563.5 827q0 25.447 10 36.224 10 10.776 10 32.276 0 40-28.55 70.25T480 996Zm0-420Zm-222.5 24.5q19.7 0 34.1-14.4Q306 571.7 306 552q0-19.7-14.4-34.1-14.4-14.4-34.1-14.4-19.7 0-34.1 14.4Q209 532.3 209 552q0 19.7 14.4 34.1 14.4 14.4 34.1 14.4Zm121-162q20.2 0 34.6-14.4 14.4-14.4 14.4-34.1 0-20.7-14.4-34.6-14.4-13.9-34.1-13.9-20.7 0-34.6 13.9-13.9 13.9-13.9 34.1 0 20.2 13.9 34.6 13.9 14.4 34.1 14.4Zm203.5 0q20.2 0 34.6-14.4Q631 409.7 631 390q0-20.7-14.4-34.6-14.4-13.9-34.1-13.9-20.7 0-34.6 13.9-13.9 13.9-13.9 34.1 0 20.2 13.9 34.6 13.9 14.4 34.1 14.4Zm123.5 162q19.7 0 34.1-14.4Q754 571.7 754 552q0-19.7-14.4-34.1-14.4-14.4-34.1-14.4-20.7 0-34.6 14.4Q657 532.3 657 552q0 19.7 13.9 34.1 13.9 14.4 34.6 14.4Zm-229.342 304q7.592 0 11.717-3.545Q492 897.41 492 888.938 492 874.5 477.25 865q-14.75-9.5-14.75-47.5 0-48.674 32.73-87.087Q527.96 692 576.25 692h86.25q74 0 110-43.75t36-115.25q0-131-97.843-208.25t-223.16-77.25q-140.595 0-238.296 95.919T151.5 576.479q0 136.521 95.211 232.271t229.447 95.75Z" /></svg>
                </button>
                <div class="ml-5">
                    <div class="text-gray-100">강조 색상</div>
                    <div class="text-xs text-gray-300">앱의 강조 색상을 설정합니다.</div>
                </div>
            </div>
            {#if colorDropdownOpen}
                <div id="dropdown" class="absolute -left-1 mt-2 w-28 cursor-pointer rounded-lg shadow">
                    <ul class="text-sm text-gray-200" aria-labelledby="dropdownDefaultButton">
                        <li>
                            <button
                                class="block w-full rounded-t-lg bg-red-800 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-red";
                                    colorDropdownOpen = false;
                                }}>레드</button>
                        </li>
                        <li>
                            <button
                                class="block w-full px-4 py-2 text-left" style="background-color: rgb(218, 124, 160)"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-rose";
                                    colorDropdownOpen = false;
                                }}>로즈</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-pink-800 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-pink";
                                    colorDropdownOpen = false;
                                }}>핑크</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-violet-500 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-violet";
                                    colorDropdownOpen = false;
                                }}>바이올렛</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-purple-800 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-purple";
                                    colorDropdownOpen = false;
                                }}>퍼플</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-sky-800 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-blue";
                                    colorDropdownOpen = false;
                                }}>블루</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-green-800 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-green";
                                    colorDropdownOpen = false;
                                }}>그린</button>
                        </li>
                        <li>
                            <button
                                class="block w-full bg-yellow-400 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-yellow";
                                    colorDropdownOpen = false;
                                }}>옐로우</button>
                        </li>
                        <li>
                            <button
                                class="block w-full rounded-b-lg bg-orange-500 px-4 py-2 text-left"
                                on:click={() => {
                                    $settings.general.accentColor = "theme-orange";
                                    colorDropdownOpen = false;
                                }}>오렌지</button>
                        </li>
                    </ul>
                </div>
            {/if}
        </div>
        <!-- <SettingItem
            name="Auto Launch Lost Ark"
            description="Automatically start Lost Ark when the app is opened."
            bind:setting={$settings.general.startLoaOnStart} /> -->
        <SettingItem
            name="저전력 모드"
            description="집계 업데이트 주기를 줄여 CPU 사용량을 감소시킵니다. (미터기 재시작 필요)"
            bind:setting={$settings.general.lowPerformanceMode} />
        <SettingItem
            name="플레이어 이름 표시"
            description="플레이어 이름을 불러왔을 경우 표시합니다. 비활성화시 클래스 이름(예: 아르카나)이 표시됩니다."
            bind:setting={$settings.general.showNames} />
        <SettingItem
            name="아이템 레벨 표시"
            description="플레이어 아이템 레벨을 불러왔을 경우 표시합니다."
            bind:setting={$settings.general.showGearScore} />
        <SettingItem
            name="이름 숨기기"
            description="플레이어 이름을 완전히 숨기며, 클래스 이름도 표시되지 않습니다."
            bind:setting={$settings.general.hideNames} />
        <SettingItem
            name="에스더 표시"
            description="에스더 스킬로 입힌 피해량을 미터기와 로그에 표시합니다. 이 설정을 활성화하면 인게임 MVP 창의 딜 %와 다르게 표시됩니다."
            bind:setting={$settings.general.showEsther} />
        <label class="flex items-center">
            <input
                type="checkbox"
                bind:checked={$settings.general.bossOnlyDamage}
                on:change={() => {
                    emit("boss-only-damage-request", $settings.general.bossOnlyDamage);
                }}
                class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
            <div class="ml-5">
                <div class="text-gray-100">보스만 집계</div>
                <div class="text-xs text-gray-300">보스에게 입힌 피해만 집계됩니다.</div>
            </div>
        </label>
        <SettingItem
            name="보스만 집계 기본 설정 ON"
            description={"이 설정을 활성화하면, 미터기를 시작할 때마다 자동으로 보스만 집계 설정을 활성화합니다."}
            bind:setting={$settings.general.bossOnlyDamageDefaultOn} />
        <SettingItem
            name="레이드 난이도 표시"
            description={"레이드의 난이도를 표시합니다."}
            bind:setting={$settings.general.showDifficulty} />
        <SettingItem
            name="레이드 관문 표시"
            description={"레이드의 관문을 표시합니다."}
            bind:setting={$settings.general.showGate} />
        <SettingItem
            name="쉴드 탭 표시"
            description={"레이드의 쉴드 상태를 표시합니다."}
            bind:setting={$settings.general.showShields} />
        <SettingItem
            name="받은 피해량 탭 표시"
            description={"플레이어가 받은 피해량을 표시합니다"}
            bind:setting={$settings.general.showTanked} />
        <SettingItem
            name="보스 탭 표시"
            description={"보스가 입힌 피해량과 그 스킬의 세부 사항을 표시합니다."}
            bind:setting={$settings.general.showBosses} />
        <SettingItem
            name="세부 사항 탭 표시"
            description={"아이덴티티와 무력화의 raw 값 데이터에 대한 추가 탭을 표시합니다."}
            bind:setting={$settings.general.showDetails} />
        <div class="">
            <label class="flex items-center">
                <input
                    type="checkbox"
                    bind:checked={$settings.general.alwaysOnTop}
                    on:change={toggleAlwaysOnTop}
                    class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
                <div class="ml-5">
                    <div class="text-gray-100">항상 위로</div>
                    <div class="text-xs text-gray-300">미터기를 항상 다른 창 위에 표시되도록 설정합니다.</div>
                </div>
            </label>
        </div>
        <SettingItem
            name="스크린샷에서 로고 숨기기"
            description={'스크린샷에서 미터기 이름 "LOA Logs KR"을 숨깁니다.'}
            bind:setting={$settings.general.hideLogo} />
        <div>
            <label class="flex items-center">
                <input
                    type="checkbox"
                    bind:checked={$settings.general.autoIface}
                    on:change={() => {
                        $ifaceChangedStore = true;
                    }}
                    class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
                <div class="ml-5">
                    <div class="text-gray-100">자동 네트워크 선택</div>
                    <div class="text-xs text-gray-300">
                        네트워크 인터페이스를 자동으로 선택합니다. VPN을 사용하는 경우, 이 설정을 비활성화하고 수동으로 VPN 인터페이스를 선택하세요.
                    </div>
                </div>
            </label>
        </div>
        {#if !$settings.general.autoIface}
            <div class="relative" on:focusout={handleNetDropdownFocusLoss}>
                <div class="flex items-center">
                    <div class="">
                        <div class="text-gray-100">네트워크 인터페이스 선택</div>
                        <div class="text-xs text-gray-300">
                            로스트아크가 실행 중인 네트워크 인터페이스를 선택합니다.
                        </div>
                    </div>
                </div>
                <div class="flex items-baseline space-x-2">
                    <div>인터페이스:</div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        role="button"
                        tabindex="0"
                        class="mt-2 w-80 truncate rounded bg-zinc-700 p-1"
                        on:click={handleNetDropdownClick}>
                        <div class="px-2">
                            {#if $settings.general.ifDesc}
                                {$settings.general.ifDesc}
                            {:else}
                                인터페이스가 선택되지 않음. 기본값 사용.
                            {/if}
                        </div>
                    </div>
                </div>
                {#if networkDropdownOpen}
                    <div
                        id="dropdown"
                        class="absolute left-[4.5rem] z-10 mt-1 flex w-80 cursor-pointer flex-col rounded bg-zinc-600 shadow">
                        <button
                            class="truncate rounded px-2 py-1 text-left text-sm text-gray-200 hover:bg-gray-700"
                            aria-labelledby="dropdownDefaultButton"
                            on:click={() => {
                                $settings.general.ifDesc = "Default Network Interface";
                                $settings.general.ip = "";
                                networkDropdownOpen = false;
                                $ifaceChangedStore = true;
                            }}>
                            기본 네트워크 인터페이스
                        </button>
                        {#each networkInterfaces as iface (iface)}
                            <button
                                class="truncate rounded px-2 py-1 text-left text-sm text-gray-200 hover:bg-gray-700"
                                aria-labelledby="dropdownDefaultButton"
                                on:click={() => {
                                    $settings.general.ifDesc = iface[0];
                                    $settings.general.ip = iface[1];
                                    networkDropdownOpen = false;
                                    $ifaceChangedStore = true;
                                }}>
                                <div class="flex space-x-1">
                                    <div class="w-40 truncate">
                                        {iface[0]}
                                    </div>
                                    <div>
                                        [{iface[1]}]
                                    </div>
                                </div>
                            </button>
                        {/each}
                    </div>
                {/if}
            </div>
            <div>
                <label class="flex items-center">
                    <input
                        type="number"
                        class="h-8 w-24 rounded-md bg-zinc-700 text-sm text-gray-300"
                        bind:value={$settings.general.port}
                        placeholder={$settings.general.port} />
                    <div class="ml-5">
                        <div class="text-gray-100">포트</div>
                        <div class="text-xs text-gray-300">기본값을 사용하지 않는 경우 사용자 지정 포트를 설정합니다. 기본값은 6040입니다.</div>
                    </div>
                </label>
            </div>
            <div>
                <label class="flex items-center">
                    <input
                        type="checkbox"
                        bind:checked={$settings.general.rawSocket}
                        on:change={() => {
                            $ifaceChangedStore = true;
                        }}
                        class="text-accent-500 size-5 rounded bg-zinc-700 focus:ring-0 focus:ring-offset-0" />
                    <div class="ml-5">
                        <div class="text-gray-100">Raw 소켓</div>
                        <div class="text-xs text-gray-300">Raw 소켓 캡처를 활성화합니다. (관리자로 재시작)</div>
                    </div>
                </label>
            </div>
        {/if}
    </div>
</div>
