"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sudachi_1 = require("sudachi");
const synonymGroups_json_1 = __importDefault(require("./synonymGroups.json"));
const reporter = (context) => {
    const { getSource, report, RuleError, Syntax } = context;
    return {
        [Syntax.Str](node) {
            return __awaiter(this, void 0, void 0, function* () {
                const text = getSource(node);
                const tokens = JSON.parse(sudachi_1.tokenize(text, sudachi_1.TokenizeMode.C));
                let index = 0;
                tokens.forEach((token) => {
                    synonymGroups_json_1.default.forEach((synonymGroup) => synonymGroup.words.forEach((word) => {
                        if (token.surface !== word) {
                            return;
                        }
                        const otherWords = synonymGroup.words.filter((otherWord) => otherWord !== word);
                        report(node, new RuleError(`他の表現　${word} → ${otherWords.join("、")}`, {
                            index,
                        }));
                        index += token.surface.length;
                    }));
                });
            });
        },
    };
};
exports.default = reporter;
