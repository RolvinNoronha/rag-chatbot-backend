export const normalizeMessages = (messages: string[]) => {
  return messages.map((message) => {
    const msg = JSON.parse(message);
    if (typeof msg.content === "string") {
      return {
        role: msg.role,
        content: msg.content,
      };
    }

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

    return {
      role: msg.role,
      content: "",
    };
  });
};

export const normalizeCandidates = (input: any) => {
  if (!input?.candidates) return [];

  return input.candidates.map((candidate: any) => {
    const role = candidate.content?.role || "";

    const content = (candidate.content?.parts || [])
      .map((part: any) => part.text)
      .join(" ");
    return { role, content };
  });
};
