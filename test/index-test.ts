import TextLintTester from "textlint-tester";
import rule from "../src/index";

const tester = new TextLintTester();

tester.run("ja-sudachi-synonym-suggestion", rule, {
  invalid: [
    {
      text: "あいう知識経営えお",
      errors: [
        {
          type: "lint",
          ruleId: "ja-sudachi-synonym-suggestion",
          message: "他の表現　知識 → ナレッジ",
          index: 3,
          line: 1,
          column: 4,
          severity: 2,
        },
        {
          type: "lint",
          ruleId: "ja-sudachi-synonym-suggestion",
          message: "他の表現　知識経営 → ナレッジマネジメント、知識管理",
          index: 3,
          line: 1,
          column: 4,
          severity: 2,
        },
        {
          type: "lint",
          ruleId: "ja-sudachi-synonym-suggestion",
          message: "他の表現　経営 → マネージメント",
          index: 5,
          line: 1,
          column: 6,
          severity: 2,
        },
      ],
    },
  ],
});
