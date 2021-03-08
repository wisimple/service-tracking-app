import styled from "styled-components";

const Wrapper = styled.div`
  font-family: "Roboto Mono", Arial, Helvetica, sans-serif;
  font-size: 14px;
`;

const StyledCurrency = styled.span`
  margin-left: 2px;
  font-size: 12px;
`;

interface Props {
  amount?: number;
}

const Money = ({ amount }: Props) => {
  if (amount)
    return (
      <Wrapper>
        {amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        <StyledCurrency>₺</StyledCurrency>
      </Wrapper>
    );

  return null;
};

export default Money;
