const projectIdEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const datasetEnv = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-11";
export const dataset = datasetEnv || "production";
export const projectId = projectIdEnv || "placeholder-project-id";
export const useCdn = process.env.NODE_ENV === "production";
export const hasRequiredEnv = Boolean(projectIdEnv && datasetEnv);
