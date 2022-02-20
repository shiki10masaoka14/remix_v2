import { Layout } from "../components/Layout";
import { ProductCard } from "../components/productCard";
import { Center, Link, SimpleGrid } from "@chakra-ui/react";
import { VFC } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link as RemixLink,
} from "remix";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { productsResolver } from "~/utils/shopify/resolver/productsResolver";
import { GetProductsQuery } from "~/utils/shopify/shopifyGenerated";

export const loader: LoaderFunction = async () => {
  const { products } = await productsResolver();
  const { asset } = await logoResolver();

  return { products, asset };
};

const Index: VFC = () => {
  const { products } = useLoaderData<GetProductsQuery>();

  return (
    <Layout>
      <SimpleGrid
        minChildWidth={"200px"}
        spacing={7}
        mb={10}
      >
        {products.edges.map((product) => (
          <ProductCard
            key={product.node.id}
            product={product}
          />
        ))}
      </SimpleGrid>
      <Center mb={"80px"}>
        <Link as={RemixLink} to={`/products/1`}>
          View More
        </Link>
        <Link as={RemixLink} to={`/test`}>
          test
        </Link>
      </Center>
    </Layout>
  );
};
export default Index;
