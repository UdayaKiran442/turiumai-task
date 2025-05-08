import { Hono } from "hono";
import { z } from "zod";

import { queryDocumentFromOutline } from "../services/outline.service";
import { sendMessageToChatwootConversation } from "../services/chatwoot.service";

const queryRouter = new Hono();

const QueryDocumentSchema = z.object({
    content: z.string().describe("The query to run on the document")
})

export type IQueryDocumentSchema = z.infer<typeof QueryDocumentSchema>

queryRouter.post("/document", async (c) => {
    try {
        const payload = await c.req.json();
        if (!payload.content.startsWith("/ask")) {
            return c.json({ message: "Ignored non-incoming message" }, 200);
        }
        if (payload.message_type !== "incoming") {
            return c.json({ message: "Ignored non-incoming message" }, 200);
        }
        const content = payload.content.replace("/ask", "");
        const result = await queryDocumentFromOutline({content});
        const response = result.data.search.answer;
        const conversationId = payload.conversation.id;
        await sendMessageToChatwootConversation({
            conversationId,
            content: response
        })
        return c.json({message:"success", response}, 200);
    } catch (error) {
        return c.json({message: "An error occurred while processing your request"}, 500);
    }
});

export default queryRouter;