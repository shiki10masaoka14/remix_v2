import { CartLineInput } from "../shopifyGenerated";

export const CartLinesAddResolver = async (
  lines: [CartLineInput],
  cartId: string,
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
      mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {
        cartLinesAdd(lines: $lines, cartId: $cartId) {
          cart {
            id
          }
        }
      }
      `,
      variables: {
        lines,
        cartId,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
