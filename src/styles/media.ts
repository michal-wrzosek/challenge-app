import { css, CSSObject, FlattenSimpleInterpolation } from "styled-components";

import { breakpoints, BREAKPOINT_KEYS, breakpointKeys } from "src/styles/breakpoints";


export const media = breakpointKeys
  .reduce((acc, label) => {
  acc[label] = (first: CSSObject | TemplateStringsArray, ...args: any) => css`
    @media (max-width: ${breakpoints[label] / 16}em) {
      ${css(first, ...args)}
    }
  `

  return acc
}, {} as { [key in BREAKPOINT_KEYS]: (first: CSSObject | TemplateStringsArray, ...args: any) => FlattenSimpleInterpolation })