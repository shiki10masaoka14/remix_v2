import { CartInput } from "../shopifyGenerated";

export const cartCreateResolver = async (
  input: CartInput,
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
mutation CartCreate($input: CartInput, $first: Int) {
  cartCreate(input: $input) {
    cart {
      id
      lines(first: $first) {
        edges {
          node {
            quantity
            estimatedCost {
              totalAmount {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  }
}
      `,
      variables: {
        input,
        first,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
