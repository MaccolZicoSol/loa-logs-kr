<script lang="ts">
    import { settings } from "$lib/utils/settings";
    import SettingItem from "./SettingItem.svelte";

    
</script>
<div class="flex flex-col space-y-4 divide-y-[1px]">
    <div class="mt-4 flex flex-col space-y-2 px-2">
        <SettingItem
            name="공격적인 버프만 표시"
            description="피해, 치명타, 공격 속도, 쿨다운 버프만 표시합니다. 이 설정을 비활성화하면 모든 버프가 표시됩니다."
            bind:setting={$settings.buffs.default} />
    </div>
</div>