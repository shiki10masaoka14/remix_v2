import {
  Button,
  Container,
  Heading,
} from "@chakra-ui/react";
import { useState, VFC } from "react";

const Test2: VFC = () => {
  const testData = [
    { node: { quantity: 1, text: "abc" } },
    { node: { quantity: 10, text: "abc" } },
    { node: { quantity: 100, text: "abc" } },
  ];

  const [testArray, setTestArray] = useState(testData);
  console.log(testArray);

  return (
    <>
      {testArray.map((test, index) => (
        <Container>
          <Heading>
            {test.node.text}
            {test.node.quantity}
          </Heading>
          <Button
            onClick={() =>
              setTestArray(
                testArray.map((test2, index2) =>
                  index === index2
                    ? {
                        ...test2,
                        node: {
                          quantity: test2.node.quantity + 1,
                          text: test2.node.text,
                        },
                      }
                    : test2,
                ),
              )
            }
          >
            +
          </Button>
        </Container>
      ))}
    </>
  );
};
export default Test2;
