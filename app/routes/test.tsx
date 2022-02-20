import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { testResolver } from "~/utils/shopify/resolver/testResolver";

export const loader: LoaderFunction = async () => {
  const { product } = await testResolver(
    "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY3Mjg3NTAzOTk2MjA=",
  );
  return { product };
};

const Test: VFC = () => {
  const { product } = useLoaderData();
  console.log(product);

  return (
    <>
      <p>task</p>
    </>
  );
};
export default Test;
