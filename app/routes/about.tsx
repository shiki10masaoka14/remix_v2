import { Heading, Text } from "@chakra-ui/react";
import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Layout } from "~/components/Layout";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { shopResolver } from "~/utils/shopify/resolver/shopResolver";
import { GetShopInfoQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data } = await shopResolver();
  const { shop } = data;

  const { asset } = await logoResolver();

  return { shop, asset };
};

// ここまで
//
//
//
// ここから

const Products: VFC = () => {
  const { shop } = useLoaderData<GetShopInfoQuery>();

  return (
    <Layout>
      <Heading
        fontWeight={"normal"}
        fontSize={16}
        mt={8}
        mb={10}
      >
        About
      </Heading>
      <Text w={"600px"}>{shop.description}</Text>
    </Layout>
  );
};
export default Products;
