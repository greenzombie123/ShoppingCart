import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import {
  ActionFunction,
  createMemoryRouter,
  LoaderFunction,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Cart, CartItem, Product } from "../products";
import { vi } from "vitest";

export type RouteObjectProps = {
  element: ReactNode;
  path?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
  children?: RouteObject[];
};

export const renderWithRouter = ({
  element,
  path = "/",
  loader,
  action,
  children = [],
}: RouteObjectProps) => {
  const router = createMemoryRouter(
    [{ element, path, loader, action, children }],
    {
      initialEntries: [path],
    }
  );

  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};

export const mockCart: Cart = [
  {
    cartItemId: "asd1",
    name: "LBJ Boom Box",
    id: 12,
    price: 59.99,
    style: "Red",
    picture: "/images/redjbl-boombox.jpeg",
    quantity: 2,
    product: {} as Product,
  },
  {
    cartItemId: "asd2",
    name: "Maggie Lo Blouse",
    id: 13,
    price: 39.99,
    style: "Black",
    picture: "/images/brownblouse.jpg",
    quantity: 1,
    product: {} as Product,
  },
  {
    cartItemId: "asd3",
    name: "Mens Cotton Jacket",
    id: 16,
    price: 55.99,
    style: undefined,
    picture: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    quantity: 4,
    product: {} as Product,
  },
];

export const mockOneProduct: Product = {
  name: "Jupopo AirFlex Running Shoes",
  id: "7",
  category: "Men's Clothing",
  price: 89.99,
  ratings: 198,
  stars: 4,
  likes: 431,
  styles: [
    {
      description: "",
      picture: "/images/ID3692_HM5.avif",
      isCurrentStyle: true,
    },
  ],
};

export const mockOneCartItem: CartItem = {
  name: "Jupopo AirFlex Running Shoes",
  price: 89.99,
  id: "123",
  quantity: 2,
  style: "",
  picture: "/images/ID3692_HM5.avif",
  product: mockOneProduct,
};

export const mockProducts: Product[] = [
  {
    name: "Jupopo AirFlex Running Shoes",
    id: 7,
    category: "Men's Clothing",
    price: 89.99,
    ratings: 198,
    stars: 4,
    likes: 431,
    styles: [
      {
        description: "",
        picture: "/images/ID3692_HM5.avif",
        isCurrentStyle: true,
      },
    ],
  },
  {
    name: "Velmora Elegance Handbag",
    id: 8,
    category: "Women's Clothing",
    price: 120,
    ratings: 564,
    stars: 5,
    likes: 1201,
    styles: [
      {
        description: "Black",
        picture: "/images/handbagblack.webp",
        isCurrentStyle: true,
      },
      {
        description: "Beige",
        picture: "/images/1_536aef2b-2ba4-4bb5-98ec-6d6ac443cb43.webp",
        isCurrentStyle: false,
      },
    ],
  },
  {
    name: "Orvella Silver Twist Earrings",
    id: 9,
    category: "Jewelry",
    price: 59.99,
    ratings: 310,
    stars: 4,
    likes: 720,
    styles: [
      {
        description: "",
        picture: "/images/twistearrings.webp",
        isCurrentStyle: true,
      },
    ],
  },
  {
    name: "AxionBeat Wireless Headphones",
    id: 10,
    category: "Electronics",
    price: 199.99,
    ratings: 785,
    stars: 5,
    likes: 1532,
    styles: [
      {
        description: "Blue",
        picture: "/images/headlessblue.webp",
        isCurrentStyle: true,
      },
      {
        description: "White",
        picture: "/images/headlesswhite.webp",
        isCurrentStyle: false,
      },
    ],
  },
];

// export const mockModule = async <U, T extends Partial<U>>(
//   path: string,
//   newProps: T
// ): Promise<void> => {

//   vi.mock(path, async () => {
//     const originalModule = (await vi.importActual(path)) as U;

//     return {
//       ...originalModule,
//       ...newProps,
//     };
//   });
// };

export const mockGetOneViewedItem: () => Product[] = () => [
  {
    name: "Jupopo AirFlex Running Shoes",
    id: 7,
    category: "Men's Clothing",
    price: 89.99,
    ratings: 198,
    stars: 4,
    likes: 431,
    styles: [
      {
        description: "",
        picture: "/images/ID3692_HM5.avif",
        isCurrentStyle: true,
      },
    ],
  },
];

export const mockGetEmptyCart: () => [] = () => [];

export const mockAddOneItemToCart: () => { productInfo: CartItem } = () => ({
  productInfo: {
    cartItemId: "111",
    name: "Red Boom Box",
    id: 1,
    price: 59.99,
    style: "Red",
    picture: "/images/redjbl-boombox.jpeg",
    quantity: 3,
    product: {} as Product,
  },
});

export const setUpMockShowModal = () => {
  const mockShowModal = vi.fn();

  HTMLDialogElement.prototype.showModal = mockShowModal;

  return mockShowModal;
};
