import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION } from "./constants";

const client = createClient({
  url: GRAPHQL_SUBSCRIPTION,
});

export default client;
