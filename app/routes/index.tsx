import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { GetShopInfoQuery } from "~/utils/shopify/shopifyGenerated";

export const loader: LoaderFunction = async () => {
  const productQuery = () => `
    query {
      shop {
        description
      }
    }
  `;

  const GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_API_KEY,
        "Content-Type": "application/graphql",
      },
      body: productQuery(),
    };
  };

  const { data } = await fetch(
    SHOPIFY_ENDPOINT,
    GRAPHQL_BODY(),
  ).then((res) => res.json());

  const { shop } = data;

  return { shop };
};

const Index: VFC = () => {
  const { shop } = useLoaderData<GetShopInfoQuery>();
  console.log(shop);

  return <>{shop.description}</>;
};
export default Index;
