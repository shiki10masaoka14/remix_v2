import {
  Box,
  BoxProps,
  Button,
  Heading,
  Image,
  Link,
  useBoolean,
} from "@chakra-ui/react";
import {
  motion,
  Transition,
  useAnimation,
} from "framer-motion";
import { VFC } from "react";
import {
  Link as RemixLink,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { Layout } from "~/components/Layout";
import { GetLogoQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";

export const loader: LoaderFunction = async () => {
  const { asset } = await logoResolver();

  return { asset };
};

export const MotionBox = motion<BoxProps | Transition>(Box);

const Test: VFC = () => {
  const control = useAnimation();
  const control2 = useAnimation();
  const [flag, setFlag] = useBoolean(false);
  const { asset } = useLoaderData<GetLogoQuery>();

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
    <Layout url={asset?.url}>
      <Image src={asset?.url} />
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
