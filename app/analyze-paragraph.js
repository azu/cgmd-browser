// MIT © 2017 azu
"use strict";
const visit = require('unist-util-visit');
const TermExtract = require('@azu/term-extract-js');
const toString = require('mdast-util-to-string');
const fs = require("fs");
const unified = require('unified');
const remarkParser = require('remark-parse');
const markdownParser = unified()
    .use(remarkParser)

/**
 * @param filepath
 * @returns {Promise<{ paragraphText:string, analyzedResults: []}[]>}
 */
module.exports = function(filepath) {
    const te = new TermExtract({
        frequency: 'term-frequency'
    });
    return te.ready().then(() => {
        const text = fs.readFileSync(filepath, "utf-8");
        let tree;
        try {
            tree = markdownParser.parse(text);
        } catch (err) {
            console.error("ERROR", err);
        }
        const results = [];
        visit(tree, 'paragraph', visitor);

        function visitor(node) {
            const normalizedText = toString(node);
            const mapList = te.calculateFrequency(normalizedText);
            results.push({
                paragraphText: normalizedText,
                analyzedResults: mapList
            });
        }

        return results;
    });
};