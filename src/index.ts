import type { TextlintRuleReporter } from "@textlint/types";
import { TokenizeMode, tokenize } from "sudachi";
import synonymGroups from "./synonymGroups.json";

const reporter: TextlintRuleReporter = (context) => {
  const { getSource, report, RuleError, Syntax } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);
      const tokens = JSON.parse(tokenize(text, TokenizeMode.C)) as {surface: string}[];
      let index = 0;

      tokens.forEach((token) => {
        synonymGroups.forEach((synonymGroup) =>
          synonymGroup.words.forEach((word) => {
            if (token.surface !== word) {
              return;
            }

            const otherWords = synonymGroup.words.filter(
              (otherWord) => otherWord !== word
            );

            report(
              node,
              new RuleError(`他の表現　${word} → ${otherWords.join("、")}`, {
                index,
              })
            );

            index += token.surface.length;
          })
        );
      });
    },
  };
};

export default reporter;
