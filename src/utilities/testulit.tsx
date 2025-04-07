import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import {
  ActionFunction,
  createMemoryRouter,
  LoaderFunction,
  RouterProvider,
} from "react-router-dom";

type RouteObjectProps = {
  element: ReactNode;
  path?: string;
  loader?: LoaderFunction;
  action?: ActionFunction;
};

export const renderWithRouter = ({
  element,
  path = "/",
  loader,
  action,
}: RouteObjectProps) => {
  const router = createMemoryRouter([{ element, path, loader, action }], {
    initialEntries: [path],
  });

  return {
    user: userEvent.setup(),
    ...render(<RouterProvider router={router} />),
  };
};
