export const productsResolver = async () => {
  const productQuery = () => `
    query {
      products(first: 8) {
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
  `;

  const SHOPIFY_GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_API_KEY,
        "Content-Type": "application/graphql",
      },
      body: productQuery(),
    };
  };

  const { data: shopify } = await fetch(
    SHOPIFY_ENDPOINT,
    SHOPIFY_GRAPHQL_BODY(),
  ).then((res) => res.json());

  const { products } = shopify;

  return { products };
};
