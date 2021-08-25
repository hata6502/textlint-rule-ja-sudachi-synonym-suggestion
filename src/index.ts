import type { TextlintRuleReporter } from "@textlint/types";
import { tokenize } from "kuromojin";
import synonymGroups from "./synonymGroups.json";

const reporter: TextlintRuleReporter = (context) => {
  const { getSource, report, RuleError, Syntax } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);
      const tokens = await tokenize(text);

      tokens.forEach((token) => {
        synonymGroups.forEach((synonymGroup) =>
          synonymGroup.words.forEach((word) => {
            if (token.surface_form !== word) {
              return;
            }

            const otherWords = synonymGroup.words.filter(
              (otherWord) => otherWord !== word
            );

            report(
              node,
              new RuleError(`他の表現　${word} → ${otherWords.join("、")}`, {
                index: token.word_position - 1,
              })
            );
          })
        );
      });
    },
  };
};

export default reporter;
