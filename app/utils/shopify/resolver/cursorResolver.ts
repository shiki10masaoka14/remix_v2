export const cursorResolver = async (first: number) => {
  const { data } = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_STOREFRONT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query FindCursor($first: Int) {
        products(first: $first) {
          edges {
            cursor
          }
        }
      }`,
      variables: {
        first,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
