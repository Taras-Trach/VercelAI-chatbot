import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const components = {
  // Custom component for handling specific custom tags or formatting
  br: () => <br />,
  // Add other custom components as needed
};

export const MarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col">
      <Markdown remarkPlugins={[remarkGfm]} components={components}>
        {text}
      </Markdown>
    </div>
  );
};
