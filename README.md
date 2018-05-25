# gatsby-remark-vega

Adds the ability to include a [Vega](https://vega.github.io/vega/) visualization from a markdown file.

## Usage

In your markdown, you can include `vega` JSON files like so:
```

`vega:chart.json`

```

The json file should sit in the same folder as the markdown file.

## Installation

`npm install gatsby-transformer-remark gatsby-remark-vega` or `yarn add gatsby-transformer-remark gatsby-remark-vega`

The process for installing this plugin in Gatsby is similar to [`gatsby-remark-component`](https://github.com/hebilicious/gatsby-remark-component).

### 1.
Include the plugin in `gatsby-config.js`, as a plugin option for `gatsby-transformer-remark`:
```
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        `gatsby-remark-vega`,
      ],
    },
  },
];
```

### 2.
In your template, follow the same technique as showcased in `gatsby-remark-component`:

```
// within your markdown template
import rehypeReact from "rehype-react"
import { MyComponent } from "../pages/my-component"

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { "my-component": MyComponent }
}).Compiler
```

### 3.
Where you render your markdown, replace:

```
<div dangerouslySetInnerHTML={{ __html: post.html }} />
```

with

```
<div>{renderAst(post.htmlAst)}</div>
```

### 4.
In your graphql query, make sure to select `htmlAst`:

```
...
markdownRemark(fields: { slug: { eq: $slug } }) {
 htmlAst // previously `html`
 ...
}
```
