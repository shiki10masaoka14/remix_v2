import {
  Box,
  BoxProps,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Heading,
  Image,
  Link,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { memo, VFC } from "react";
import { Link as RemixLink, useLoaderData } from "remix";
import { CartQuantityQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで
//
//
//
// ここから

export const MotionBox = motion<BoxProps | Transition>(Box);

export const Header: VFC<{ url: any }> = memo(({ url }) => {
  const [flag, setFlag] = useBoolean(false);

  const { cartQuantityData } = useLoaderData();
  const cartQuantity =
    cartQuantityData as CartQuantityQuery;

  const variants = {
    closed: { rotate: 0, top: "40%" },
    open: { rotate: -45, top: "50%" },
  };
  const variants2 = {
    closed: { rotate: 0, top: "60%" },
    open: { rotate: 45, top: "50%" },
  };

  return (
    <>
      <Container maxW={"1040px"}>
        <Flex
          justify={"space-between"}
          align={"center"}
          h={20}
        >
          <Link as={RemixLink} to={"/"}>
            <Image src={url} w={"180px"} />
          </Link>
          {!cartQuantity ? (
            <Heading>0</Heading>
          ) : (
            <Link as={RemixLink} to={"/cart"}>
              <Heading>
                {cartQuantity.cart?.lines.edges.reduce(
                  (p, x) => p + x.node.quantity,
                  0,
                )}
              </Heading>
            </Link>
          )}
          <Button onClick={setFlag.toggle} zIndex={9999}>
            <MotionBox
              display="inline-block"
              position={"absolute"}
              top={"40%"}
              h={"2px"}
              w={"60%"}
              background={"gray.400"}
              transition={{ duration: 0.5 }}
              animate={flag ? "open" : "closed"}
              variants={variants}
            />
            <MotionBox
              display="inline-block"
              position={"absolute"}
              top={"60%"}
              h={"2px"}
              w={"60%"}
              background={"gray.400"}
              transition={{ duration: 0.5 }}
              animate={flag ? "open" : "closed"}
              variants={variants2}
            />
          </Button>
        </Flex>
      </Container>
      <Drawer
        isOpen={flag}
        onClose={setFlag.off}
        size={"full"}
        placement={"left"}
        autoFocus={false}
      >
        <DrawerOverlay bg={"blackAlpha.800"} />
        <DrawerContent bg={"transparent"}>
          <DrawerBody mt={"65px"} color={"white"}>
            <VStack align={"start"}>
              <Link as={RemixLink} to={`/products/1`}>
                PRODUCTS
              </Link>
              <Link as={RemixLink} to={`/about`}>
                ABOUT
              </Link>
              <Link as={RemixLink} to={`/company`}>
                COMPANY
              </Link>
              <Link as={RemixLink} to={`/contact`}>
                CONTACT
              </Link>
              <Link as={RemixLink} to={`/contact`}>
                CONTACT
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
Header.displayName = "Header";
