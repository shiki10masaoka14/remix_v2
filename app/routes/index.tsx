import { Layout } from "../components/Layout";
import { ProductCard } from "../components/productCard";
import {
  Center,
  Heading,
  Link,
  SimpleGrid,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link as RemixLink,
} from "remix";
import { userPrefs } from "~/utils/cookies";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { cartCreateResolver } from "~/utils/shopify/resolver/cartCreateResolver";
import { productsResolver } from "~/utils/shopify/resolver/productsResolver";
import {
  CartCreateMutation,
  GetProductsQuery,
} from "~/utils/shopify/shopifyGenerated";

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
  const { data: cartCreateData } =
    await cartCreateResolver();

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  cookie.cartId = cartCreateData?.cartCreate?.cart?.id;

  return {
    products,
    asset,
    cartCreateData,
    cartId: cookie.cartId,
  };
};

// ここまで
//
//
//
// ここから

const Index: VFC = () => {
  const { products } = useLoaderData<GetProductsQuery>();

  const { cartCreateData } = useLoaderData();
  const { cartCreate } =
    cartCreateData as CartCreateMutation;

  const { cartId } = useLoaderData();

  return (
    <Layout>
      <Heading>{cartId}</Heading>
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
        <Link
          as={RemixLink}
          to={`/products/1`}
          state={cartCreate?.cart?.id}
        >
          View More
        </Link>
      </Center>
    </Layout>
  );
};
export default Index;
