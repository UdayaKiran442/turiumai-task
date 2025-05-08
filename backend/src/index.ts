import { Hono } from 'hono'
import { prettyJSON } from 'hono/pretty-json';
import * as dotenv from 'dotenv';

import queryRouter from './routes/query.route';
import { getAllCollectionsFromOutline } from './services/outline.service';

const app = new Hono()

dotenv.config();

app.get('/', (c) => c.text('Hello Bun!'))

app.use(prettyJSON())

app.route("/query", queryRouter)

app.get("/test", async (c) => {
  try {
    const collections = await getAllCollectionsFromOutline();
    return c.json({message:"success", collections}, 200);
  } catch (error) {
    return c.json({message:"error", error}, 500);
  }
})

export default app