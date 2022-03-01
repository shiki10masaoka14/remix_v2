import { ActionFunction, redirect } from "remix";
import { updateTestResolver } from "~/utils/graphCMS/resolver/testResolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { id, num } = value;

  await updateTestResolver(String(id), Number(num));

  return redirect(`test`);
};
