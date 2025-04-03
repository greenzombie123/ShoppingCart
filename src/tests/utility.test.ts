import { describe, expect, it } from "vitest";
import { changeToPrice } from "../utilities/utility";

describe("changeToPrice",()=>{
    it("takes the number 1314 and returns a string '$13.14'",()=>{
        const price = changeToPrice(1314)
        expect(price).toBe("$13.14")
    })

    it("takes the number 13145 and returns a string '$1,3310.45'",()=>{
        const price = changeToPrice(1331045)
        expect(price).toBe('$13,310.45')
    })
})