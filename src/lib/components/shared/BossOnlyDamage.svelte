<script lang="ts">
    import { imagePath } from "$lib/utils/settings";
    import { getImagePath } from "$lib/utils/strings";
    import { tooltip } from "$lib/utils/tooltip";

    export let width = 1.5;
</script>

<img use:tooltip={{ content: "보스 전용 데미지" }} src="{$imagePath.path + getImagePath("icons/boss.png")}" alt="보스 전용 데미지" style="width: {width}rem;" />
