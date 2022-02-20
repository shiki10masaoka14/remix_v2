import { Layout } from "../components/Layout";
import {
  Center,
  Heading,
  HStack,
  Image,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { VFC } from "react";
import { useNavigate } from "remix";
import { LoaderFunction, useLoaderData } from "remix";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { productResolver } from "~/utils/shopify/resolver/productResolver";
import { FindProductQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  params,
}) => {
  const { shopify } = await productResolver(
    params.productId,
  );
  const { product } = shopify;

  const { asset } = await logoResolver();

  return { product, asset };
};

// ここまで
//
//
//
// ここから

const Product: VFC = () => {
  const { product } = useLoaderData<FindProductQuery>();
  const navigate = useNavigate();

  return (
    <Layout>
      <Heading
        as={"h1"}
        fontSize={"18px"}
        fontWeight={"normal"}
        mb={6}
      >
        {product?.title}
      </Heading>
      <HStack spacing={8} align={"start"} mb={10}>
        <Image
          src={product?.featuredImage?.url}
          maxW={"400px"}
        />
        <Stack maxW={"400px"} spacing={6}>
          <Text>{product?.description}</Text>
          <HStack>
            <Text>
              ¥
              {Math.floor(
                product?.priceRange.maxVariantPrice.amount,
              )}
            </Text>
            <Text> +tax</Text>
          </HStack>
          <Table variant={"unstyled"} size={"sm"}>
            <Tbody>
              {product?.variants.edges[0].node.selectedOptions.map(
                (option) => (
                  <Tr>
                    <Td textTransform={"uppercase"} px={0}>
                      {option.name} :
                    </Td>
                    <Td pl={0}>{option.value}</Td>
                  </Tr>
                ),
              )}
            </Tbody>
          </Table>
        </Stack>
      </HStack>
      <Center mb={16}>
        <Text
          onClick={() => navigate(-1)}
          _hover={{
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Go to back
        </Text>
      </Center>
    </Layout>
  );
};
export default Product;
