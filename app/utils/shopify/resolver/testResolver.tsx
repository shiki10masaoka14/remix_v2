export const testResolver = async (id: any) => {
  const SHOPIFY_GRAPHQL_BODY = (id: any) => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query($id: ID!) {
            product(id: $id) {
              title
            }
          }
        `,
        variables: {
          id,
        },
      }),
    };
  };

  const { data: shopify } = await fetch(
    SHOPIFY_ENDPOINT,
    SHOPIFY_GRAPHQL_BODY(id),
  ).then((res) => res.json());

  const { product } = shopify;

  return { product };
};
