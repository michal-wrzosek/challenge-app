import styled from 'styled-components';
import { style } from 'styled-system';

export interface SpaceProps {
  value: number | number[];
}

const applySpacePadding = style({
  prop: 'value',
  cssProperty: 'padding',
  transformValue: value =>
    `${(Number(value) * 0.4).toFixed(1)}em ${(Number(value) * 0.4).toFixed(
      1
    )}em 0 0`,
});

export const Space = styled.div<SpaceProps>`
  ${applySpacePadding}
`;
