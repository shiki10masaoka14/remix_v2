import { VFC } from "react";
import { useLoaderData } from "remix";
import { GetLogoQuery } from "~/utils/graphCMS/graphCMSGenerated";


const TestCom: VFC = () => {
  const { asset } = useLoaderData<GetLogoQuery>();

  return (
    <>
      <h1>{asset?.url}</h1>
    </>
  );
};
export default TestCom;
