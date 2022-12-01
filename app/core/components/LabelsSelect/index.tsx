import type { PropsWithoutRef } from "react"
import { Fragment, useEffect } from "react"

import { CircularProgress, TextField, Autocomplete, debounce } from "@mui/material"
import { useControlField, useField } from "remix-validated-form"
import type { SubmitOptions } from "@remix-run/react"
import { useFetcher } from "@remix-run/react"

type LabelValue = {
  id: string
  name: string
}

interface LabelsSelectProps {
  defaultValue?: LabelValue[]
  name: string
  label: string
  helperText?: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements["div"]>
}

const labelsOptions: SubmitOptions = { method: "get", action: "/labels-search" }

export const LabelsSelect = ({
  name,
  label,
  helperText,
  defaultValue = [],
  outerProps,
}: LabelsSelectProps) => {
  const labelFetcher = useFetcher<LabelValue[]>()
  const { error, getInputProps } = useField(name)
  const [values, setValues] = useControlField<LabelValue[]>(name)
  const searchLabels = (value: string) => {
    labelFetcher.submit({ q: value }, labelsOptions)
  }
  const searchLabelsDebounced = debounce(searchLabels, 500)

  useEffect(() => {
    if (labelFetcher.type === "init") {
      labelFetcher.submit({}, labelsOptions)
    }
  }, [labelFetcher])
  return (
    <div {...outerProps}>
      {values?.map((value, i) => (
        <input type="hidden" name={`${name}[${i}].id`} key={i} value={value.id} />
      ))}
      <Autocomplete
        multiple={true}
        fullWidth
        {...getInputProps()}
        style={{ margin: "1em 0" }}
        options={labelFetcher.data ?? []}
        defaultValue={defaultValue}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        onInputChange={(_, value) => searchLabelsDebounced(value)}
        onChange={(_e, newValues) => {
          setValues(newValues)
        }}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={!!error}
            helperText={error || helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <Fragment>
                  {labelFetcher.state === "submitting" ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  )
}

export default LabelsSelect
