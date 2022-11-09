import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SANITY_DATASET, SANITY_PROJECT_ID, SANITY_TOKEN } from "@env";

const client = sanityClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET || "production",
  useCdn: false,
  appVersion: "2021-10-21",
  apiVersion: "2022-11-07",

  token: SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

export default client;
