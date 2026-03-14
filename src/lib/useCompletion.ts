"use client";

import { useCallback, useRef, useState } from "react";

export type UseCompletionOptions = {
  api?: string;
};

export function useCompletion({ api = "/api/completion" }: UseCompletionOptions = {}) {
  const [completion, setCompletion] = useState("");
  const abortControllerRef = useRef<AbortController | null>(null);

  return {
    completion,
    complete: useCallback(
      async (prompt: string) => {
        abortControllerRef.current?.abort();
        const controller = new AbortController();
        abortControllerRef.current = controller;

        setCompletion("");

        const response = await fetch(api, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Completion request failed");
        }

        // If the API returns a stream, read it chunk by chunk.
        const reader = response.body?.getReader();
        if (reader) {
          const decoder = new TextDecoder();
          let done = false;
          while (!done) {
            const { value, done: doneReading } = await reader.read();
            done = doneReading;
            if (value) {
              setCompletion((prev) => prev + decoder.decode(value));
            }
          }
          return;
        }

        // Fallback for non-streaming responses (plain text body)
        const text = await response.text();
        setCompletion(text);
      },
      [api]
    ),
  };
}
