import axios from "axios";

export async function sendMessageToChatwootConversation(payload: {
    conversationId: string;
    content: string;
}) {
    const options = {
        method: "POST",
        url: `https://app.chatwoot.com/api/v1/accounts/${process.env.CHATWOOT_ACCOUNT_ID}/conversations/${payload.conversationId}/messages`,
        headers: {
            "Content-Type": "application/json",
            api_access_token: `${process.env.CHATWOOT_API_KEY}`,
        },
        data: {
            content: payload.content,
            message_type: "outgoing"
        },
    };
    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error: any) {
        console.log(error.message)
    }
}