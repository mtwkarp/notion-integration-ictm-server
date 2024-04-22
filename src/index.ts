import { Client } from "@notionhq/client";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });

  if(!process.env.NOTION_PAGE_ID) {
      throw new Error('Specify notion page id in .env file.')
  }

  const response = await notion.databases.query({
    database_id: process.env.NOTION_PAGE_ID,
  });

  console.log("Got response:", response);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
