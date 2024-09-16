import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import {
    ChatPromptTemplate,
    MessagesPlaceholder,
} from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { getPineconeStore } from "./pinecone";
import { env } from "../env";


export const embeddings = new OpenAIEmbeddings({
    apiKey: env.OPENAI_API_KEY,
    batchSize: 512,
    model: "text-embedding-3-small",
})

export const createRAGChain = async (params: {
    city?: string,
    population?: string,
    state?: string,
    filename?: string

}) => {
    const llm = new ChatOpenAI()

    const pineconeStore = await getPineconeStore(params)

    // Contextualize question
    const contextualizeQSystemPrompt = `
Given a chat history and the latest user question
which might reference context in the chat history,
formulate a standalone question which can be understood
without the chat history. Do NOT answer the question, just
reformulate it if needed and otherwise return it as is.`;
    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
        ["system", contextualizeQSystemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
    ]);
    const historyAwareRetriever = await createHistoryAwareRetriever({
        llm,
        retriever: pineconeStore.asRetriever(),
        rephrasePrompt: contextualizeQPrompt,
    });

    // Answer question
    const qaSystemPrompt = `
You are an assistant for question-answering tasks. Use
the following pieces of retrieved context to answer the
question. If you don't know the answer, just say that you
don't know. If you need more context, ask for it. If you can return the data in a Markdown format using a table. Don't use HTML inside the markdown.
\n\n
{context}`;
    const qaPrompt = ChatPromptTemplate.fromMessages([
        ["system", qaSystemPrompt],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
    ]);

    // Below we use createStuffDocuments_chain to feed all retrieved context
    // into the LLM. Note that we can also use StuffDocumentsChain and other
    // instances of BaseCombineDocumentsChain.
    const questionAnswerChain = await createStuffDocumentsChain({
        llm,
        prompt: qaPrompt,
    });

    const ragChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain: questionAnswerChain,
    });



    return ragChain
}