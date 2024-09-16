import { PineconeStore } from '@langchain/pinecone';
import { Pinecone } from "@pinecone-database/pinecone"
import { embeddings } from './openai';
import { env } from '../env';




const pc = new Pinecone({
    apiKey: env.PINECONE_API_KEY,
});


const index = pc.index(env.PINECONE_INDEX);

export const getPineconeStore = (params: {
    city?: string,
    population?: string,
    state?: string,
    filename?: string
}) => {


    const { city, population, state, filename } = params;
    return PineconeStore.fromExistingIndex(embeddings, {
        pineconeIndex: index,
        filter: {
            ...(params.city && { city }),
            ...(params.population && { population }),
            ...(params.state && { state }),
            ...(params.filename && { filename })
        }
    });
}


export { pc, index };