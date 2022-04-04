import { parser } from "./juri.js";
import { LRLanguage } from "@codemirror/language";
import { styleTags, tags as t,Tag,  HighlightStyle} from "@codemirror/highlight";
import { LanguageSupport } from "@codemirror/language"
import { completeFromList } from "@codemirror/autocomplete"

const keywords = ["fun", "repeat", "iterate", "init", "break", "operator", "then", "break"];
const IF = Tag.define(t.controlKeyword);
const ListIdentifier = Tag.define(t.variableName);
const Parameter = Tag.define(t.variableName);
const LiteralCharList = Tag.define(t.string);
const ListLengthOperator = Tag.define(t.operator);

let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            if : IF,
            ListIdentifier : ListIdentifier,
            fun: t.keyword,
            iterate : t.keyword,
            repeat: t.keyword,
            break: t.keyword,
            init: t.keyword,
            as: t.keyword,
            to: t.keyword,
            and : t.keyword,
            or : t.keyword,
            not : t.keyword,
            then: t.keyword,
            return: t.keyword,
            skip: t.keyword,
            cry: t.keyword,
            times: t.keyword,
            ListLengthOperator: ListLengthOperator,
            operator: t.keyword,
            Operator: t.operator,
            //Identifier: t.name,
            Parameter: Parameter,
            LineComment: t.lineComment,
            LiteralCharList : LiteralCharList,
            Number: t.number,
            "( ) [ ]": t.paren
        })
    ]
})




const juriLang = LRLanguage.define({
    parser: parserWithMetadata,
    languageData: {
        commentTokens: { line: "#" }
    }
})

type kw = {
    label: string, 
    type: string
}
let mappedKW = keywords.reduce((acc : kw[], curr) => [...acc, {label: curr, type: "keyword"}], []);
const autocompletion = juriLang.data.of({
    autocomplete: completeFromList([
        ...mappedKW,
        { label: "print", type: "function" },
        { label: "input", type: "function" }
    ])
})


export function juri() {
    return new LanguageSupport(juriLang, [autocompletion])
}

const highlightStyle = HighlightStyle.define([
    {tag: IF, color: "#FF6450"},
    {tag: ListIdentifier, color: "#9DB"},
    {tag: LiteralCharList, color: "#9DB"},
    {tag: ListLengthOperator, color: "#FC0"},
    {tag: Parameter, color: "#cfc"},
    {tag: t.number, color: "#efa"},
    {tag: t.operator, color: "#64FFFF"},
    {tag: t.keyword, color: "#00AAFF"},
    {tag: t.paren, color: "#bbf"},
    {tag: t.comment, color: "#969696", fontStyle: "italic"}
  ])
export {highlightStyle};