import { Footer } from "./Footer";
import { Header } from "./Header";
import { Container, Flex, Spacer } from "@chakra-ui/react";
import { memo, ReactNode, VFC } from "react";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  children: ReactNode;
  asset?: {
    __typename?: "Asset";
    id: string;
    url: string;
  } | null;
};

export const Layout: VFC<PROPS> = memo(
  ({ children, asset }) => {
    return (
      <Flex minH={"100vh"} direction={"column"}>
        <Header asset={asset} />
        <Container maxW={"1040px"}>{children}</Container>
        <Spacer />
        <Footer />
      </Flex>
    );
  },
);
Layout.displayName = "Layout";
