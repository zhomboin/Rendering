function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function textFromChildren(children: React.ReactNode) {
  return Array.isArray(children) ? children.join(" ") : String(children ?? "");
}

export const mdxComponents = {
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = textFromChildren(children);
    return (
      <h2 id={headingId(text)} {...props}>
        {children}
      </h2>
    );
  },
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => <h3 className="article-subheading" {...props} />,
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => <p className="article-paragraph" {...props} />,
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => <ul className="article-list" {...props} />,
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => <ol className="article-list" {...props} />,
  li: (props: React.HTMLAttributes<HTMLLIElement>) => <li className="article-list-item" {...props} />,
  blockquote: (props: React.HTMLAttributes<HTMLElement>) => <blockquote className="article-quote" {...props} />,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a className="article-link" {...props} />,
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => <pre className="article-code-block" {...props} />,
  code: (props: React.HTMLAttributes<HTMLElement>) => <code className="article-code" {...props} />,
  figure: (props: React.HTMLAttributes<HTMLElement>) => <figure className="article-figure" {...props} />,
  figcaption: (props: React.HTMLAttributes<HTMLElement>) => <figcaption className="article-figcaption" {...props} />,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img className="article-image" loading="lazy" {...props} />
};
