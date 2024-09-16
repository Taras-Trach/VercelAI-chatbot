import React, { useRef, useEffect } from "react";
import { useChat } from "ai/react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import styles from "./Chat.module.css";
import MessageBubble from "../MessageBubble/MessageBubble";

interface FormValues {
    city: string;
    population: string;
    state: string;
    filename: string;
}

interface ChatProps {
    formValues: FormValues;
}

const Chat: React.FC<ChatProps> = ({ formValues }) => {
    const { messages, input, handleInputChange, setInput, append } = useChat({
        api: "api/chat",
        streamMode: "text",
    });

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            const lastMessage = containerRef.current.lastElementChild;
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [messages]);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setInput("");
            append(
                {
                    content: input,
                    role: "user",
                },
                {
                    data: {
                        city: formValues.city,
                        population: formValues.population,
                        state: formValues.state,
                        filename: formValues.filename,
                    },
                }
            );
        }
    };

    const handleButtonClick = async () => {
        setInput("");
        append(
            {
                content: input,
                role: "user",
            },
            {
                data: {
                    city: formValues.city,
                    population: formValues.population,
                    state: formValues.state,
                    filename: formValues.filename,
                },
            }
        );
    };

    return (
        <div className="flex-1 mb-2">
            <div ref={containerRef} className={styles.container_output}>
                {messages.map((message, index) => (
                    <div key={index} className={`${styles.messageContainer} ${message.role === "user" ? styles.userMessage : styles.AIMessage}`}>
                        {message.role === "user" ? (
                            <MessageBubble content={message.content} role="user" />
                        ) : (
                            <MessageBubble content={message.content} role="AI" />
                        )}
                    </div>
                ))}
            </div>
            <div className="flex items-center">
                <Input
                    onChange={handleInputChange}
                    value={input}
                    onKeyDown={handleKeyDown}
                    className="pr-[8%]"
                />
                <Button
                    onClick={handleButtonClick}
                    className="absolute right-[2%] rounded-full"
                >
                    Send
                </Button>
            </div>
        </div>
    );
};

export default Chat;
