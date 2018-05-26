"use strict"
const fs = require(`fs`);
const visit = require(`unist-util-visit`);

const getPageDir = ({ parent }) => parent.split(" ").shift().split("/").slice(0, -1).join("/");
const escape = txt => txt.replace(/"/g, '&quot;');

const MARKDOWN_TAG = "vega";

module.exports = (
  {
    markdownNode,
    markdownAST,
  },
) => {
  visit(markdownAST, `inlineCode`, node => {
    const { value } = node;

    if (value.startsWith(`${MARKDOWN_TAG}:`)) {
      const dir = getPageDir(markdownNode);
      const file = value.split(':').pop();
      const path = `${dir}/${file}`;

      if (!fs.existsSync(path)) {
        throw Error(`Invalid file specified; no such file "${path}"`);
      }

      const spec = fs.readFileSync(path, `utf8`);

      node.type = `html`;
      node.value = `<vega spec="${escape(spec)}" />`;
    }
  })

  return markdownAST;
};

export { default as Vega, KEY } from "./Vega";
