import { createRAGChain } from "../../../utils/openai";
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { AIMessage, HumanMessage } from "@langchain/core/messages";

const formatMessage = (message: VercelChatMessage) => {
    if (message.role === "user") {
        return new HumanMessage(message.content);
    }
    return new AIMessage(message.content);
};

export const runtime = "edge";

export const POST = async (req: Request) => {
    try {
        const { messages, data: { city, population, state, filename } }: ReqBody = await req.json();

        if (!messages) {
            return new Response("Chat history is required", { status: 400 });
        }

        console.log(messages, city, population, state, filename);

        const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
        const currentMessageContent = messages[messages.length - 1].content;

        const ragChain = await createRAGChain({
            city,
            population,
            state,
            filename
        });

        const stream = await ragChain.stream({
            chat_history: formattedPreviousMessages,
            input: currentMessageContent,
        });

        const extractAnswerTransform = new TransformStream({
            transform(chunk, controller) {
                if (chunk.answer) {
                    controller.enqueue(chunk.answer);
                }
            }
        });

        const answerStream = stream.pipeThrough(extractAnswerTransform);

        return new StreamingTextResponse(answerStream);

    } catch (e) {
        console.error(e);
        return new Response("Internal server error", { status: 500 });
    }
};

type ReqBody = {
    messages: VercelChatMessage[],
    data: {
        city: string,
        population: string,
        state: string,
        filename: string
    }
};
