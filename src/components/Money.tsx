import styled from "styled-components";

const Wrapper = styled.span<WrapperProps>`
  font-family: "Roboto Mono", Arial, Helvetica, sans-serif;
  font-size: ${({ size }) => (size === "small" ? "12px" : size === "large" ? "18px" : "14px")};
  color: ${({ color }) => (color ? color : "inherit")};
`;

const StyledCurrency = styled.span`
  margin-left: 2px;
  font-size: 12px;
`;

interface WrapperProps {
  readonly color?: string;
  readonly size?: string;
}

interface Props {
  amount?: number;
  color?: string;
  size?: "small" | "large";
}

const Money = ({ amount, color, size }: Props) => {
  return (
    <Wrapper color={color} size={size}>
      {amount ? amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,") : "0.00"}
      <StyledCurrency>₺</StyledCurrency>
    </Wrapper>
  );
};

export default Money;
