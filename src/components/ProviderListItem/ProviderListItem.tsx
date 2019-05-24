import React from 'react';
import styled from 'styled-components';
import { times, identity } from 'ramda';

import { ProviderType } from '../../types/ProviderType';
import { themeGet } from 'styled-system';
import { applyElevationCss } from '../../styles/applyElevation';
import { Space } from '../Space/Space';
import { PlaceholderSkeleton } from '../PlaceholderSkeleton/PlaceholderSkeleton';

export interface ProviderListItemProps {
  provider: ProviderType;
}

const Name = styled.div`
  font-size: ${themeGet('fontSizes.2')}em;
  font-weight: ${themeGet('fontWeights.bold')};
`;

const Value = styled.div`
  padding: 0 ${themeGet('spaces.1')}em;
`;

const Label = styled.span`
  font-weight: ${themeGet('fontWeights.bold')};
  margin-right: ${themeGet('spaces.1')}em;
`;

const Prop = styled.div`
  font-size: ${themeGet('fontSizes.1')}em;
`;

const Props = styled.div`
  > ${Prop} {
    margin-bottom: ${themeGet('spaces.1')}em;
  }

  > ${Prop}:last-child {
    margin-bottom: 0;
  }
`;

const Wrapper = styled.div`
  ${applyElevationCss(1)};
  background-color: ${themeGet('searchResults.item.bgColor')};
  border-radius: ${themeGet('searchResults.item.borderRadius')}em;
  padding: ${themeGet('spaces.2')}em;
`;

export const ProviderListItem: React.FC<ProviderListItemProps> = ({
  provider: {
    providerId,
    name,
    street,
    city,
    state,
    zipcode,
    hospitalReferralRegionDesc,
    totalDischarges,
    avgCoveredCharges,
    avgTotalPayments,
    avgMedicarePayments,
    drgDefinition,
  },
}) => (
  <Wrapper>
    <Name>{name}</Name>
    <Space value={2} />
    <Props>
      <Prop>
        <Label>Provider ID:</Label>
        <Value>{providerId}</Value>
      </Prop>
      <Prop>
        <Label>Street:</Label>
        <Value>{street}</Value>
      </Prop>
      <Prop>
        <Label>City:</Label>
        <Value>{city}</Value>
      </Prop>
      <Prop>
        <Label>State:</Label>
        <Value>{state}</Value>
      </Prop>
      <Prop>
        <Label>Zipcode:</Label>
        <Value>{zipcode}</Value>
      </Prop>
      <Prop>
        <Label>hospitalReferralRegionDesc:</Label>
        <Value>{hospitalReferralRegionDesc}</Value>
      </Prop>
      <Prop>
        <Label>totalDischarges:</Label>
        <Value>{totalDischarges}</Value>
      </Prop>
      <Prop>
        <Label>avgCoveredCharges:</Label>
        <Value>{avgCoveredCharges}</Value>
      </Prop>
      <Prop>
        <Label>avgTotalPayments:</Label>
        <Value>{avgTotalPayments}</Value>
      </Prop>
      <Prop>
        <Label>avgMedicarePayments:</Label>
        <Value>{avgMedicarePayments}</Value>
      </Prop>
      <Prop>
        <Label>drgDefinition:</Label>
        <Value>{drgDefinition}</Value>
      </Prop>
    </Props>
  </Wrapper>
);

const NameSkeleton = styled(PlaceholderSkeleton)`
  display: inline-block;
  width: 6em;
  height: 1.2em;
`;

const LabelSkeleton = styled(PlaceholderSkeleton)`
  display: inline-block;
  width: 8em;
  height: 1.2em;
`;

const ValueSkeleton = styled(PlaceholderSkeleton)`
  display: inline-block;
  width: 4em;
  height: 1.2em;
`;

export const ProviderListItemSkeleton = () => (
  <Wrapper>
    <Name>
      <NameSkeleton />
    </Name>
    <Space value={2} />
    <Props>
      {times(identity, 3).map(i => (
        <Prop key={i}>
          <Label>
            <LabelSkeleton />
          </Label>
          <Value>
            <ValueSkeleton />
          </Value>
        </Prop>
      ))}
    </Props>
  </Wrapper>
);
