import { ActionFunction, redirect } from "remix";
import { userPrefs } from "~/utils/cookies";
import { cartLinesUpdateResolver } from "~/utils/shopify/resolver/cartLinesUpdateResolver";

export const action: ActionFunction = async ({
  request,
}) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie =
    (await userPrefs.parse(cookieHeader)) || {};

  const formData = await request.formData();
  const value = Object.fromEntries(formData);
  const { id, quantity } = value;

  await cartLinesUpdateResolver(cookie.cartId, [
    { id: String(id), quantity: Number(quantity) },
  ]);

  return redirect(`cart`);
};
