import { parser } from "./juri";
import { LRLanguage } from "@codemirror/language";
import { styleTags, tags as t } from "@codemirror/highlight";
import { LanguageSupport } from "@codemirror/language"
import { completeFromList } from "@codemirror/autocomplete"

let parserWithMetadata = parser.configure({
    props: [
        styleTags({
            Identifier: t.identifier,
            Parameter: t.parameter,
            LineComment: t.lineComment,
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

const keywords = ["if", "fun", "repeat", "iterate", "init", "break", ]
let mappedKW = []
keywords.forEach(e => mappedKW.push({label: e, type: "keyword"}))
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