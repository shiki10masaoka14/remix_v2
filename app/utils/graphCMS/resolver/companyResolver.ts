export const companyResolver = async () => {
  const { data } = await fetch(GRAPHCMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
query GetInfos {
  infos {
    title
    value
  }
}
      `,
      variables: {},
    }),
  }).then((res) => res.json());

  return { data };
};
