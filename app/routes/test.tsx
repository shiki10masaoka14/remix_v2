import { Button, Input } from "@chakra-ui/react";
import { useState, VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
  useLoaderData,
} from "remix";
import { TestsQuery } from "~/utils/graphCMS/graphCMSGenerated";
import {
  testsResolver,
  updateTestResolver,
} from "~/utils/graphCMS/resolver/testResolver";

// ここまで
//
//
//
// ここから

export const loader: LoaderFunction = async () => {
  const { data } = await testsResolver();
  const tests = data?.tests;

  return { tests };
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
  const { num } = value;

  await updateTestResolver(
    "cl06m4ncl5hae0b5d9zyrd34p",
    Number(num),
  );

  return redirect(`test`);
};

// ここまで
//
//
//
// ここから

const Test: VFC = () => {
  const { tests } = useLoaderData<TestsQuery>();
  const [num, setNum] = useState(tests[0].number);

  return tests ? (
    <>
      <Form method="post">
        <Button
          type="submit"
          onClick={() => setNum(num && num - 1)}
        >
          -
        </Button>
        <Input name="num" value={Number(num)} />
        <Button
          type="submit"
          onClick={() => setNum(num && num + 1)}
        >
          +
        </Button>
      </Form>
    </>
  ) : (
    <>??????</>
  );
};
export default Test;
