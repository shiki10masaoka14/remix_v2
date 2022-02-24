export const cartResolver = async (
  first: number,
  id_cart: string,
  id_product: string,
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
query FindCart(
  $id_cart: ID!
  $first: Int
  $id_product: ID!
) {
  cart(id: $id_cart) {
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
  product(id: $id_product) {
    id
    title
  }
}
      `,
      variables: {
        first,
        id_cart,
        id_product,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
