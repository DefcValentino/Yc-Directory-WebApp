export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-03-31';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!dataset || !projectId) {
  throw new Error('Missing required environment variables: dataset or projectId');
}

export const token = process.env.SANITY_WRITE_TOKEN;

console.log('Sanity Config:', { apiVersion, dataset, projectId });
