import {
  Box,
  Button,
  Container,
  Heading,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useState, VFC } from "react";
import { GoOctoface } from "react-icons/go";
import { LoaderFunction, useLoaderData } from "remix";
import { useGraphCMS } from "~/hooks/graphCMSHook";
import {
  SlidesDocument,
  SlidesQuery,
} from "~/utils/graphCMS/graphCMSGenerated";

export const loader: LoaderFunction = async () => {
  return { GRAPHCMS_ENDPOINT, GRAPHCMS_API_KEY };
};

const Index: VFC = () => {
  const [flag, setFlag] = useState(false);
  const [num, setNum] = useState(0);
  const { GRAPHCMS_ENDPOINT, GRAPHCMS_API_KEY } =
    useLoaderData();

  const { graphCMSData } = useGraphCMS(
    GRAPHCMS_ENDPOINT,
    GRAPHCMS_API_KEY,
    SlidesDocument.loc?.source.body,
  );
  const slidesData = graphCMSData as SlidesQuery;

  return (
    <Container mt={10}>
      <Button onClick={() => setFlag(!flag)}>on/off</Button>
      <Button onClick={() => setNum(num + 1)}>
        カウントアップ
      </Button>
      <Box>
        <Heading>{num}</Heading>
        {flag && <Icon as={GoOctoface} fontSize={30} />}
      </Box>
      <Image src={slidesData?.slides[0].slide[1].url} />
    </Container>
  );
};
export default Index;
