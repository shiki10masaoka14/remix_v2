import { Footer } from "./Footer";
import { Header } from "./Header";
import {
  Container,
  Flex,
  Image,
  Spacer,
} from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  children: ReactNode;
  url: any;
};

export const Layout: VFC<PROPS> = memo(
  ({ children, url }) => {
    return (
      <Flex minH={"100vh"} direction={"column"}>
        <Header url={url} />
        <Container maxW={"1040px"}>{children}</Container>
        <Image src={url} />
        <Spacer />
        <Footer />
      </Flex>
    );
  },
);
Layout.displayName = "Layout";
