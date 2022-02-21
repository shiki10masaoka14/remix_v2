export const shopResolver = async () => {
  const { data } = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "X-Shopify-Storefront-Access-Token":
        SHOPIFY_STOREFRONT_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
query GetShopInfo {
  shop {
    description
  }
}
      `,
      variables: {},
    }),
  }).then((res) => res.json());

  return { data };
};
