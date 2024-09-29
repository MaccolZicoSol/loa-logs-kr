<script lang="ts">
    import { formatDurationFromS } from "$lib/utils/numbers";
    import { settings } from "$lib/utils/settings";
    import SettingItem from "./SettingItem.svelte";

</script>
<div class="flex flex-col space-y-4 divide-y-[1px]">
    <div class="mt-4 flex flex-col space-y-2 px-2">
        <label class="flex flex-col pb-4 pt-2">
            <div class="flex items-center justify-between px-2">
                <div class="pb-2">
                    <div class="text-gray-100">최소 전투 소요 시간</div>
                    <div class="text-xs text-gray-300">
                        지정된 시간보다 긴 전투만 표시합니다.
                    </div>
                </div>
                <div class="rounded bg-zinc-700 px-2 py-1">
                    {formatDurationFromS($settings.logs.minEncounterDuration)}
                </div>
            </div>
            <input
                type="range"
                bind:value={$settings.logs.minEncounterDuration}
                class="accent-accent-700"
                list="markers"
                min="0"
                max="300"
                step="10" />
            <datalist id="markers">
                {#each Array.from({ length: 11 }, (_, i) => i * 30) as i}
                    <option value={i} />
                {/each}
            </datalist>
        </label>
        <SettingItem
            name="상단 축약"
            description="상단에있는 총 피해량과 총 DPS 수치를 축약해서 표시합니다."
            bind:setting={$settings.logs.abbreviateHeader} />
        <SettingItem
            name="파티 피해량 분리"
            description="파티가 입힌 피해량을 위해 플레이어를 각자의 파티로 나눕니다."
            bind:setting={$settings.logs.splitPartyDamage} />
        <SettingItem
            name="파티 버프 분리"
            description="파티 버프를 위해 플레이어를 각자의 파티로 나눕니다."
            bind:setting={$settings.logs.splitPartyBuffs} />
        <SettingItem
            name="죽은 시간"
            description="파티원이 죽고 경과한 시간을 표시합니다."
            bind:setting={$settings.logs.deathTime} />
        <SettingItem
            name="피해량"
            description="현재 전투에서 플레이어가 입힌 피해량을 표시합니다."
            bind:setting={$settings.logs.damage} />
        <SettingItem
            name="피해량 %"
            description="공대에 대한 플레이어의 피해 비율을 표시합니다."
            bind:setting={$settings.logs.damagePercent} />
        <SettingItem
            name="DPS"
            description="초당 피해량을 표시합니다."
            bind:setting={$settings.logs.dps} />
        <SettingItem
            name="치명타 비율"
            description="치명타 비율을 표시합니다."
            bind:setting={$settings.logs.critRate} />
        <SettingItem
            name="치명타 피해량"
            description="치명타 피해량의 비율을 표시합니다."
            bind:setting={$settings.logs.critDmg} />
        <SettingItem
            name="헤드 어택"
            description="헤드 어택 비율을 표시합니다."
            bind:setting={$settings.logs.frontAtk} />
        <SettingItem
            name="백 어택"
            description="백 어택 비율을 표시합니다."
            bind:setting={$settings.logs.backAtk} />
        <SettingItem
            name="치명타 피해량 %"
            description="치명타 피해량 비율을 타격 수가 아닌 총 피해량의 비율로 표시합니다."
            bind:setting={$settings.logs.critDmgPercent} />
        <SettingItem
            name="위치별 피해량 %"
            description="헤드/백 어택의 비율을 타격 수가 아닌 총 피해량의 비율로 표시합니다."
            bind:setting={$settings.logs.positionalDmgPercent} />
        <SettingItem
            name="서폿 버프 %"
            description="공격력 증가 버프로 증가된 피해량의 비율을 표시합니다."
            bind:setting={$settings.logs.percentBuffBySup} />
        <SettingItem
            name="서폿 낙인 %"
            description="낙인 스킬(예: 사운드 쇼크, 빛의 충격, 난치기 등)로 증가된 피해량의 비율을 표시합니다."
            bind:setting={$settings.logs.percentBrand} />
        <SettingItem
            name="서폿 아이덴티티 %"
            description="아이덴티티로 증가된 피해량의 비율을 표시합니다."
            bind:setting={$settings.logs.percentIdentityBySup} />
        <SettingItem
            name="서폿 시너지 %"
            description="서폿 시너지로 증가된 피해량의 비율을 표시합니다."
            bind:setting={$settings.logs.ssyn} />
        <SettingItem
            name="카운터"
            description="카운터 친 수를 표시합니다."
            bind:setting={$settings.logs.counters} />
    </div>
    <div class="pt-4">
        <div>RDPS</div>
        <div class="mt-4 flex flex-col space-y-2 px-2">
            <SettingItem
                name="RDPS 파티 분리"
                description="RDPS를 위해 플레이어를 각자의 파티로 나눕니다."
                bind:setting={$settings.logs.rdpsSplitParty} />
            <SettingItem
                name="기여받은 RDPS"
                description="다른 플레이어로부터 기여받은 총 피해량"
                bind:setting={$settings.logs.rdpsDamageReceived} />
            <SettingItem
                name="기여한 RDPS"
                description="다른 플레이어에게 기여한 총 피해량"
                bind:setting={$settings.logs.rdpsDamageGiven} />
            <SettingItem
                name="피해 기여도 %"
                description="자신의 버프가 아닌 다른 플레이어의 버프로 증가된 피해량 비율"
                bind:setting={$settings.logs.rdpsContribution} />
            <SettingItem
                name="서폿 피해 기여도 %"
                description="서폿 버프로 증가된 피해량 비율"
                bind:setting={$settings.logs.rdpsSContribution} />
            <SettingItem
                name="딜러 피해 기여도 %"
                description="딜러 버프로 증가된 피해량 비율"
                bind:setting={$settings.logs.rdpsDContribution} />
            <SettingItem
                name="시너지 %"
                description="자신의 시너지를 제외한 모든 시너지로 증가된 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.rdpsSyn} />
            <SettingItem
                name="서폿 시너지 %"
                description="서폿 시너지로 증가된 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.rdpsSSyn} />
            <SettingItem
                name="딜러 시너지 %"
                description="딜러 시너지로 증가된 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.rdpsDSyn} />
        </div>
    </div>
    <div class="pt-4">
        <div>스킬 세부 사항</div>
        <div class="mt-4 flex flex-col space-y-2 px-2">
            <SettingItem
                name="스킬 피해량"
                description="스킬이 입힌 총 피해량을 표시합니다."
                bind:setting={$settings.logs.breakdown.damage} />
            <SettingItem
                name="스킬 피해량 %"
                description="모든 스킬에 대한 상대적 피해량 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.damagePercent} />
            <SettingItem
                name="스킬 DPS"
                description="스킬의 초당 피해량을 표시합니다."
                bind:setting={$settings.logs.breakdown.dps} />
            <SettingItem
                name="스킬 치명타 비율"
                description="스킬의 치명타 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.critRate} />
            <SettingItem
                name="스킬 치명타 피해량"
                description="스킬의 피해량 중 치명타 피해량 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.critDmg} />
            <SettingItem
                name="스킬 헤드 어택"
                description="스킬의 헤드 어택 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.frontAtk} />
            <SettingItem
                name="스킬 백 어택"
                description="스킬의 백 어택 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.backAtk} />
            <SettingItem
                name="서폿 버프 %"
                description="공격력 증가 버프로 증가된 스킬 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.percentBuffBySup} />
            <SettingItem
                name="서폿 낙인 %"
                description="낙인 스킬(예: 사운드 쇼크, 빛의 충격, 난치기 등)로 증가된 스킬 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.percentBrand} />
            <SettingItem
                name="서폿 아이덴티티 %"
                description="아이덴티티로 증가된 스킬 피해량의 비율을 표시합니다."
                bind:setting={$settings.logs.breakdown.percentIdentityBySup} />
            <SettingItem
                name="스킬 평균 피해량"
                description="스킬이 입힌 평균 피해량를 표시합니다."
                bind:setting={$settings.logs.breakdown.avgDamage} />
            <SettingItem
                name="스킬 최대 피해량"
                description="스킬이 입힌 최대 피해량를 표시합니다."
                bind:setting={$settings.logs.breakdown.maxDamage} />
            <SettingItem
                name="스킬 시전 횟수"
                description="스킬의 총 시전 횟수를 표시합니다(참고: 취소된 스킬도 시전 카운팅됨)."
                bind:setting={$settings.logs.breakdown.casts} />
            <SettingItem
                name="스킬 분당 시전 횟수"
                description="스킬의 분당 시전 횟수를 표시합니다."
                bind:setting={$settings.logs.breakdown.cpm} />
            <SettingItem
                name="스킬 타격 수"
                description="스킬의 타격 수를 표시합니다(주: 다단 히트 스킬의 각 틱도 타격으로 카운팅됨)."
                bind:setting={$settings.logs.breakdown.hits} />
            <SettingItem
                name="스킬 분당 타격 수"
                description="스킬의 분당 타격 수를 표시합니다."
                bind:setting={$settings.logs.breakdown.hpm} />
        </div>
    </div>
</div>