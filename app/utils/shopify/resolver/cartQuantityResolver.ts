export const cartQuantityResolver = async (
  id: string,
  first: number,
) => {
  const { data } = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_STOREFRONT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query CartQuantity($id: ID!, $first: Int) {
        cart(id: $id) {
          lines(first: $first) {
            edges {
              node {
                quantity
              }
            }
          }
        }
      }
      `,
      variables: {
        id,
        first,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
