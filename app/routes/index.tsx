import { Layout } from "./components/Layout";
import { ProductCard } from "./components/productCard";
import { Center, Link, SimpleGrid } from "@chakra-ui/react";
import { VFC } from "react";
import {
  LoaderFunction,
  useLoaderData,
  Link as RemixLink,
} from "remix";
import { GetLogoQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { GetProductsQuery } from "~/utils/shopify/shopifyGenerated";

export const loader: LoaderFunction = async () => {
  const productQuery = () => `
    query {
      products(first: 8) {
        pageInfo {
          hasPreviousPage
          hasNextPage
        }
        edges {
          node {
            title
            id
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            featuredImage {
              url
            }
          }
        }
      }
    }
  `;

  const assetQuery = () => `
    query {
      asset(where: {id: "ckztukhg825wa0b81prkv1aow"}) {
        id
        url
      }
    }
  `;

  const SHOPIFY_GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        "X-Shopify-Storefront-Access-Token":
          SHOPIFY_STOREFRONT_API_KEY,
        "Content-Type": "application/graphql",
      },
      body: productQuery(),
    };
  };

  const GRAPHCMS_GRAPHQL_BODY = () => {
    return {
      async: true,
      crossDomain: true,
      method: "POST",
      headers: {
        Authorization: `Bearer ${GRAPHCMS_API_KEY}`,
        "Content-Type": "application/graphql",
      },
      body: assetQuery(),
    };
  };

  const { data: shopify } = await fetch(
    SHOPIFY_ENDPOINT,
    SHOPIFY_GRAPHQL_BODY(),
  ).then((res) => res.json());

  const { data: graphcms } = await fetch(
    GRAPHCMS_ENDPOINT,
    GRAPHCMS_GRAPHQL_BODY(),
  ).then((res) => res.json());

  const { products } = shopify;

  const { asset } = graphcms;

  return { products, asset };
};

const Index: VFC = () => {
  const { products } = useLoaderData<GetProductsQuery>();
  const { asset } = useLoaderData<GetLogoQuery>();

  return (
    <Layout asset={asset}>
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
