import { createClient } from "next-sanity";
import ImageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "oftxvk10",
  dataset: "production",
  apiVersion: "2023-01-07",
  useCdn: false,
});

const imageBuilder = ImageUrlBuilder(client);
const urlFor = (source) => imageBuilder.image(source);

export default urlFor;
