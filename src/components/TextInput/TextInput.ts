import styled from 'styled-components';
import { themeGet } from 'styled-system';
import { applyElevationCss } from '../../styles/applyElevation';

export const TextInput = styled.input`
  ${applyElevationCss(1)};
  border: 1px solid ${themeGet('textInput.borderColor')};
  background-color: ${themeGet('textInput.bgColor')};
  font-size: ${themeGet('fontSizes.1')}em;
  padding: ${themeGet('spaces.1')}em;
  border-radius: ${themeGet('textInput.borderRadius')}em;
  width: 100%;
`;
