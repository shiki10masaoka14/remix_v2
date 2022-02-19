import {
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  Image,
  Link,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, VFC } from "react";
import { RiMenuFoldLine } from "react-icons/ri";
import { Link as RemixLink } from "remix";

// ここまで
//
//
//
// ここから

type PROPS = {
  asset?: {
    __typename?: "Asset";
    id: string;
    url: string;
  } | null;
};

export const Header: VFC<PROPS> = memo(({ asset }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Container maxW={"1040px"}>
        <Flex
          justify={"space-between"}
          align={"center"}
          h={20}
        >
          <Link as={RemixLink} to={"/"}>
            <Image src={asset?.url} w={"180px"} />
          </Link>
          <Icon
            as={RiMenuFoldLine}
            fontSize={30}
            onClick={onOpen}
          />
        </Flex>
      </Container>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        size={"full"}
      >
        <DrawerOverlay bg={"blackAlpha.800"} />
        <DrawerContent bg={"transparent"}>
          <DrawerCloseButton mt={"20px"} color={"white"} />
          <DrawerBody mt={"65px"}>
            <Stack color={"white"} align={"end"}>
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
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
Header.displayName = "Header";
