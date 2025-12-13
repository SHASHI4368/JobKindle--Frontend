export const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  const elements: any = [];
  let listItems: any[] = [];
  let nestedListItems: any[] = [];
  let listKey = 0;

  const flushNestedList = () => {
    if (nestedListItems.length > 0) {
      listItems.push(
        <ul key={`nested-${listKey++}`} className="ml-8 mt-2 space-y-1.5">
          {nestedListItems}
        </ul>
      );
      nestedListItems = [];
    }
  };

  const flushList = () => {
    flushNestedList();
    if (listItems.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-3 mb-5 ml-2">
          {listItems}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, i) => {
    const trimmedLine = line.trim();

    // Handle headers
    if (trimmedLine.startsWith("####")) {
      flushList();
      const content = trimmedLine.replace(/####/g, "").trim();
      elements.push(
        <h2
          key={i}
          className="text-xl font-bold mt-8 mb-5 text-gray-900 border-b-2 border-blue-100 pb-3"
        >
          {content}
        </h2>
      );
    } else if (trimmedLine.startsWith("###")) {
      flushList();
      const content = trimmedLine.replace(/###/g, "").trim();
      elements.push(
        <h3
          key={i}
          className="text-lg font-semibold mt-8 mb-4 text-gray-800 flex items-center gap-2 pl-1"
        >
          <span className="text-blue-500">▶</span>
          {content}
        </h3>
      );
    } else if (trimmedLine.startsWith("##")) {
      flushList();
      const content = trimmedLine.replace(/##/g, "").trim();
      elements.push(
        <h2
          key={i}
          className="text-xl font-bold mt-8 mb-5 text-gray-900 border-b-2 border-blue-100 pb-3"
        >
          {content}
        </h2>
      );
    } else if (trimmedLine.startsWith("#")) {
      flushList();
      const content = trimmedLine.replace(/#/g, "").trim();
      elements.push(
        <h2
          key={i}
          className="text-xl font-bold mt-8 mb-5 text-gray-900 border-b-2 border-blue-100 pb-3"
        >
          {content}
        </h2>
      );
    }
    // Handle bold with bullets (convert ** markers)
    else if (trimmedLine.match(/^\*\s+\*\*.*\*\*/)) {
      flushNestedList();
      const content = trimmedLine
        .replace(/^\*\s+/, "")
        .replace(/\*\*/g, "")
        .trim();
      const [label, ...rest] = content.split(":");

      if (rest.length > 0) {
        listItems.push(
          <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
            <span className="text-blue-500 mt-1 font-bold text-lg">•</span>
            <div className="flex-1">
              <span className="font-semibold text-gray-900">{label}:</span>
              <span className="ml-1.5">{rest.join(":").trim()}</span>
            </div>
          </li>
        );
      } else {
        listItems.push(
          <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
            <span className="text-blue-500 mt-1 font-bold text-lg">•</span>
            <span className="font-semibold text-gray-900 flex-1">
              {content}
            </span>
          </li>
        );
      }
    }
    // Handle regular bullets
    else if (trimmedLine.startsWith("* ")) {
      flushNestedList();
      const content = trimmedLine
        .replace(/^\*\s+/, "")
        .replace(/\*\*/g, "")
        .trim();
      listItems.push(
        <li key={i} className="flex items-start gap-3 text-gray-700 pl-2">
          <span className="text-blue-500 font-bold text-lg">•</span>
          <span className="flex-1">{content}</span>
        </li>
      );
    }
    // Handle nested bullets (tabs or multiple spaces with + symbol)
    else if (trimmedLine.match(/^\t\+\s+/) || line.match(/^\s{2,}\+\s+/)) {
      const content = trimmedLine
        .replace(/^\+\s+/, "")
        .replace(/\*\*/g, "")
        .trim();
      nestedListItems.push(
        <li
          key={i}
          className="flex items-start gap-2.5 text-gray-600 text-sm pl-1"
        >
          <span className="text-gray-400 mt-1">◦</span>
          <span className="flex-1">{content}</span>
        </li>
      );
    }
    // Handle empty lines
    else if (trimmedLine === "") {
      flushList();
    }
    // Handle regular paragraphs (remove ** markers)
    else {
      flushList();
      const content = trimmedLine.replace(/\*\*/g, "");
      if (content) {
        elements.push(
          <p key={i} className="mb-4 text-gray-700 leading-relaxed pl-2">
            {content}
          </p>
        );
      }
    }
  });

  // Flush any remaining lists
  flushList();

  return elements;
};
