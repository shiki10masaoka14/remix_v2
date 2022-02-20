export const logoResolver = async () => {
  const assetQuery = () => `
    query {
      asset(where: {id: "ckztukhg825wa0b81prkv1aow"}) {
        id
        url
      }
    }
  `;

  const GRAPHCMS_GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
        "Content-Type": "application/graphql",
      },
      body: assetQuery(),
    };
  };

  const { data: graphcms } = await fetch(
    GRAPHCMS_ENDPOINT,
    GRAPHCMS_GRAPHQL_BODY(),
  ).then((res) => res.json());

  const { asset } = graphcms;

  return { asset };
};
