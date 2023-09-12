import * as React from "react";
import { Input, InputProps } from "@mui/base/Input";
import { styled } from "@mui/system";

export const CustomInput = React.forwardRef(function CustomInput(
  props: InputProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return <Input slots={{ input: StyledInputElement }} {...props} ref={ref} />;
});

export default function UnstyledInputBasic() {
  return <CustomInput aria-label="Demo input" placeholder="Type something…" />;
}

const StyledInputElement = styled("input")(
  ({ theme }) => `
  width: 100%;
  max-width: 680px;
  font-family: Nunito, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 16px 20px ;
  border-radius: 20px;
  color: #ACADAD;
  background: var(--white, #FAFDFE);
  border: 1px solid var(--grey, #ACADAD);
 

 

  &:focus {
    border-color: blue;
    v
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);
