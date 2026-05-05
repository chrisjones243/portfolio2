"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { Box } from "@chakra-ui/react";

// Inline styles use CSS vars that Chakra exposes on :root
const prose = {
  h1: { fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 900, marginBottom: "1rem", marginTop: "2.5rem", lineHeight: 1.2 },
  h2: { fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)", fontWeight: 900, marginBottom: "0.75rem", marginTop: "2rem", lineHeight: 1.25 },
  h3: { fontSize: "clamp(1rem, 2vw, 1.35rem)", fontWeight: 700, marginBottom: "0.5rem", marginTop: "1.75rem", lineHeight: 1.3 },
  p: { fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.8, marginBottom: "1.25rem" },
  a: { textDecoration: "underline", textUnderlineOffset: "3px", opacity: 0.8 },
  ul: { paddingLeft: "1.5rem", marginBottom: "1.25rem", listStyleType: "disc" },
  ol: { paddingLeft: "1.5rem", marginBottom: "1.25rem", listStyleType: "decimal" },
  li: { fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)", lineHeight: 1.8, marginBottom: "0.25rem" },
  hr: { borderColor: "rgba(88,88,88,0.4)", margin: "2rem 0" },
  blockquote: { borderLeft: "3px solid #585858", paddingLeft: "1rem", opacity: 0.75, margin: "1.5rem 0", fontStyle: "italic" },
  code_inline: { fontFamily: "monospace", fontSize: "0.875em", padding: "0.15em 0.35em", borderRadius: "4px", background: "rgba(88,88,88,0.15)" },
  pre: { fontFamily: "monospace", fontSize: "0.875em", padding: "1rem 1.25rem", borderRadius: "8px", background: "rgba(88,88,88,0.12)", overflowX: "auto", marginBottom: "1.5rem", border: "1px solid rgba(88,88,88,0.25)" },
  img: { maxWidth: "75%", borderRadius: "8px", marginBottom: "1.25rem", border: "1px solid rgba(88,88,88,0.25)", display: "block", backgroundColor: "#fff", padding: "8px" },
  table: { width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem", fontSize: "0.95rem" },
  th: { borderBottom: "1px solid #585858", padding: "0.5rem 0.75rem", textAlign: "left", fontWeight: 600 },
  td: { borderBottom: "1px solid rgba(88,88,88,0.3)", padding: "0.5rem 0.75rem" },
};

export default function MarkdownRenderer({ markdown }) {
  if (!markdown) return null;

  return (
    <Box>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeSlug, rehypeRaw, rehypeKatex]}
        components={{
          h1: ({ node, ...props }) => <h1 style={prose.h1} {...props} />,
          h2: ({ node, ...props }) => <h2 style={prose.h2} {...props} />,
          h3: ({ node, ...props }) => <h3 style={prose.h3} {...props} />,
          p: ({ node, children, ...props }) => {
            // If this paragraph contains a block-level element (e.g. pre from a code block),
            // render as a div to avoid invalid <p><pre> nesting and hydration errors.
            const hasBlock = node?.children?.some(
              (c) => c.type === "element" && ["pre", "div", "table", "ul", "ol", "blockquote", "video"].includes(c.tagName)
            );
            return hasBlock
              ? <div style={prose.p}>{children}</div>
              : <p style={prose.p} {...props}>{children}</p>;
          },
          a: ({ node, ...props }) => <a style={prose.a} target="_blank" rel="noopener noreferrer" {...props} />,
          ul: ({ node, ...props }) => <ul style={prose.ul} {...props} />,
          ol: ({ node, ...props }) => <ol style={prose.ol} {...props} />,
          li: ({ node, ...props }) => <li style={prose.li} {...props} />,
          hr: ({ node, ...props }) => <hr style={prose.hr} {...props} />,
          blockquote: ({ node, ...props }) => <blockquote style={prose.blockquote} {...props} />,
          pre: ({ node, ...props }) => <pre style={prose.pre} {...props} />,
          code: ({ node, className, children, ...props }) => {
            // Block code is always wrapped in <pre> by react-markdown; inline code has no className and no newline
            const isInline = !className && !String(children).includes("\n");
            return isInline
              ? <code style={prose.code_inline} {...props}>{children}</code>
              : <code className={className} style={{ fontFamily: "monospace", fontSize: "0.875em" }} {...props}>{children}</code>;
          },
          img: ({ node, ...props }) => {
            const src = props.src ?? "";
            // Skip placeholder or relative URLs that would hit the Next.js router
            const isValid = src.startsWith("http://") || src.startsWith("https://") || src.startsWith("/");
            if (!isValid) return null;
            return <img style={prose.img} alt={props.alt ?? ""} {...props} />;
          },
          video: ({ node, style, ...props }) => (
            <video
              style={{ width: "75%", borderRadius: "8px", marginBottom: "1.25rem", display: "block" }}
              controls
              {...props}
            />
          ),
          table: ({ node, ...props }) => <table style={prose.table} {...props} />,
          th: ({ node, ...props }) => <th style={prose.th} {...props} />,
          td: ({ node, ...props }) => <td style={prose.td} {...props} />,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
