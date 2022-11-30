import React, { ReactNode, useEffect } from "react";

interface ProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  children: (value: number) => JSX.Element;
}

export const ProgressProvider = ({
  valueStart,
  valueEnd,
  children,
}: ProgressProviderProps) => {
  const [value, setValue] = React.useState(valueStart);

  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
