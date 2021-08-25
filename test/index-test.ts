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
          message: "他の表現　ナレッジ、見聞、見聞き",
          index: 3,
          line: 1,
          column: 4,
          severity: 2,
        },
        {
          type: "lint",
          ruleId: "ja-sudachi-synonym-suggestion",
          message: "他の表現　ナレッジマネジメント、知識管理",
          index: 3,
          line: 1,
          column: 4,
          severity: 2,
        },
        {
          type: "lint",
          ruleId: "ja-sudachi-synonym-suggestion",
          message: "他の表現　マネージメント",
          index: 5,
          line: 1,
          column: 6,
          severity: 2,
        },
      ],
    },
  ],
});
