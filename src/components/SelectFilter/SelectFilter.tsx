import React from 'react';
import Select from 'react-select';
import styled, { ThemeProps } from 'styled-components';
import { themeGet } from 'styled-system';
import { Space } from '../Space/Space';
import theme from '../../styles/theme';
import { applyElevationFunc } from '../../styles/applyElevation';

export type Option = { value: string | undefined; label: string };

export interface SelectFilter {
  label: string;
  value?: string | number | null;
  options: Option[];
  onChange: (value: string | number | null) => any;
}

const Label = styled.div`
  font-weight: ${themeGet('fontWeights.bold')};

  > i:last-child {
    cursor: pointer;
  }
`;

const Clear = styled.div`
  text-align: right;
  cursor: pointer;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${themeGet('spaces.1')}em;
  font-size: ${themeGet('fontSizes.1')}em;
`;

export const SelectFilter: React.FC<SelectFilter> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const selectedOption =
    options.find(option => option.value === value) || options[0];

  const handleChange = (option: any) => onChange(option.value);

  const handleClearClick = () => {
    onChange(null);
  };

  return (
    <div>
      <LabelWrapper>
        <Label>
          <i className="fas fa-filter" /> {label}{' '}
        </Label>
        {selectedOption && !!selectedOption.value && (
          <Clear onClick={handleClearClick}>
            <i className="fas fa-times" /> Clear
          </Clear>
        )}
      </LabelWrapper>
      <Space value={2} />
      <Select
        value={selectedOption}
        onChange={handleChange}
        options={options}
        styles={{
          control: styles => ({
            ...styles,
            border: `1px solid ${
              theme({} as ThemeProps<{}>).textInput.borderColor
            }`,
            boxShadow: applyElevationFunc(1),
            borderRadius: '0.5em',
            minHeight: '34px',
          }),
          dropdownIndicator: styles => ({
            ...styles,
            padding: '0 8px',
          }),
        }}
      />
    </div>
  );
};
