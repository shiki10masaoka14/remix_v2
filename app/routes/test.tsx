import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { listResolver } from "~/utils/shopify/resolver/listResolver";

export const loader: LoaderFunction = async () => {
  const { data } = await listResolver(
    3,
    "eyJsYXN0X2lkIjo2NzI4NzQ2NzYyMzcyLCJsYXN0X3ZhbHVlIjoiNjcyODc0Njc2MjM3MiJ9",
  );
  return { data };
};

const Test: VFC = () => {
  const { data } = useLoaderData();
  console.log(data);

  return <>test</>;
};
export default Test;
