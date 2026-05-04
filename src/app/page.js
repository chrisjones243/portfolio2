import { serverClient } from "../serverClient";
import HomePageClient from "./HomePageClient";

export default async function HomePage() {
  const [caseStudies, resume, experience] = await Promise.all([
    serverClient.fetch(`*[_type == "caseStudy"]{
      title,
      "slug": slug.current,
      tags,
      "imageUrl": image.asset->url,
      "imageDimensions": image.asset->metadata.dimensions,
      "videoUrl": video.asset->url,
    }`),
    serverClient.fetch(`*[_type == "resume"][0]{
      "fileUrl": file.asset->url,
    }`),
    serverClient.fetch(`*[_type == "workExperience"] | order(startDate desc) {
      jobTitle,
      company,
      location,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
    }`),
  ]);

  return (
    <HomePageClient
      caseStudies={caseStudies}
      resumeUrl={resume?.fileUrl ?? null}
      experience={experience}
    />
  );
}
