import React from "react";

import { Card } from "flowbite-react";

export default function CardComponent({
  image = "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  title = "Noteworthy technology acquisitions 2021",
  desc = "Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.",
}) {
  return (
    <Card
      className="max-w-xs"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={image}
    >
      <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
        {desc}
      </p>
    </Card>
  );
}
