# Backend

## To run

```bash
bun install
bun run dev
```

server will run on `http://localhost:3000`

expose this port to the internet using ngrok or any other tunneling service.

Example ngrok command:
```bash
ngrok http http://localhost:3000
```
You will get a url like `https://<random_string>.ngrok-free.app` which you can use as the webhook url in chatwoot.
Requests for this url will be forwarded to `http://localhost:3000`.

## Environment variables

Add a `.env` file in the backend directory with the following variables:
```bash
OUTLINE_API_KEY = ""
CHATWOOT_API_KEY = ""
CHATWOOT_ACCOUNT_ID = ""
```

## Outline Collection

- Create a new collection in outline.
- Add a new document to outline collection.
- Go to document and add content to it. Content can be of any topic.
- Now to get the document id of the outline, you can call `getAllCollectionsFromOutline` function.
- Copy the document id from the response and paste it in `queryDocumentFromOutline` function.

## Chatwoot

- Create a new account in chatwoot.
- Go to settings -> Integrations -> Bots -> Add new bot
- Give the bot a name and webhook url as `https://<random_string>.ngrok-free.app/query/document`
- Now, go to setting -> Inboxes -> Add Inbox -> Select Website
- After selecting website you will get a wrapper script. Add this script in `index.html` in frontend directory.
- Now a chatbot will be added to your website.
- Next step is you need to integrate bot to the inbox created in chatwoot.
- Go to setting -> Inboxes -> Select the settings of the respective inbox -> Bot configuration -> Add bot -> Select the bot created in previous step.
- Now bot is integrated to the inbox.

## Working of the api
- When a user sends a message to the chatbot, the chatbot will execute the webhook url.
- Webhook includes conversation id, query, message type, etc.
- Then the webhook will call the outline api to get the answer to the query.
- The answer will be sent to the chatbot.

# Frontend
- To run the frontend, you need to have a keycloak server running.
- To run keycloak server, pull and run the docker image of keycloak.
- Keycloak server will run on `http://localhost:8080`
- Log in to keycloak server using admin as username and password and create a new realm.
- Create a new client in the realm and add the following details:
    - Client ID: `account`
    - Client Protocol: `openid-connect`
    - Root URL: `http://localhost:5173`
    - Valid Redirect URIs: `http://localhost:5173/*`
    - Valid Post Logout Redirect URIs: `http://localhost:5173/*`
    - Web Origins: `http://localhost:5173`
    
- Run the frontend using vite.
```bash
bun run dev
```
server will run on `http://localhost:5173`

# Citations

## Gen AI
- Windsurf Agentic AI as code editor
- ChatGPT for coding assistance

## Tech stack
- Bun.js as run time environment
- Hono.js as router `https://hono.dev/docs/`
- React.js for frontend

## Keycloak
- Keycloak server running on `http://localhost:8080`
    - Client ID: `account`
    - Client Protocol: `openid-connect`
    - Valid Redirect URIs: `http://localhost:5173/*`
    - Valid Post Logout Redirect URIs: `http://localhost:5173/*`
    - Web Origins: `http://localhost:5173`
    
- Referred docs:
    - https://www.keycloak.org/securing-apps/javascript-adapter
    - https://www.npmjs.com/package/keycloak-js

## Outline Docs
- `https://www.getoutline.com/developers#tag/documents/POST/documents.answerQuestion` for querying the docs

## Chatwoot
- `https://www.chatwoot.com/hc/user-guide/articles/1677497472-how-to-use-agent-bots` for chatbots and integration with inboxes
- `https://www.chatwoot.com/hc/user-guide/articles/1677693021-how-to-use-webhooks` on how webhooks work and how to use them, payload it sends.