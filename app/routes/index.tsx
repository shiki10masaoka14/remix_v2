import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { GetInfosQuery } from "~/utils/graphCMS/graphCMSGenerated";

export const loader: LoaderFunction = async () => {
  const { data } = await fetch(GRAPHCMS_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
    },
    body: JSON.stringify({
      query: `{
        infos {
          title
          value
        }
      }`,
    }),
  }).then((res) => res.json());

  const infos = data.infos;

  return { EMAIL_USER, infos };
};

const Index: VFC = () => {
  const { EMAIL_USER } = useLoaderData();
  const { infos } = useLoaderData<GetInfosQuery>();
  console.log(infos);

  return (
    <>
      <h1>{EMAIL_USER}</h1>
      {infos?.map((info) => (
        <p key={info.title}>
          {info.title}: {info.value[0]}
        </p>
      ))}
    </>
  );
};
export default Index;
