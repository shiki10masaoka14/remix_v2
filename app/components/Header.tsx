import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import { motion, Transition } from "framer-motion";
import { memo, VFC } from "react";
import {
  MdOutlineRemoveShoppingCart,
  MdShoppingCart,
} from "react-icons/md";
import { useLoaderData, Link as RemixLink } from "remix";
import { GetLogoQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { CartQuantityQuery } from "~/utils/shopify/shopifyGenerated";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  onOpen: any;
  flag: any;
};

export const MotionBox = motion<BoxProps | Transition>(Box);

export const Header: VFC<PROPS> = memo(
  ({ onOpen, flag }) => {
    const { asset } = useLoaderData<GetLogoQuery>();

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

    // ここまで
    //
    //
    //
    // ここから

    return (
      <>
        <Flex
          justify={"space-between"}
          align={"center"}
          h={20}
        >
          <Link as={RemixLink} to={"/"}>
            <Image src={asset?.url} />
          </Link>
          {!cartQuantity ? (
            <HStack>
              <Icon
                fontSize={20}
                as={MdOutlineRemoveShoppingCart}
              />
              <Text>0</Text>
            </HStack>
          ) : (
            <Link as={RemixLink} to={"/cart"}>
              <HStack>
                <Icon fontSize={20} as={MdShoppingCart} />
                <Text>
                  {cartQuantity.cart?.lines.edges.reduce(
                    (p, x) => p + x.node.quantity,
                    0,
                  )}
                </Text>
              </HStack>
            </Link>
          )}
          <Button onClick={onOpen} zIndex={9999}>
            <MotionBox
              display="inline-block"
              position={"absolute"}
              top={"40%"}
              h={"2px"}
              w={"60%"}
              background={"gray.400"}
              transition={{ duration: 1 }}
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
      </>
    );
  },
);
Header.displayName = "Header";
