import { Button, Input } from "@chakra-ui/react";
import { VFC } from "react";
import { Form, LoaderFunction } from "remix";
import { userPrefs } from "~/utils/cookies";

export const loader: LoaderFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  return { cartId: cookie?.cartId };
};

const Test: VFC = () => {
  return (
    <>
      <Form method="post">
        <Input />
        <Button type="submit">add</Button>
      </Form>
    </>
  );
};
export default Test;
