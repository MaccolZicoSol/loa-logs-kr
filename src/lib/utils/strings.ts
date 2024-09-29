import { estherMap } from "$lib/constants/esthers";
import type { Entity } from "$lib/types";
import { round2 } from "./numbers";
import { missingInfo } from "./stores";

export function isValidName(word: string) {
    // return /^\p{Lu}/u.test(word);
    return word;
}

export function removeUnknownHtmlTags(input: string) {
    input = input.replace(/<\$TABLE_SKILLFEATURE[^>]*\/>/g, "??");
    input = input.replace(/<\$CALC[^>]*\/>/g, "??");
    return input;
}

export function formatPlayerName(player: Entity, generalSettings: any): string {
    let playerName = player.name;
    const validName = isValidName(playerName);
    if (!validName) {
        missingInfo.set(true);
    }
    if (!validName || !generalSettings.showNames) {
        if (player.class) {
            playerName = player.class;
        } else {
            playerName = "";
        }
    }
    if (generalSettings.hideNames) {
        playerName = "";
    }
    if (generalSettings.showGearScore && player.gearScore > 0) {
        playerName = round2(player.gearScore, 2) + " " + playerName;
    }
    if (player.isDead) {
        playerName = "💀 " + playerName;
    }

    return playerName;
}

export function truncateString(str: string, len = 10): string {
    if (str.length > len) {
        return str.slice(0, len) + "...";
    }
    return str;
}

export function getSkillIcon(skillIcon: string): string {
    return encodeURIComponent("\\" + (skillIcon !== "" ? skillIcon : "unknown.png")) + queryParam;
}

export function getImagePath(path: string): string {
    return encodeURIComponent("\\" + path.replaceAll("/", "\\")) + queryParam;
}

export function getEstherFromNpcId(npcId: number): string {
    for (const esther of estherMap) {
        if (esther.npcs.includes(npcId)) return esther.name;
    }

    return "Unknown";
}

// this is used to invalidate caches when loading images
// change this value when images are updated
export const queryParam: string = "?194";
