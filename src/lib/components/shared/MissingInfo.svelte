<script lang="ts">
    import { missingInfo } from "$lib/utils/stores";
    import { tooltip } from "$lib/utils/tooltip";

</script>

{#if $missingInfo}
    <div
        class="text-left font-normal text-red-400 whitespace-nowrap"
        use:tooltip={{
            content:
                "미터기를 늦게 켜서 로컬 플레이어 정보를 찾을 수 없습니다. 다른 캐릭터로 접속 또는 캐선창에서 다시 접속해주세요."
        }}>
        경고: 정보 없음
    </div>
{/if}
