const createMDX = require("@next/mdx");

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-math"]],
    rehypePlugins: [["rehype-katex"]],
  },
});

const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: __dirname,
  },
};

module.exports = withMDX(nextConfig);
