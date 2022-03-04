import {
  Box,
  BoxProps,
  Button,
  Heading,
  Icon,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRef, useState, VFC } from "react";
import { ImFilePicture } from "react-icons/im";

export const MotionBox = motion<BoxProps>(Box);
const Test: VFC = () => {
  const inputEl = useRef<HTMLInputElement>(null);
  const inputEl2 = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [fileName, setFileName] = useState<string>();

  return (
    <>
      <Heading>テスト</Heading>
      <MotionBox
        h={"40px"}
        w={"40px"}
        bg={"red.300"}
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 0, 270, 270, 0],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
      />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        ref={inputEl}
      />
      <Heading>名前: {name}</Heading>
      <Button
        onClick={() =>
          inputEl.current && (inputEl.current.value = "")
        }
      >
        フォーカスを当てる
      </Button>
      <Input
        type={"file"}
        ref={inputEl2}
        hidden
        onChange={() =>
          setFileName(inputEl2.current?.files?.[0]?.name)
        }
      />
      <Heading>{fileName}</Heading>
      <Button onClick={() => inputEl2.current?.click()}>
        <Icon as={ImFilePicture} />
      </Button>
    </>
  );
};
export default Test;
