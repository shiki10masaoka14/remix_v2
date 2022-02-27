import { Layout } from "../components/Layout";
import {
  Button,
  Center,
  Heading,
  HStack,
  Image,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useNavigate,
} from "remix";
import { LoaderFunction, useLoaderData } from "remix";
import { userPrefs } from "~/utils/cookies";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { cartCreateResolver } from "~/utils/shopify/resolver/cartCreateResolver";
import { CartLinesAddResolver } from "~/utils/shopify/resolver/cartLinesAddResolver";
import { cartQuantityResolver } from "~/utils/shopify/resolver/cartQuantityResolver";
import { productResolver } from "~/utils/shopify/resolver/productResolver";
import { FindProductQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  params,
  request,
}) => {
  const { shopify } = await productResolver(
    params.productId,
  );
  const { product } = shopify;

  const { asset } = await logoResolver();

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const { data: cartQuantityData } =
    await cartQuantityResolver(cookie?.cartId, 10);

  return { product, asset, cartQuantityData };
};

// ここまで
//
//
//
// ここから

export const action: ActionFunction = async ({
  request,
  params,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { quantity, merchandiseId } = value;

  if (!cookie.cartId) {
    const { data: cartCreateData } =
      await cartCreateResolver({
        lines: [
          {
            quantity: Number(quantity),
            merchandiseId: String(merchandiseId),
          },
        ],
      });

    cookie.cartId = cartCreateData.cartCreate.cart.id;
  } else {
    await CartLinesAddResolver(
      [
        {
          quantity: Number(quantity),
          merchandiseId: String(merchandiseId),
        },
      ],
      cookie.cartId,
    );
  }

  return redirect(`/${params.productId}`, {
    headers: {
      "Set-Cookie": await userPrefs.serialize(cookie),
    },
  });
};

// ここまで
//
//
//
// ここから

const Product: VFC = () => {
  const navigate = useNavigate();
  const { product } = useLoaderData<FindProductQuery>();

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
          <Form method="post">
            <Input placeholder="個数入力" name="quantity" />
            <Button
              name="merchandiseId"
              type="submit"
              value={product?.variants.edges[0].node.id}
            >
              カートに入れる
            </Button>
          </Form>
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
