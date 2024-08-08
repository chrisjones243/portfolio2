"use client";
import { Grid, GridItem, useTheme } from "@chakra-ui/react";

import Card from "./card";
import { AnimatePresence } from "framer-motion";

import { client } from "@/client";
import { useEffect, useState } from "react";

function Cards() {
  const [data, setData] = useState(null);
  const getData = async () =>
    await client.fetch(`*[_type == "caseStudy"]{
    title,
    body,
    "imageUrl": image.asset->url
  }`);

  useEffect(() => {
    getData().then((res) => setData(res));
    console.log(data);
  }, []);

  console.log(data);
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)">
        <GridItem
          colSpan={1}
          borderTop={`1px solid ${useTheme().colors.stroke}`}
          borderRight={`1px solid ${useTheme().colors.stroke}`}
        />
        <GridItem colSpan={3}>
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
