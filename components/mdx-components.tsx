function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export const mdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = String(children);
    return (
      <h2 id={headingId(text)} {...props}>
        {children}
      </h2>
    );
  },
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="article-paragraph" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="article-list" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="article-list" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="article-list-item" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => <blockquote className="article-quote" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="article-link" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="article-code-block" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="article-code" {...props} />
};
