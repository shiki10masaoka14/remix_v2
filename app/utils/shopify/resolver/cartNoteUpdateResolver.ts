export const cartNoteUpdateResolver = async (
  cartId: string,
  note: string,
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
      mutation CartNoteUpdate($cartId: ID!, $note: String) {
        cartNoteUpdate(cartId: $cartId, note: $note) {
          cart {
            id
          }
        }
      }
      `,
      variables: {
        cartId,
        note,
      },
    }),
  }).then((res) => res.json());

  return { data };
};
