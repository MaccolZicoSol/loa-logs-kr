<script lang="ts">
    import LogSidebar from "$lib/components/logs/LogSidebar.svelte";
    import {
        backNavStore,
        pageStore,
        searchStore
    } from "$lib/utils/stores";
    import { getVersion } from "@tauri-apps/api/app";
    import { onMount } from "svelte";
    import Title from "$lib/components/shared/Title.svelte";

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
    <div class="sticky top-0 flex h-16 justify-between bg-zinc-800 px-8 py-5 shadow-md">
        <Title text="소개" bind:hidden />
    </div>
    <div class="mx-8 my-4 tracking-tight text-gray-200">
        <p class="px-4 text-base">
            LOA Logs는 <a class="text-accent-500 hover:underline" href="https://github.com/snoww"
                target="_blank">Snow</a>가 Rust로 작성한 오픈소스 "존나 빠른" 로스트아크 DPS 미터기(<a
                class="text-accent-500 hover:underline" href="https://github.com/snoww/loa-logs"
                target="_blank">snoww/loa-logs</a>)입니다.
            이 프로젝트는 Herysia와 Mathi가 개발한
            <a class="text-accent-500 hover:underline" href="https://github.com/lost-ark-dev/loa-details"
                target="_blank">LOA Details</a>를 변형한것이며, 인터페이스와 설정도 비슷하게 만들었습니다.
            패킷 스니핑 및 처리 기능이 있는 <a class="text-accent-500 hover:underline" href="https://github.com/lost-ark-dev/meter-core"
            target="_blank"><code>meter-core</code></a>는 Rust로 포팅하였으며,
            meter-core 작업에 기여한 Herysia와 Henjuro에게 큰 감사의 인사를 전합니다.
            이를 통해 TypeScript로 구현한것과 비교했을 때 낮은 메모리 사용량과 함께 성능이 크게 향상되었습니다.
        </p>
        <p class="mt-4 px-4 text-base">
            문제가 있거나 제안 사항이 있으시면,
            <a class="text-accent-500 hover:underline"
            href="https://github.com/MaccolSolZico/loa-logs-kr/issues" target="_blank">이슈</a>를 열거나 <a class="text-accent-500 hover:underline" href="https://discord.gg/ybujC3sjMy"
            target="_blank"><code>Discord</code></a>에 메시지를 보내주세요.
        </p>

        <p class="mt-4 px-4 text-base">한국서버 개발자에게 기프티콘을 선물해서 지원할 수 있습니다.</p>
        
        <a href="https://open.kakao.com/me/meter" target="_blank"><img class="mt-2 px-4" src="/kakaotalk.png"
            alt="Kakao Talk" width="100"/></a>

        <p class="mt-4 px-4">
            현재 버전:
            {#await getVersion()}
            v
            {:then version}
            v{version}
            {/await}
        </p>
    </div>
</div>