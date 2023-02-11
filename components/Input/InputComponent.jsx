import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const InputComponent = ({ name, control, label }) => {
  return (
    <Controller
      render={({ field: { onChange, onBlur, value, name, ref } }) => (
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          className="w-full"
          value={value}
          onChange={onChange} // send value to hook form
          onBlur={onBlur} // notify when input is touched
          inputRef={ref} // wire up the input ref
          type="text"
        />
      )}
      name={name}
      control={control}
    />
  );
};

export default InputComponent;
