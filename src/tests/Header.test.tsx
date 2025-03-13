import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";

describe("Header componnent", ()=>{
    it("renders links correctly", ()=>{

        const router = createMemoryRouter(routes, {
            initialEntries:["/"],
            initialIndex:0
        })            

        render(<RouterProvider router={router}/>)

        const links = screen.getAllByRole("link")

        expect(links[0].textContent).toBe("Buy Stuff")    
        expect(links[1].textContent).toBe("Electronics")
        expect(links[2].textContent).toBe("Jewelry")
        expect(links[3].textContent).toBe("Men's Clothing")
        expect(links[4].textContent).toBe("Women's Clothing")

        expect(screen.getByRole("banner")).toMatchSnapshot()
    })

    it("menuIcon renders", ()=>{
 
        const router = createMemoryRouter(routes, {
            initialEntries:["/"],
            initialIndex:0
        })            

        render(<RouterProvider router={router}/>)

        const menuIcon = screen.getByTestId("menuIcon")

        expect(menuIcon).toBeInTheDocument()
    })
})