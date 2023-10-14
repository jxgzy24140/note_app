import { createClient } from "graphql-ws";

const client = createClient({
  url: "ws://localhost:4000/graphql",
});

export default client;
