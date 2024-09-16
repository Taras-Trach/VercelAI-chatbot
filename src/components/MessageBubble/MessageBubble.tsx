import React from "react";
import { MarkdownRenderer } from "../Markdown/Markdown";
import styles from "./MessageBubble.module.css";

interface MessageBubbleProps {
    content: string;
    role?: "user" | "AI";
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ content, role = "AI" }) => {
    return (
        <div className={`${styles.bubble} ${role === "user" ? styles.userBubble : styles.AIBubble}`}>
            {role === "user" ? (
                <p className={`${styles.userText}`}>User:</p>
            ) : (
                <p className={`${styles.AItext}`}>AI:</p>
            )}
            {role === "AI" ? (
                <div className={`${styles.AIContent}`}>
                    <MarkdownRenderer text={content} />
                </div>
            ) : (
                <div className={`${styles.userContent}`}>
                    <p className="">{content}</p>
                </div>
            )}
        </div>
    );
};

export default MessageBubble;
