export const cartResolver = async (
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
      query Cart($id: ID!, $first: Int) {
        cart(id: $id) {
          estimatedCost {
            totalAmount {
              amount
            }
          }
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
      },
    }),
  }).then((res) => res.json());

  return { data };
};
