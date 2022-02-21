import {
  Heading,
  HStack,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link as RemixLink,
} from "remix";
import { Layout } from "~/components/Layout";
import { ProductCard } from "~/components/productCard";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { cursorResolver } from "~/utils/shopify/resolver/cursorResolver";
import { listResolver } from "~/utils/shopify/resolver/listResolver";
import {
  FindCursorQuery,
  GetProductsQuery,
} from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  params,
}) => {
  const pageItems = 12;
  const pageId = Number(params.pageId);
  const cursorNum =
    Number(params.pageId) * pageItems - pageItems;

  const { data: cursor } = await cursorResolver(cursorNum);
  const { products: cursorObj }: FindCursorQuery = cursor;

  const { data: list } = await listResolver(
    pageItems,
    !cursorNum ? null : cursorObj.edges.slice(-1)[0].cursor,
  );
  const { products } = list;

  const { asset } = await logoResolver();

  return { products, pageId, asset };
};

// ここまで
//
//
//
// ここから

const Products: VFC = () => {
  const { pageId } = useLoaderData();
  const { products } = useLoaderData<GetProductsQuery>();
  return (
    <Layout>
      <Heading
        fontWeight={"normal"}
        fontSize={"16px"}
        mb={5}
      >
        Products
      </Heading>
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
      <HStack mb={"80px"} spacing={6} justify={"center"}>
        {products.pageInfo.hasPreviousPage && (
          <Link
            as={RemixLink}
            to={`/products/${pageId - 1}`}
            fontWeight={"black"}
          >
            {pageId - 1}
          </Link>
        )}
        <Text>{pageId}</Text>
        {products.pageInfo.hasNextPage && (
          <Link
            as={RemixLink}
            to={`/products/${pageId + 1}`}
            fontWeight={"black"}
          >
            {pageId + 1}
          </Link>
        )}
      </HStack>
    </Layout>
  );
};
export default Products;
