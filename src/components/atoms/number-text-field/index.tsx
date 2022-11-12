import { TextField, TextFieldProps } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

type Props = Omit<TextFieldProps, "value" | "onChange" | "onBlur"> & {
  value: number;
  onChange: (value: number) => void;
};

export function NumberTextField({ value, onChange, ...props }: Props) {
  const [rawValue, setRawValue] = useState("");

  console.log(value, rawValue);

  useEffect(() => {
    setRawValue(value.toString());
  }, [value]);

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const numValue = Number(e.target.value);
      if (!Number.isNaN(numValue)) {
        onChange(numValue);
      }
    },
    [onChange]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRawValue(e.target.value);
  }, []);

  return (
    <TextField
      value={rawValue}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  );
}
