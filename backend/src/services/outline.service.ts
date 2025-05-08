import axios from "axios";

import { IQueryDocumentSchema } from "../routes/query.route";

export async function queryDocumentFromOutline(payload: IQueryDocumentSchema) {
  try {
    const options = {
      method: "POST",
      url: "https://app.getoutline.com/api/documents.answerQuestion",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OUTLINE_API_KEY}`,
      },
      data: {
        query: payload.content,
        documentId: "2e9e6679-571c-4d19-876b-0ca2811ec2e4",
      },
    };
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error("Error processing document query:", error);
    throw error;
  }
}


export async function getAllCollectionsFromOutline() {
  const options = {
    method: "POST",
    url: "https://app.getoutline.com/api/collections.list",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OUTLINE_API_KEY}`,
    },
    data: {},
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
}
