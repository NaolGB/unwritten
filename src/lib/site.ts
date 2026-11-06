// Update this as the count grows; the home page, descriptions and share card all
// read it.
export const kitsDelivered = 357;

export const kitsLabel = "Year-long school kits delivered, in Ethiopia";

export const ctaText = "Good things happen when we come together";

// Goes to Naol's LinkedIn for now, so people can send a message.
export const ctaHref = "https://www.linkedin.com/in/naol-basaye/";

export const tagline =
  "We fund school-supply essentials—so every student can take part";

export const description = `${tagline}. ${kitsDelivered} year-long school kits delivered in Ethiopia.`;

// Vercel sets this to the project's main domain, so links follow the domain when
// it moves to unwritten.care without a code change.
const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = productionHost
  ? `https://${productionHost}`
  : "https://unwritten.care";
