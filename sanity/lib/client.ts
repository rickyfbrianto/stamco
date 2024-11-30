import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})


// skZYWPUuHa8hd2Ym33v7HIxBXMsOi4vxtg6w0V0AwMRsiCM9FwbIweGZJq8viYDuowWt6spZ2m76aGlZYdVIU5rahOOQEMFpx6JlYchoMrmZOebpp14enATKuDP4txN8Hz0VHXcnHeUc03WH5DSLWXGMgmjw767M1HzWk1Hnq9WbHV31DUtd