export const listResolver = async (
  first: number,
  after: string | null,
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
query GetProducts($first: Int!, $after: String) {
  products(first: $first, after: $after) {
    pageInfo {
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        title
        id
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        featuredImage {
          url
        }
      }
    }
  }
}
      `,
      variables: {
        first,
        after,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
