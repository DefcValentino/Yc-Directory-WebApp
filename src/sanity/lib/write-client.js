import "server-only"

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, token } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
})

if (!writeClient.config().token) {
  throw new Error("Write token not found.")
}



if (!writeClient.config().token) {
    throw new Error( "Write token not found.")
}
