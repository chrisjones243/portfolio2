"use client";
import { Grid, GridItem, useMediaQuery } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

import { client } from "../../client";
import { useEffect, useState } from "react";

function Cards() {
  const [data, setData] = useState(null);
  const [isLessThan1050] = useMediaQuery("(max-width: 1050px)");

  const getData = async () =>
    await client.fetch(`*[_type == "caseStudy"]{
    title,
    body,
    "imageUrl": image.asset->url,
    "videoUrl": video.asset->url,
  }`);

  useEffect(() => {
    getData().then((res) => setData(res));
  }, []);

  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)">
        {isLessThan1050 ? null : (
          <GridItem
            colSpan={1}
            border={0}
            borderTop={"1px"}
            borderRight={"1px"}
            borderColor={`stroke`}
          />
        )}
        <GridItem colSpan={isLessThan1050 ? 4 : 3}>
          <AnimatePresence>
            {data?.map((item, i) => (
              <GridItem colSpan={1} key={i}>
                <Card data={item} />
              </GridItem>
            ))}
          </AnimatePresence>
        </GridItem>
      </Grid>
    </>
  );
}

export default Cards;
