"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sync_js_1 = __importDefault(require("csv-parse/lib/sync.js"));
const fs_1 = __importDefault(require("fs"));
const synonyms = sync_js_1.default(fs_1.default.readFileSync("src/synonyms.txt", "utf-8").trim().replace(/\n\n/g, "\n"));
const synonymGroupIDs = [
    ...new Set(synonyms.map(([groupID, taigenYohgen]) => `${groupID}-${taigenYohgen}`)),
];
let synonymGroups = synonymGroupIDs.map((synonymGroupID) => {
    const words = [];
    return {
        id: synonymGroupID,
        words,
    };
});
synonyms.forEach(([groupID, taigenYohgen, extraction, _lexemeID, lexemeType, abbreviation, orthographicalVariant, _subject, word,]) => {
    if (extraction !== "0" ||
        lexemeType !== "0" ||
        abbreviation !== "0" ||
        orthographicalVariant !== "0") {
        return;
    }
    const synonymGroup = synonymGroups.find((synonymGroup) => synonymGroup.id === `${groupID}-${taigenYohgen}`);
    if (!synonymGroup) {
        throw new Error(`Could not find synonym group ${groupID}-${taigenYohgen}`);
    }
    synonymGroup.words.push(word);
});
synonymGroups = synonymGroups.filter(({ words }) => words.length >= 2);
fs_1.default.writeFileSync("src/synonymGroups.json", JSON.stringify(synonymGroups));
