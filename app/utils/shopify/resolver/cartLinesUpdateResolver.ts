import { CartLineUpdateInput } from "../shopifyGenerated";

export const cartLinesUpdateResolver = async (
  cartId: string,
  lines: [CartLineUpdateInput],
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
      mutation CartLinesUpdate(
        $cartId: ID!
        $lines: [CartLineUpdateInput!]!
        $first: Int
      ) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            lines(first: $first) {
              edges {
                node {
                  quantity
                }
              }
            }
          }
        }
      }
      `,
      variables: {
        cartId,
        lines,
        first,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
