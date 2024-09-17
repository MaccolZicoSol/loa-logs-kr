<script lang="ts">
    import { tooltip } from "$lib/utils/tooltip";

    export let meterSettings: any;
    export let hasBackAttacks = true;
    export let hasFrontAttacks = true;
    export let anySupportBrand = false;
    export let anySupportBuff = false;
    export let anySupportIdentity = false;
</script>

<th class="w-7 px-2 font-normal" />
<th class="w-14 px-2 text-left font-normal" />
<th class="w-full" />
{#if meterSettings.breakdown.damage}
    <th class="w-14 font-normal" use:tooltip={{ content: "입힌 피해량" }}>DMG</th>
{/if}
{#if meterSettings.breakdown.dps}
    <th class="w-14 font-normal" use:tooltip={{ content: "초당 피해량" }}>DPS</th>
{/if}
{#if meterSettings.breakdown.damagePercent}
    <th class="w-12 font-normal" use:tooltip={{ content: "피해량 %" }}>D%</th>
{/if}
{#if meterSettings.breakdown.critRate}
    <th class="w-14 font-normal" use:tooltip={{ content: "치명타 %" }}>CRIT</th>
{/if}
{#if meterSettings.breakdown.critDmg}
    <th class="w-14 font-normal" use:tooltip={{ content: "치명타 피해량 %" }}>CDMG</th>
{/if}
{#if hasFrontAttacks && meterSettings.breakdown.frontAtk}
    {#if meterSettings.positionalDmgPercent}
    <th class="w-14 font-normal" use:tooltip={{ content: "헤드 어택으로 인한 피해량 %" }}>F.A</th>
    {:else}
    <th class="w-14 font-normal" use:tooltip={{ content: "헤드 어택 %" }}>F.A</th>
    {/if}
{/if}
{#if hasBackAttacks && meterSettings.breakdown.backAtk}
    {#if meterSettings.positionalDmgPercent}
    <th class="w-14 font-normal" use:tooltip={{ content: "백 어택으로 인한 피해량 %" }}>B.A</th>
    {:else}
    <th class="w-14 font-normal" use:tooltip={{ content: "백 어택 %" }}>B.A</th>
    {/if}
{/if}
{#if anySupportBuff && meterSettings.breakdown.percentBuffBySup}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 공격력 증가 버프로 증가된 피해량 %" }}>Buff%</th>
{/if}
{#if anySupportBrand && meterSettings.breakdown.percentBrand}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 낙인 스킬로 증가된 피해량 %" }}>B%</th>
{/if}
{#if anySupportIdentity && meterSettings.breakdown.percentIdentityBySup}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 아이덴티티로 증가된 피해량 %" }}>Iden%</th>
{/if}
{#if meterSettings.breakdown.avgDamage}
    <th class="w-14 font-normal" use:tooltip={{ content: "스킬 타격당 평균 피해량" }}>APH</th>
{/if}
{#if meterSettings.breakdown.avgDamage}
    <th class="w-14 font-normal" use:tooltip={{ content: "스킬 시전당 평균 피해량" }}>APC</th>
{/if}
{#if meterSettings.breakdown.maxDamage}
    <th class="w-14 font-normal" use:tooltip={{ content: "스킬 타격당 최대 피해량" }}>MaxH</th>
{/if}
{#if meterSettings.breakdown.maxDamage}
    <th class="w-14 font-normal" use:tooltip={{ content: "스킬 시전당 최대 피해량" }}>MaxC</th>
{/if}
{#if meterSettings.breakdown.casts}
    <th class="w-12 font-normal" use:tooltip={{ content: "총 시전" }}>Casts</th>
{/if}
{#if meterSettings.breakdown.cpm}
    <th class="w-12 font-normal" use:tooltip={{ content: "분당 시전" }}>CPM</th>
{/if}
{#if meterSettings.breakdown.hits}
    <th class="w-12 font-normal" use:tooltip={{ content: "총 타격" }}>Hits</th>
{/if}
{#if meterSettings.breakdown.hpm}
    <th class="w-12 font-normal" use:tooltip={{ content: "분당 타격" }}>HPM</th>
{/if}
