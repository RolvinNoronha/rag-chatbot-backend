const normalizeMessages = (messages: string[]) => {
  return messages.map((message) => {
    const msg = JSON.parse(message);
    // If content is already a string (like user messages)
    if (typeof msg.content === "string") {
      return {
        role: msg.role,
        content: msg.content,
      };
    }

    // If content is from a bot with candidates and parts
    if (msg.content && Array.isArray(msg.content.candidates)) {
      // Collect all candidate/part texts into one string
      const extracted = msg.content.candidates
        .flatMap((candidate: any) =>
          (candidate.content?.parts || []).map((p: any) => p.text)
        )
        .join(" ");

      return {
        role: msg.role,
        content: extracted,
      };
    }

    // Fallback in case structure is unexpected
    return {
      role: msg.role,
      content: "",
    };
  });
};

export default normalizeMessages;
