import { CartLineUpdateInput } from "../shopifyGenerated";

export const cartLinesUpdateResolver = async (
  cartId: string,
  lines: [CartLineUpdateInput],
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
      ) {
        cartLinesUpdate(cartId: $cartId, lines: $lines) {
          cart {
            id
          }
        }
      }
      `,
      variables: {
        cartId,
        lines,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
