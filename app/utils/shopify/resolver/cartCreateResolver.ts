import { CartInput } from "../shopifyGenerated";

export const cartCreateResolver = async (
  input: CartInput,
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
      mutation CartCreate($input: CartInput) {
        cartCreate(input: $input) {
          cart {
            id
          }
        }
      }
      `,
      variables: {
        input,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
