import { ImageTransformInput } from "../shopifyGenerated";

export const cartResolver = async (
  id: string,
  first: number,
  transform: ImageTransformInput,
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
      query Cart(
        $id: ID!
        $first: Int
        $transform: ImageTransformInput
      ) {
        cart(id: $id) {
          estimatedCost {
            totalAmount {
              amount
            }
          }
          note
          checkoutUrl
          lines(first: $first) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  totalAmount {
                    amount
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    product {
                      title
                      featuredImage {
                        url(transform: $transform)
                      }
                      variants(first: $first) {
                        edges {
                          node {
                            id
                            priceV2 {
                              amount
                            }
                          }
                        }
                      }
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
        id,
        first,
        transform,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
