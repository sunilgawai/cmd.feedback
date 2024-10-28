"use client";

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

interface CodeProps {
  code: string;
  language: string;
  className?: string;
}

export function Code({ code, language, className }: CodeProps) {
  const { theme: applicationTheme } = useTheme();

  return (
    <Highlight
      theme={applicationTheme === "dark" ? themes.nightOwl : themes.github}
      code={code}
      language={language as any}
    >
      {({ className: preClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${preClassName} ${className} overflow-x-auto p-4 rounded-lg text-sm`}
          style={style}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
}
