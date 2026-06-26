import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Renders agent descriptions, which may contain inline Markdown (links, bold,
// etc.). We scope the allowed node types to inline prose so descriptions stay
// plain text rather than turning into full documents.
export function AgentDescription({ children }: { children: string }) {
  return (
    <ReactMarkdown
      components={{
        // Descriptions live inside a <p>, so render Markdown block elements as
        // inline equivalents to avoid invalid <p>-in-<p> nesting.
        a: ({ href, children }) => (
          <a
            className="text-brand underline-offset-4 hover:underline"
            href={href}
            rel="noreferrer noopener"
            target="_blank"
          >
            {children}
          </a>
        ),
        p: ({ children }) => <span>{children}</span>,
      }}
      remarkPlugins={[remarkGfm]}
      unwrapDisallowed
    >
      {children}
    </ReactMarkdown>
  )
}
