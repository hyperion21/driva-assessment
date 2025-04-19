import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { LoanDetailsFormValues, LoanFormData } from "../../types";
import { BottomButtons } from "../bottom-buttons";
import { ICustomButton } from "../custom-button";
import { FlexCol } from "../display";
import { loanDetailsSchema } from "./validation";

export const LoanDetailsForm = ({
  defaultValue,
  formData,
  onNext,
  onBack,
  onReset,
}: {
  defaultValue: LoanFormData;
  formData: LoanFormData;
  onNext: (data: LoanDetailsFormValues) => void;
  onBack: () => void;
  onReset: () => void;
}) => {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LoanDetailsFormValues>({
    resolver: yupResolver(loanDetailsSchema),
    defaultValues: defaultValue,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const loanPurpose = watch("loanPurpose");

  const loanDeatilsSubmitButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    text: "Submit",
    type: "submit",
    form: "loan-details-form",
  };

  const resetButton: ICustomButton = {
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: () => {
      onReset();
      reset();
    },
    text: "Reset",
  };

  const backButton: ICustomButton = {
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: onBack,
    text: "Back",
  };

  useEffect(() => {
    setValue("deposit", null);
  }, [loanPurpose, setValue]);

  return (
    <FlexCol gap={2}>
      <FlexCol
        id="loan-details-form"
        component="form"
        gap={1}
        onSubmit={handleSubmit((data: LoanDetailsFormValues) => onNext(data))}
      >
        <Controller
          name="loanPurpose"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.loanPurpose} margin="normal">
              <InputLabel>Loan Purpose</InputLabel>
              <Select {...field} label="Loan Purpose">
                <MenuItem value="vehicle">Vehicle</MenuItem>
                <MenuItem value="home">Home Improvement</MenuItem>
                <MenuItem value="etc">Etc</MenuItem>
              </Select>
              <FormHelperText>{errors.loanPurpose?.message}</FormHelperText>
            </FormControl>
          )}
        />

        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              type="number"
              label="Loan Amount"
              fullWidth
              margin="normal"
              error={!!errors.amount}
              helperText={errors.amount?.message}
            />
          )}
        />

        {loanPurpose === "vehicle" && (
          <Controller
            name="deposit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                value={field.value ?? ""}
                type="number"
                label="Deposit"
                fullWidth
                margin="normal"
                error={!!errors.deposit}
                helperText={errors.deposit?.message}
              />
            )}
          />
        )}

        <Controller
          name="loanTerm"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              value={field.value ?? ""}
              type="number"
              label="Loan Term (years)"
              fullWidth
              margin="normal"
              error={!!errors.loanTerm}
              helperText={errors.loanTerm?.message}
            />
          )}
        />
      </FlexCol>
      <BottomButtons
        buttonProps={{
          primary: loanDeatilsSubmitButton,
          secondary: resetButton,
          destructive: backButton,
        }}
      />
    </FlexCol>
  );
};
