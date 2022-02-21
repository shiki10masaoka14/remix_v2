import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import { VFC } from "react";
import { LoaderFunction, useLoaderData } from "remix";
import { Layout } from "~/components/Layout";
import { GetInfosQuery } from "~/utils/graphCMS/graphCMSGenerated";
import { companyResolver } from "~/utils/graphCMS/resolver/companyResolver";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";

export const loader: LoaderFunction = async () => {
  const { data } = await companyResolver();
  const { infos } = data;

  const { asset } = await logoResolver();

  return { infos, asset };
};

const Products: VFC = () => {
  const { infos } = useLoaderData<GetInfosQuery>();

  return (
    <Layout>
      <Heading
        fontWeight={"normal"}
        fontSize={16}
        mt={8}
        mb={10}
      >
        Company
      </Heading>
      <Table w={"600px"}>
        <Tbody>
          {infos.map((info) => (
            <Tr key={info.title}>
              <Td>{info.title}</Td>
              <Td>
                {info.value.map((val) =>
                  info.title === "住所" ? (
                    val === "〒107-0062" ? (
                      <Text key={val}>{val}</Text>
                    ) : (
                      <Text
                        key={val}
                        display={"inline-block"}
                      >
                        {val}
                      </Text>
                    )
                  ) : (
                    <Box>{val}</Box>
                  ),
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Layout>
  );
};
export default Products;
