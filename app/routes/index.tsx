import { Layout } from "../components/Layout";
import { ProductCard } from "../components/productCard";
import { Center, Link, SimpleGrid } from "@chakra-ui/react";
import { VFC } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link as RemixLink,
} from "remix";
import { userPrefs } from "~/utils/cookies";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { cartQuantityResolver } from "~/utils/shopify/resolver/cartQuantityResolver";
import { productsResolver } from "~/utils/shopify/resolver/productsResolver";
import { GetProductsQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  request,
}) => {
  const { products } = await productsResolver();

  const { asset } = await logoResolver();

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const { data: cartQuantityData } =
    await cartQuantityResolver(cookie?.cartId, 10);

  return {
    products,
    asset,
    cartQuantityData,
  };
};

// ここまで
//
//
//
// ここから

const Index: VFC = () => {
  const { products } = useLoaderData<GetProductsQuery>();

  return (
    <Layout>
      <Link as={RemixLink} to={`/test`}>
        Test
      </Link>

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
      </Center>
    </Layout>
  );
};
export default Index;
