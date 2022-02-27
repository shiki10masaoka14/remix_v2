import {
  Button,
  Heading,
  Input,
  Link,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { Link as RemixLink } from "remix";
import { userPrefs } from "~/utils/cookies";
import { CartLinesAddResolver } from "~/utils/shopify/resolver/cartLinesAddResolver";
import { cartQuantityResolver } from "~/utils/shopify/resolver/cartQuantityResolver";
import { CartQuantityQuery } from "~/utils/shopify/shopifyGenerated";

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

  const { data: cartQuantityData } =
    await cartQuantityResolver(cookie?.cartId, 10);

  return { cartQuantityData, cartId: cookie.cartId };
};

// ここまで
//
//
//
// ここから

export const action: ActionFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { testNum } = value;

  await CartLinesAddResolver(
    [
      {
        merchandiseId:
          "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDA0NzUxMzczMTIwNA==",
        quantity: Number(testNum),
      },
    ],
    cookie.cartId,
  );

  return redirect("/test", {
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

const Test: VFC = () => {
  const { cartQuantityData } = useLoaderData();
  const cartQuantity =
    cartQuantityData as CartQuantityQuery;
  const sum = cartQuantity.cart?.lines.edges.reduce(
    (p, x) => p + x.node.quantity,
    0,
  );
  console.log(sum);

  const { cartId } = useLoaderData();

  return (
    <>
      <Heading>
        {cartQuantity?.cart?.lines.edges[0].node.quantity}
      </Heading>
      <Heading>cart id: {cartId}</Heading>
      <Link as={RemixLink} to={`/test2`}>
        View More
      </Link>

      <Form method="post">
        <Input name="testNum" type={"number"} />
        <Button type="submit">add</Button>
      </Form>
    </>
  );
};
export default Test;
