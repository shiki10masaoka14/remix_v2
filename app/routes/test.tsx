import {
  Box,
  BoxProps,
  Button,
  Heading,
  Image,
  ImageProps,
  useBoolean,
} from "@chakra-ui/react";
import {
  AnimatePresence,
  motion,
  Transition,
} from "framer-motion";
import { useState, VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Layout } from "~/components/Layout";
import { userPrefs } from "~/utils/cookies";
import { SlidesQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";
import { slidesResolver } from "~/utils/graphCMS/resolver/testResolver";
import { cartQuantityResolver } from "~/utils/shopify/resolver/cartQuantityResolver";

export const loader: LoaderFunction = async ({
  request,
}) => {
  // ロゴ
  const { asset } = await logoResolver();

  // カート
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};
  const { data: cartQuantityData } =
    await cartQuantityResolver(cookie?.cartId, 10);

  // スライド
  const { data: slidesData } = await slidesResolver();
  const { slides } = slidesData;

  return { asset, cartQuantityData, slides };
};

export const MotionBox = motion<BoxProps | Transition>(Box);
export const MotionImage = motion<ImageProps | Transition>(
  Image,
);

const Test: VFC = () => {
  const [flag, setFlag] = useBoolean(false);
  const { slides } = useLoaderData<SlidesQuery>();
  const [num, setNum] = useState(0);

  const onClickNext = () => {
    setNum(num === 2 ? 0 : num + 1);
  };

  return (
    <Layout>
      <Heading>テスト</Heading>
      <Button onClick={setFlag.toggle}>next</Button>
      <AnimatePresence>
        <MotionImage
          key={
            flag
              ? slides[0].slide[0].id
              : slides[0].slide[1].id
          }
          src={
            flag
              ? slides[0].slide[0].url
              : slides[0].slide[1].url
          }
          initial={{ x: "100%", opacity: 0 }}
          exit={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 2 }}
          w={200}
          position={"absolute"}
          top={300}
        />
      </AnimatePresence>
    </Layout>
  );
};
export default Test;
