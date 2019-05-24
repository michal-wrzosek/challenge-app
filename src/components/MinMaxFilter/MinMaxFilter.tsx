import React from 'react';
import { TextInput } from '../TextInput/TextInput';
import styled from 'styled-components';
import { applyElevationCss } from '../../styles/applyElevation';
import { themeGet } from 'styled-system';
import { Space } from '../Space/Space';

export interface MinMaxFilter {
  label: string;
  valueMin?: number | null;
  valueMax?: number | null;
  onChange: (props: { min?: number | null; max?: number | null }) => any;
}

const Label = styled.div`
  font-weight: ${themeGet('fontWeights.bold')};

  > i:last-child {
    cursor: pointer;
  }
`;

const Clear = styled.div`
  text-align: right;
`;

const LabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 ${themeGet('spaces.1')}em;
  font-size: ${themeGet('fontSizes.1')}em;
`;

const Inputs = styled.div`
  display: flex;
  justify-content: space-between;

  ${applyElevationCss(1)};
  border-radius: ${themeGet('textInput.borderRadius')}em;

  > ${TextInput} {
    box-shadow: none;
  }

  > ${TextInput}:first-child {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  > ${TextInput}:last-child {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;

export const MinMaxFilter: React.FC<MinMaxFilter> = ({
  label,
  valueMin,
  valueMax,
  onChange,
}) => {
  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onChange({ min: value !== '' ? Number(value) : null });
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    onChange({ max: value !== '' ? Number(value) : null });
  };

  const handleClearClick = () => {
    onChange({ min: null, max: null });
  };

  const isFilterApplied =
    typeof valueMin === 'number' || typeof valueMax === 'number';

  return (
    <div>
      <LabelWrapper>
        <Label>
          <i className="fas fa-filter" /> {label}{' '}
        </Label>
        {isFilterApplied && (
          <Clear onClick={handleClearClick}>
            <i className="fas fa-times" /> Clear
          </Clear>
        )}
      </LabelWrapper>
      <Space value={2} />
      <Inputs>
        <TextInput
          type="number"
          name="min"
          placeholder="min"
          value={(typeof valueMin === 'number' ? valueMin : '').toString()}
          onChange={handleMinChange}
        />
        <TextInput
          type="number"
          name="max"
          placeholder="max"
          value={(typeof valueMax === 'number' ? valueMax : '').toString()}
          onChange={handleMaxChange}
        />
      </Inputs>
    </div>
  );
};
