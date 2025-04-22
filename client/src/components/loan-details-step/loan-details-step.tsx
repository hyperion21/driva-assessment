import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFormStore, useLenderStore } from "../../store";
import { LoanDetailsFormValues } from "../../types";
import { BottomButtons } from "../bottom-buttons";
import { ICustomButton } from "../custom-button";
import { FlexCol } from "../display";
import { Body1 } from "../typography";
import { loanDetailsSchema } from "./validation";

export const LoanDetailsStep = ({
  onNext,
  onBack,
}: {
  onNext: () => void;
  onBack: () => void;
}) => {
  const { formData, setFormData } = useFormStore();
  const { fetchLenders } = useLenderStore();
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<LoanDetailsFormValues>({
    resolver: yupResolver(loanDetailsSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    setFormData({
      ...formData,
      loanPurpose: "vehicle",
      amount: 0,
      deposit: 0,
      loanTerm: 0,
    });
  };

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
    onClick: handleReset,
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
    if (loanPurpose !== "vehicle") {
      setValue("deposit", 0);
    }
  }, [loanPurpose, setValue]);

  return (
    <FlexCol gap={2}>
      <FlexCol
        id="loan-details-form"
        component="form"
        gap={1}
        onSubmit={handleSubmit(async (data) => {
          setFormData(data);
          await fetchLenders({
            deposit: data.deposit,
            amount: data.amount,
            loanTerm: data.loanTerm,
          });
          onNext();
        })}
      >
        <Body1>Amount to be loaned</Body1>

        <Controller
          name="loanPurpose"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={!!errors.loanPurpose}
              margin="normal"
              data-testid="select-loan-purpose"
            >
              <InputLabel>Loan Purpose</InputLabel>
              <Select
                {...field}
                value={field.value ?? "vehicle"}
                label="Loan Purpose"
              >
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
              data-testid="input-loan-amount"
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
                data-testid="input-deposit"
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
              data-testid="input-loan-term"
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
