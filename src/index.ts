import type { TextlintRuleReporter } from "@textlint/types";
import synonymGroups from "./synonymGroups.json";

const reporter: TextlintRuleReporter = (context) => {
  const { getSource, report, RuleError, Syntax } = context;

  return {
    async [Syntax.Str](node) {
      const text = getSource(node);

      synonymGroups.forEach((synonymGroup) =>
        synonymGroup.words.forEach((word) => {
          const otherWords = synonymGroup.words.filter(
            (otherWord) => otherWord !== word
          );

          let index = -1;

          while ((index = text.indexOf(word, index + 1)) !== -1) {
            report(
              node,
              new RuleError(`他の表現　${word} → ${otherWords.join("、")}`, { index })
            );
          }
        })
      );
    },
  };
};

export default reporter;
