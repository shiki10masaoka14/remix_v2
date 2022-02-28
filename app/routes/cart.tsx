import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { VFC } from "react";
import { Form, LoaderFunction, useLoaderData } from "remix";
import { userPrefs } from "~/utils/cookies";
import { cartResolver } from "~/utils/shopify/resolver/cartResolver";
import { CartQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const { data: cartData } = await cartResolver(
    cookie?.cartId,
    20,
    { maxWidth: 300 },
  );
  const cart = cartData?.cart;

  return { cart };
};

const Cart: VFC = () => {
  const { cart } = useLoaderData<CartQuery>();

  return cart ? (
    <VStack spacing={20} my={20}>
      <Heading>Shopping Cart</Heading>
      <Divider />
      {cart.lines.edges.map((line) => (
        <Flex key={line.node.id}>
          <Image
            src={
              line.node.merchandise.product.featuredImage
                ?.url
            }
          />
          <Box>
            <Heading>
              {line.node.merchandise.product.title}
            </Heading>
            <HStack>
              <Text>
                {
                  line.node.merchandise.product.variants
                    .edges[0].node.priceV2.amount
                }
              </Text>
              <Text>inc. tax</Text>
            </HStack>
            <HStack>
              <Button>-</Button>
              <Text>{line.node.quantity}</Text>
              <Button>+</Button>
            </HStack>
          </Box>
        </Flex>
      ))}
      <Divider />
      <Flex>
        <Text>Subtotal/小計</Text>
        <Spacer />
        <Text>{cart.estimatedCost.totalAmount.amount}</Text>
        <Text>inc. tax</Text>
      </Flex>
      <Box>
        <Text>送料について</Text>
        <Text>
          全国一律 900円（税込）
          <br />
          1回の購入合計金額11,000円以上（税込）の場合は送料弊社負担にてお届けいたします。
          <br />
          ※商品不良を除く返品・交換の際の往復送料は、お客様ご負担となります。
        </Text>
      </Box>
      <Form method="post">
        <Box>
          <Heading>備考欄</Heading>
          <Textarea name="cartNote" />
        </Box>
        <Button type="submit">Check Out/ 決済する</Button>
      </Form>
    </VStack>
  ) : (
    <Heading>カートに何もありません</Heading>
  );
};
export default Cart;
