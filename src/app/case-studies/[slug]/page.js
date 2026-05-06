import { serverClient } from "../../../serverClient";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";

// Pre-render all known slugs at build time
export async function generateStaticParams() {
  const slugs = await serverClient.fetch(
    `*[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }`,
  );
  return slugs.map((s) => ({ slug: s.slug }));
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;

  const data = await serverClient.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      tags,
      markdown,
      links,
      "imageUrl": image.asset->url,
      "imageDimensions": image.asset->metadata.dimensions,
      "videoUrl": video.asset->url,
    }`,
    { slug },
  );

  if (!data) notFound();

  return <CaseStudyClient data={data} />;
}
