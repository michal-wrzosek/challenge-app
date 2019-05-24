import styled from 'styled-components';
import { themeGet } from 'styled-system';

export const PlaceholderSkeleton = styled.div`
  background-color: ${themeGet('skeletons.bgColor')};
`;
