import { TextField } from "@material-ui/core";
import React from "react";

interface Props {
  value: string;
  label: string;
}

export default function Text({ value, label }: Props) {
  return (
    <TextField
      label={label}
      defaultValue={value}
      InputProps={{
        readOnly: true,
      }}
      variant="outlined"
    />
  );
}
