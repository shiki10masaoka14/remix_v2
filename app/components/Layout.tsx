import { Footer } from "./Footer";
import { Header } from "./Header";
import {
  Box,
  BoxProps,
  Container,
  Flex,
  Link,
  Spacer,
  Text,
  TextProps,
  useBoolean,
  VStack,
} from "@chakra-ui/react";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
} from "body-scroll-lock";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import {
  memo,
  ReactNode,
  RefObject,
  useEffect,
  useRef,
  useState,
  VFC,
} from "react";
import { Link as RemixLink } from "remix";

// ここまで「import」
//
//
//
// ここから

type PROPS = {
  children: ReactNode;
};

export const MotionText = motion<TextProps | Transition>(
  Text,
);
export const MotionBox = motion<BoxProps | Transition>(Box);

export const useDisableScroll = (
  ref: RefObject<HTMLElement>,
  isOpen: boolean,
) => {
  useEffect(() => {
    if (!isOpen || ref.current === null) {
      return;
    }
    disableBodyScroll(ref.current);

    return clearAllBodyScrollLocks;
  }, [ref, isOpen]);
};

export const Layout: VFC<PROPS> = memo(({ children }) => {
  const [flag, setFlag] = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);

  useDisableScroll(ref, flag);

  // AnimatePresenceのバグの修正
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!isLoaded) {
    return <></>;
  }

  return (
    <>
      <Container maxW={"1040px"}>
        <Flex direction={"column"} minH={"200vh"} ref={ref}>
          <Header flag={flag} onOpen={setFlag.toggle} />
          <Box>{children}</Box>
          <Spacer />
          <Footer />
        </Flex>
        <AnimatePresence>
          {flag && (
            <MotionBox
              transition={{ duration: 1 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              bg={"blackAlpha.800"}
              position={"fixed"}
              top={0}
              left={0}
              w={"100%"}
              h={"100%"}
            >
              <Container maxW={"container.lg"} mt={20}>
                <VStack align={"start"} color={"white"}>
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
              </Container>
            </MotionBox>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
});
Layout.displayName = "Layout";
