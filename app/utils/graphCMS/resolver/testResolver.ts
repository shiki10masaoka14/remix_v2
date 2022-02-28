export const updateTestResolver = async (
  id: string,
  number: number,
) => {
  const { data } = await fetch(GRAPHCMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      mutation UpdateTest($number: Int, $id: ID) {
        updateTest(
          data: { number: $number }
          where: { id: $id }
        ) {
          id
          number
        }
        publishTest(where: { id: $id }, to: PUBLISHED) {
          id
          stage
        }
      }
      `,
      variables: {
        id,
        number,
      },
    }),
  }).then((res) => res.json());

  return { data };
};

export const testsResolver = async () => {
  const { data } = await fetch(GRAPHCMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
      query MyQuery {
        tests(first: 10) {
          id
          number
          stage
        }
      }
      `,
      variables: {},
    }),
  }).then((res) => res.json());

  return { data };
};
