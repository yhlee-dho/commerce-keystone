/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { CartItem } from '../schemas/CartItem';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';


async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('Adding To Cart!!!');
  console.log(productId);
  // 1. Query the current user - see if they are signed in
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current user's cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveField: 'id,quantity',
  });
  console.log(`productId: ${productId}`);
  // console.log(`allCartItems: ${allCartItems}`);

  const [existingCartItem] = allCartItems;

  if (existingCartItem) {
    console.log(`existingCartItem: ${existingCartItem}`);
    console.log(
      `There are already ${existingCartItem.quantity}, increment by 1!`
    );
    // 3. See if the current item is in their cart
    return context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      // 4.1. if it is, +1
      data: { quantity: existingCartItem.quantity + 1 },
      resolveFields: false,
    });
  }
  // 4.2. if not - create new cart item
  return await context.lists.CartItem.createOne({
    data: {
      product: { connect: { id: productId } },
      user: { connect: { id: sesh.itemId } },
    },
    resolveFields: false,
  });
}

export default addToCart;