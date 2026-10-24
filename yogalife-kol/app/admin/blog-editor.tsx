"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import type { ICommand } from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { PiArrowsInSimple, PiArrowsOutSimple } from "react-icons/pi";

// The editor touches window/document on load, so it only renders in the browser.
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), {
  ssr: false,
  loading: () => <div className="blog-editor-loading">Loading editor…</div>,
});

// Markdown editor for blog posts. The value is submitted through a hidden input
// so the surrounding admin form and server action work unchanged.
export function BlogEditor({ defaultValue = "" }: { defaultValue?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const initial = useRef(defaultValue);
  initial.current = defaultValue;
  const [value, setValue] = useState(defaultValue);
  const [fullscreen, setFullscreen] = useState(false);

  // Esc leaves full screen instead of closing the dialog; closing the dialog resets the editor.
  useEffect(() => {
    const dialog = rootRef.current?.closest("dialog");
    if (!dialog) return;
    const onCancel = (event: Event) => {
      if (!dialog.classList.contains("is-fullscreen")) return;
      event.preventDefault();
      setFullscreen(false);
    };
    const onClose = () => {
      setFullscreen(false);
      setValue(initial.current);
    };
    dialog.addEventListener("cancel", onCancel);
    dialog.addEventListener("close", onClose);
    return () => {
      dialog.removeEventListener("cancel", onCancel);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  // The dialog grows to the full viewport with the editor (see admin.css).
  useEffect(() => {
    rootRef.current?.closest("dialog")?.classList.toggle("is-fullscreen", fullscreen);
  }, [fullscreen]);

  const fullscreenCommand: ICommand = {
    name: "fullscreen",
    keyCommand: "fullscreen",
    buttonProps: {
      "aria-label": fullscreen ? "Exit full screen" : "Full screen",
      title: fullscreen ? "Exit full screen (Esc)" : "Full screen",
    },
    icon: fullscreen ? <PiArrowsInSimple size={14} /> : <PiArrowsOutSimple size={14} />,
    execute: () => setFullscreen((current) => !current),
  };

  return (
    <div ref={rootRef} className="blog-editor admin-wide" data-color-mode="light">
      <span className="blog-editor-label">Post</span>
      <MDEditor
        value={value}
        onChange={(next) => setValue(next ?? "")}
        fullscreen={fullscreen}
        height={420}
        preview="live"
        extraCommands={[fullscreenCommand]}
        textareaProps={{
          "aria-label": "Post",
          placeholder: "Start writing…",
          maxLength: 50000,
          required: true,
        }}
        // The preview never runs scripts or raw HTML typed into the post.
        previewOptions={{ rehypePlugins: [[rehypeSanitize]] }}
      />
      <input type="hidden" name="body" value={value} />
    </div>
  );
}
