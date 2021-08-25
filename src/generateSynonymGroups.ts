import csvParseSync from "csv-parse/lib/sync.js";
import fs from "fs";

const synonyms = csvParseSync(
  fs.readFileSync("lib/synonyms.txt", "utf-8").trim().replace(/\n\n/g, "\n")
);

const synonymGroupIDs = [
  ...new Set(
    synonyms.map(
      ([groupID, taigenYohgen]: [string, string]) =>
        `${groupID}-${taigenYohgen}`
    )
  ),
];

let synonymGroups = synonymGroupIDs.map((synonymGroupID) => {
  const words: string[] = [];

  return {
    id: synonymGroupID,
    words,
  };
});

synonyms.forEach(
  ([
    groupID,
    taigenYohgen,
    _extraction,
    _lexemeID,
    lexemeType,
    abbreviation,
    orthographicalVariant,
    _subject,
    word,
  ]: [
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string,
    string
  ]) => {
    const synonymGroup = synonymGroups.find(
      (synonymGroup) => synonymGroup.id === `${groupID}-${taigenYohgen}`
    );

    if (!synonymGroup) {
      throw new Error(
        `Could not find synonym group ${groupID}-${taigenYohgen}`
      );
    }

    if (
      lexemeType !== "0" ||
      abbreviation !== "0" ||
      orthographicalVariant !== "0"
    ) {
      return;
    }

    synonymGroup.words.push(word);
  }
);

synonymGroups = synonymGroups.filter(({ words }) => words.length >= 2);

fs.writeFileSync("src/synonymGroups.json", JSON.stringify(synonymGroups));
