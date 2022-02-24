import {
  Button,
  Center,
  Container,
  Input,
  Modal,
  ModalOverlay,
  Spinner,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { VFC } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  redirect,
} from "remix";
import { Layout } from "~/components/Layout";
import { logoResolver } from "~/utils/graphCMS/resolver/logoResolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { name, email, message } = value;

  const data = {
    service_id: SERVICE_ID,
    template_id: TEMPLATE_ID,
    user_id: USER_ID,
    accessToken: ACCESS_TOKEN,
    template_params: {
      name,
      email,
      message,
    },
  };

  await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  ).then(
    (result) => {
      console.log(result.statusText);
    },
    (error) => {
      console.log(error.statusText);
    },
  );

  return redirect("/contact/completionScreen");
};

export const loader: LoaderFunction = async () => {
  const { asset } = await logoResolver();

  return { asset };
};

const Contact: VFC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Layout>
        <Container mt={10}>
          <Form method="post">
            <VStack spacing={8}>
              <Input placeholder="name" name="name" />
              <Input placeholder="email" name="email" />
              <Textarea
                placeholder="Details of your inquiry"
                name="message"
              />
              <Button onClick={onOpen} type="submit">
                send
              </Button>
            </VStack>
          </Form>
        </Container>
      </Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <Center minH={"100vh"}>
            <Spinner size={"xl"} color={"white"} />
          </Center>
        </ModalOverlay>
      </Modal>
    </>
  );
};
export default Contact;
