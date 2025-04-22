import { yupResolver } from "@hookform/resolvers/yup";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useFormStore } from "../../store";
import { PersonalDetailsFormValues } from "../../types";
import { BottomButtons } from "../bottom-buttons";
import { ICustomButton } from "../custom-button";
import { FlexCol } from "../display";
import { Body1 } from "../typography";
import { personalDetailsSchema } from "./validation";

export const PersonalDetailsStep = ({ onNext }: { onNext: () => void }) => {
  const { defaultFormData, formData, setFormData } = useFormStore();
  const {
    register,
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<PersonalDetailsFormValues>({
    resolver: yupResolver(personalDetailsSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  const handleReset = () => {
    setFormData(defaultFormData);
  };
  const employmentStatus = watch("employmentStatus");

  const personalDetailsNextButton: ICustomButton = {
    option: "enable",
    variant: "contained",
    form: "personal-details-form",
    text: "Next",
    type: "submit",
  };

  const resetButton: ICustomButton = {
    option: "enable",
    variant: "text",
    sx: { color: "gray" },
    onClick: handleReset,
    text: "Reset",
  };

  useEffect(() => {
    if (employmentStatus !== "employed") {
      setValue("employerName", "");
    }
  }, [employmentStatus, setValue]);

  return (
    <FlexCol gap={2}>
      <FlexCol
        id="personal-details-form"
        component="form"
        gap={1}
        onSubmit={handleSubmit((data) => {
          setFormData({
            ...data,
            loanPurpose: "vehicle",
            amount: 0,
            deposit: 0,
            loanTerm: 0,
          });
          onNext();
        })}
      >
        <Body1>User information</Body1>

        <TextField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
          data-testid="input-first-name"
        />

        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
          data-testid="input-last-name"
        />

        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
          data-testid="input-email"
        />

        <Controller
          name="employmentStatus"
          control={control}
          render={({ field }) => (
            <FormControl
              fullWidth
              error={!!errors.employmentStatus}
              data-testid="select-employment-status"
            >
              <InputLabel id="employment-status-label">
                Employment Status
              </InputLabel>
              <Select
                labelId="employment-status-label"
                label="Employment Status"
                {...field}
                value={field.value ?? "employed"}
              >
                <MenuItem value="employed">Employed</MenuItem>
                <MenuItem value="self-employed">Self-Employed</MenuItem>
                <MenuItem value="unemployed">Unemployed</MenuItem>
              </Select>
              {errors.employmentStatus && (
                <FormHelperText>
                  {errors.employmentStatus.message}
                </FormHelperText>
              )}
            </FormControl>
          )}
        />

        {employmentStatus === "employed" && (
          <TextField
            label="Employer Name"
            {...register("employerName")}
            error={!!errors.employerName}
            helperText={errors.employerName?.message}
            fullWidth
            data-testid="input-employer-name"
          />
        )}
      </FlexCol>

      <BottomButtons
        buttonProps={{
          primary: personalDetailsNextButton,
          secondary: resetButton,
        }}
      />
    </FlexCol>
  );
};
