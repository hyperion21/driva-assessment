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
import { H6 } from "../typography";
import { personalDetailsSchema } from "./validation";

export const PersonalDetailsStep = ({ onNext }: { onNext: () => void }) => {
  const { formData, setFormData, resetFormData } = useFormStore();
  const {
    register,
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
    resetFormData();
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
        <H6 variant="h6" component="h2">
          Personal Details
        </H6>

        <TextField
          label="First Name"
          {...register("firstName")}
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          fullWidth
        />

        <TextField
          label="Last Name"
          {...register("lastName")}
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          fullWidth
        />

        <TextField
          label="Email"
          type="email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <Controller
          name="employmentStatus"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth error={!!errors.employmentStatus}>
              <InputLabel id="employment-status-label">
                Employment Status
              </InputLabel>
              <Select
                labelId="employment-status-label"
                label="Employment Status"
                {...field}
                value={field.value ?? ""}
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
