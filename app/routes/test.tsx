import { Button, HStack, Input } from "@chakra-ui/react";
import { useState, VFC } from "react";
import { Form, LoaderFunction, useLoaderData } from "remix";
import { TestsQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { testsResolver } from "~/utils/graphCMS/resolver/testResolver";

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

const Test: VFC = () => {
  const { tests } = useLoaderData<TestsQuery>();
  const [numbers, setNumbers] = useState(tests);

  return tests ? (
    <>
      {numbers.map((num, index) => (
        <Form method="post" key={num.id} action="/api/test">
          <HStack>
            <Button
              name="id"
              value={num.id}
              type="submit"
              onClick={() => {
                setNumbers(
                  numbers.map((num2, index2) =>
                    index2 === index
                      ? {
                          ...num2,
                          number: Number(num2.number) - 1,
                        }
                      : num2,
                  ),
                );
              }}
            >
              -
            </Button>
            <Input
              value={Number(num.number)}
              name="num"
              w={100}
            />
            <Button
              name="id"
              value={num.id}
              type="submit"
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
          </HStack>
        </Form>
      ))}
    </>
  ) : (
    <>??????</>
  );
};
export default Test;
