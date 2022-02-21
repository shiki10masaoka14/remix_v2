// import { DocumentNode } from "graphql";
// import { GraphQLClient } from "graphql-request";
// export const shopifyClient = new GraphQLClient(endpoint, {
//   headers: {
//     "X-Shopify-Storefront-Access-Token": String(
//       process.env.SHOPIFY_STOREFRONT_API_KEY,
//     ),
//   },
// });
// export const getGqlString = (doc: DocumentNode) => {
//   return doc.loc && doc.loc.source.body;
// };
import { createClient } from "urql";

const endpoint =
  "https://sample-olive.myshopify.com/api/2022-01/graphql.json";

export const shopifyClient = createClient({
  url: endpoint,
  fetchOptions: {
    headers: {
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_API_KEY
    }
  }
});