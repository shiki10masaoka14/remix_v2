export const productResolver = async (id: any) => {
  const query = () => `
    query($id: ID!) {
      product(id: $id) {
        id
        title
        featuredImage {
          url
        }
        description
        priceRange {
          maxVariantPrice {
            amount
          }
        }
        variants(first: 3) {
          edges {
            node {
              id
              selectedOptions {
                name
                value
              }
            }
          }
        }
      }
    }
  `;

  const SHOPIFY_GRAPHQL_BODY = (id: any) => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query(),
        variables: {
          id,
        },
      }),
    };
  };

  const { data: shopify } = await fetch(
    SHOPIFY_ENDPOINT,
    SHOPIFY_GRAPHQL_BODY(id),
  ).then((res) => res.json());

  return { shopify };
};
