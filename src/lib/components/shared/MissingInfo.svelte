<script lang="ts">
    import { missingInfo } from "$lib/utils/stores";
    import { tooltip } from "$lib/utils/tooltip";

</script>

{#if $missingInfo}
    <div
        class="text-left font-normal text-red-400 whitespace-nowrap"
        use:tooltip={{
            content:
                "미터기를 늦게 켜서 로컬 플레이어 정보가 없습니다. 정보를 다시 불러올려면 다른 캐릭터로 접속 또는 캐선창에서 다시 접속하십시오."
        }}>
        경고: 정보 없음
    </div>
{/if}
