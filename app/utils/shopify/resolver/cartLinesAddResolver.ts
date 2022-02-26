import { CartLineInput } from "../shopifyGenerated";

export const cartLinesAddResolver = async (
  lines: [CartLineInput],
  cartId: string,
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
mutation CartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!, $first: Int) {
  cartLinesAdd(lines: $lines, cartId: $cartId) {
    cart {
      id
      estimatedCost {
        totalAmount {
          amount
        }
      }
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
        lines,
        cartId,
        first,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
