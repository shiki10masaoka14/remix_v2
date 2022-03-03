import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState, VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { userPrefs } from "~/utils/cookies";
import { cartNoteUpdateResolver } from "~/utils/shopify/resolver/cartNoteUpdateResolver";
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

// ここまで
//
//
//
// ここから

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { cartNote, url } = value;

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  await cartNoteUpdateResolver(
    cookie.cartId,
    String(cartNote),
  );

  return redirect(`${url}`);
};

// ここまで
//
//
//
// ここから

const Cart: VFC = () => {
  const { cart } = useLoaderData<CartQuery>();
  const [quantity, setQuantity] = useState(
    cart?.lines.edges,
  );
  console.log(cart);

  return quantity ? (
    <VStack spacing={20} my={20}>
      <Heading>Shopping Cart</Heading>
      <Divider />
      {quantity.map((line, index) => (
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
            <Form
              method="post"
              action="/api/cartFluctuation"
            >
              <HStack>
                <Button
                  name="id"
                  value={line.node.id}
                  onClick={() => {
                    setQuantity(
                      quantity?.map((qua, index2) =>
                        index === index2
                          ? {
                              ...qua,
                              node: {
                                quantity:
                                  qua.node.quantity - 1,
                                id: qua.node.id,
                                estimatedCost:
                                  qua.node.estimatedCost,
                                merchandise:
                                  qua.node.merchandise,
                              },
                            }
                          : qua,
                      ),
                    );
                  }}
                  type="submit"
                >
                  -
                </Button>
                <Input
                  name="quantity"
                  value={line.node.quantity}
                />
                <Button
                  name="id"
                  value={line.node.id}
                  onClick={() => {
                    setQuantity(
                      quantity?.map((qua, index2) =>
                        index === index2
                          ? {
                              ...qua,
                              node: {
                                quantity:
                                  qua.node.quantity + 1,
                                id: qua.node.id,
                                estimatedCost:
                                  qua.node.estimatedCost,
                                merchandise:
                                  qua.node.merchandise,
                              },
                            }
                          : qua,
                      ),
                    );
                  }}
                  type="submit"
                >
                  +
                </Button>
              </HStack>
            </Form>
          </Box>
        </Flex>
      ))}
      <Divider />
      <Flex>
        <Text>Subtotal/小計</Text>
        <Spacer />
        <Text>
          {cart?.estimatedCost.totalAmount.amount}
        </Text>
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
          <Text>{cart?.note}</Text>
          <Textarea name="cartNote" />
        </Box>
        <Button
          name="url"
          value={cart?.checkoutUrl}
          type="submit"
        >
          Check Out/ 決済する
        </Button>
      </Form>
    </VStack>
  ) : (
    <Heading>カートに何もありません</Heading>
  );
};
export default Cart;
