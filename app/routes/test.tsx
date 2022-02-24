import { Button, Input } from "@chakra-ui/react";
import { VFC } from "react";
import {
  ActionFunction,
  Form,
  redirect,
  useFetcher,
} from "remix";
import { Layout } from "~/components/Layout";
import { cartCreateResolver } from "~/utils/shopify/resolver/cartCreateResolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { quantity, merchandiseId } = value;

  const { data } = await cartCreateResolver(
    {
      lines: [
        {
          quantity: Number(quantity),
          merchandiseId: String(merchandiseId),
        },
      ],
    },
    10,
  );

  redirect(`/`);
};

const Index: VFC = () => {
  const data = useFetcher();

  return (
    <Layout>
      <Form method="post">
        <Input name="quantity" placeholder="個数を入力" />
        <Button
          type="submit"
          name="merchandiseId"
          value={
            "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC80MDA0NzUxMzczMTIwNA=="
          }
        >
          カートに追加
        </Button>
      </Form>
      {!data ? null : (
        <>
          <p>{data}</p>
          <p>{data}</p>
        </>
      )}
    </Layout>
  );
};
export default Index;
