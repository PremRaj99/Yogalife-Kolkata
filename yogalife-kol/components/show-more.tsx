"use client";

import { Children, useState, type ReactNode } from "react";
import { PiCaretDownThin } from "react-icons/pi";
import { Icon } from "./ui";

// Shows the first `limit` cards, with a See more / See less toggle for the rest.
export function ShowMore({
  children,
  limit,
  className,
  as: List = "ul",
}: {
  children: ReactNode;
  limit: number;
  className?: string;
  as?: "ul" | "div";
}) {
  const [expanded, setExpanded] = useState(false);
  const items = Children.toArray(children);
  const hasMore = items.length > limit;

  return (
    <>
      <List className={className}>{expanded ? items : items.slice(0, limit)}</List>
      {hasMore && (
        <div className="show-more">
          <button
            type="button"
            className="secondary-button"
            aria-expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "See less" : `See more (${items.length - limit})`}
            <span className={expanded ? "show-more-icon is-open" : "show-more-icon"}>
              <Icon icon={PiCaretDownThin} size="sm" />
            </span>
          </button>
        </div>
      )}
    </>
  );
}
