import { ActionFunction, redirect } from "remix";
import { updateTestResolver } from "~/utils/graphCMS/resolver/testResolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { num } = value;

  await updateTestResolver(
    "cl06m4ncl5hae0b5d9zyrd34p",
    Number(num),
  );

  return redirect(`test`);
};
