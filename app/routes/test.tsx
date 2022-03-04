import {
  Box,
  BoxProps,
  Button,
  Heading,
  useBoolean,
} from "@chakra-ui/react";
import {
  motion,
  Transition,
  useAnimation,
} from "framer-motion";
import { VFC } from "react";

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
    <>
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
    </>
  );
};
export default Test;
