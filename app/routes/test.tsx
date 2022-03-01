import { Box, Button, Heading } from "@chakra-ui/react";
import { useState, VFC } from "react";
import {
  ActionFunction,
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
  const [numbers, setNumbers] = useState(tests);
  console.log(numbers);

  return tests ? (
    <>
      {numbers.map((num, index) => (
        <Box key={num.id}>
          <Heading>{num.number}</Heading>
          <Button
            onClick={() => {
              setNumbers(
                numbers.map((num2, index2) =>
                  index2 === index
                    ? {
                        ...num2,
                        number: Number(num2.number) + 1,
                      }
                    : num2,
                ),
              );
            }}
          >
            +
          </Button>
        </Box>
      ))}
    </>
  ) : (
    <>??????</>
  );
};
export default Test;
