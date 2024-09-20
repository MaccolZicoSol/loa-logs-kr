<script lang="ts">
    import { settings } from "$lib/utils/settings";
    import { tooltip } from "$lib/utils/tooltip";

    export let anyDead: boolean;
    export let multipleDeaths: boolean;
    export let anyFrontAtk: boolean;
    export let anyBackAtk: boolean;
    export let anySupportBuff: boolean;
    export let anySupportIdentity: boolean;
    export let anySupportBrand: boolean;
    export let anyRdpsData: boolean;
    export let isSolo: boolean;
</script>

{#if anyDead && $settings.logs.deathTime}
    <th class="w-18 font-normal" use:tooltip={{ content: "죽은 시간" }}>Dead for</th>
{/if}
{#if multipleDeaths && $settings.logs.deathTime}
    <th class="w-16 font-normal" use:tooltip={{ content: "죽음" }}>Deaths</th>
{/if}
{#if $settings.logs.damage}
    <th class="w-16 font-normal" use:tooltip={{ content: "입힌 피해량" }}>DMG</th>
{/if}
{#if $settings.logs.dps}
    <th class="w-16 font-normal" use:tooltip={{ content: "초당 피해량" }}>DPS</th>
{/if}
{#if !isSolo && $settings.logs.damagePercent}
    <th class="w-14 font-normal" use:tooltip={{ content: "피해량 %" }}>D%</th>
{/if}
{#if $settings.logs.critRate}
    <th class="w-14 font-normal" use:tooltip={{ content: "치명타 %" }}>CRIT</th>
{/if}
{#if $settings.logs.critDmg}
    <th class="w-14 font-normal" use:tooltip={{ content: "치명타 피해량 %" }}>CDMG </th>
{/if}
{#if anyFrontAtk && $settings.logs.frontAtk}
    <th class="w-14 font-normal" use:tooltip={{ content: "헤드 어택 %" }}>F.A</th>
{/if}
{#if anyBackAtk && $settings.logs.backAtk}
    <th class="w-14 font-normal" use:tooltip={{ content: "백 어택 %" }}>B.A</th>
{/if}
{#if anySupportBuff && $settings.logs.percentBuffBySup}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 공격력 증가 버프로 증가된 피해량 %" }}>Buff% </th>
{/if}
{#if anySupportBrand && $settings.logs.percentBrand}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 낙인 스킬로 증가된 피해량 %" }}>B% </th>
{/if}
{#if anySupportIdentity && $settings.logs.percentIdentityBySup}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 아이덴티티로 증가된 피해량 %" }}>Iden% </th>
{/if}
{#if anyRdpsData && $settings.logs.ssyn}
    <th class="w-14 font-normal" use:tooltip={{ content: "서폿 아이덴티티로 증가된 피해량 %" }}>sSyn% </th>
{/if}
{#if $settings.logs.counters}
    <th class="w-14 font-normal" use:tooltip={{ content: "카운터" }}>CTR</th>
{/if}
