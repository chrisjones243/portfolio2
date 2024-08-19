"use client";

import CollapsedCard from "./collapsedCard";
import ExpandedCard from "./expandedCard";

import { useState } from "react";

const exampleCard = {
  title: "Example Card",
  body: [
    {
      _key: "1",
      _type: "block",
      children: [
        {
          _key: "2",
          _type: "span",
          marks: [],
          text: "This is an example card. It has a title, an image, and a description. The title is bold, the description is normal text, and the image is a picture of a cat. ",
        },
      ],
      markDefs: [],
      style: "normal",
    },
  ],
  imageUrl:
    "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

function Card({ data = exampleCard }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      {isExpanded ? (
        <ExpandedCard
          data={data}
          setClose={() => setIsExpanded(false)}
          isOpen={isExpanded}
          initPos={position}
        />
      ) : (
        <CollapsedCard
          data={data}
          onClick={() => setIsExpanded(true)}
          setPos={(pos) => setPosition(pos)}
        />
      )}
    </>
  );
}

export default Card;
