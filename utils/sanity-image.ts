import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const client = createClient({
  projectId: "oftxvk10",
  dataset: "production",
  apiVersion: "2023-01-07",
  useCdn: false,
});

const imageBuilder = ImageUrlBuilder(client);
const urlFor = (source: SanityImageSource) => imageBuilder.image(source);

export default urlFor;
