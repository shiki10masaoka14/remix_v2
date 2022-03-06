import {
  Box,
  BoxProps,
  Button,
  Heading,
  Link,
  useBoolean,
} from "@chakra-ui/react";
import {
  motion,
  Transition,
  useAnimation,
} from "framer-motion";
import { VFC } from "react";
import { Link as RemixLink, LoaderFunction } from "remix";
import { Layout } from "~/components/Layout";
import { userPrefs } from "~/utils/cookies";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { cartQuantityResolver } from "~/utils/shopify/resolver/cartQuantityResolver";

export const loader: LoaderFunction = async ({
  request,
}) => {
  const { asset } = await logoResolver();

  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  const { data: cartQuantityData } =
    await cartQuantityResolver(cookie?.cartId, 10);

  return { asset, cartQuantityData };
};

export const MotionBox = motion<BoxProps | Transition>(Box);

const Test: VFC = () => {
  const control = useAnimation();
  const control2 = useAnimation();
  const [flag, setFlag] = useBoolean(false);

  const onClickAnime = () => {
    control.start({ rotate: -45, top: "50%" });
    control2.start({ rotate: 45, top: "50%" });
  };

  const variants = {
    closed: { rotate: 0, top: "40%" },
    open: { rotate: -45, top: "50%" },
  };
  const variants2 = {
    closed: { rotate: 0, top: "60%" },
    open: { rotate: 45, top: "50%" },
  };

  return (
    <Layout>
      <Heading>テスト</Heading>

      <Button onClick={onClickAnime} bg={"cyan.100"}>
        <MotionBox
          display="inline-block"
          position={"absolute"}
          top={"40%"}
          h={"2px"}
          w={"60%"}
          background={"gray.400"}
          transition={{ duration: 1 }}
          animate={control}
        />
        <MotionBox
          display="inline-block"
          position={"absolute"}
          bottom={"40%"}
          h={"2px"}
          w={"60%"}
          background={"gray.400"}
          transition={{ duration: 1 }}
          animate={control2}
        />
      </Button>
      <Button onClick={onClickAnime} bg={"cyan.100"}>
        <MotionBox
          display="inline-block"
          position={"absolute"}
          top={"40%"}
          h={"2px"}
          w={"60%"}
          background={"gray.400"}
          transition={{ duration: 1 }}
          animate={control}
        />
        <MotionBox
          display="inline-block"
          position={"absolute"}
          bottom={"40%"}
          h={"2px"}
          w={"60%"}
          background={"gray.400"}
          transition={{ duration: 1 }}
          animate={control2}
        />
      </Button>
      <Button onClick={setFlag.toggle}>
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
      <Link as={RemixLink} to={`/products/1`}>
        PRODUCTS -kv-
      </Link>
    </Layout>
  );
};
export default Test;
