import React from 'react';
import PropTypes from 'prop-types';
import { isFunction, isEmpty } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import { Box, Stack, ContextContainer, Button } from '@bubbles-ui/components';
import { TextEditor } from '@bubbles-ui/editors';
import { ChevRightIcon, ChevLeftIcon } from '@bubbles-ui/icons/outline';

function InstructionData({
  labels,
  placeholders,
  helps,
  errorMessages,
  sharedData,
  setSharedData,
  editable,
  onNext,
  onPrevious,
  ...props
}) {
  // ·······························································
  // FORM

  const defaultValues = {
    forTeacher: '',
    forStudent: '',
    ...sharedData,
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  // ·······························································
  // HANDLERS

  const handleOnNext = (e) => {
    const data = { ...sharedData, ...e };
    if (isFunction(setSharedData)) setSharedData(data);
    if (isFunction(onNext)) onNext(data);
  };

  // ---------------------------------------------------------------
  // COMPONENT

  return (
    <form onSubmit={handleSubmit(handleOnNext)}>
      <ContextContainer {...props} divided>
        <ContextContainer title={labels.title}>
          <Box>
            <Controller
              control={control}
              name="instructionsForTeacher"
              rules={{ required: errorMessages.forTeacher?.required }}
              render={({ field }) => (
                <TextEditor
                  {...field}
                  label={labels.forTeacher}
                  placeholder={placeholders.forTeacher}
                  help={helps.forTeacher}
                  error={errors.forTeacher}
                  required={!isEmpty(errorMessages.forTeacher?.required)}
                />
              )}
            />
          </Box>
          <Box>
            <Controller
              control={control}
              name="instructionsForStudent"
              rules={{ required: errorMessages.forStudent?.required }}
              render={({ field }) => (
                <TextEditor
                  {...field}
                  label={labels.forStudent}
                  placeholder={placeholders.forStudent}
                  help={helps.forStudent}
                  error={errors.forStudent}
                  required={!isEmpty(errorMessages.forStudent?.required)}
                />
              )}
            />
          </Box>
        </ContextContainer>
        <Stack fullWidth justifyContent="space-between">
          <Box>
            <Button
              compact
              variant="light"
              leftIcon={<ChevLeftIcon height={20} width={20} />}
              onClick={onPrevious}
            >
              {labels.buttonPrev}
            </Button>
          </Box>
          <Box>
            <Button type="submit" rightIcon={<ChevRightIcon height={20} width={20} />}>
              {labels.buttonNext}
            </Button>
          </Box>
        </Stack>
      </ContextContainer>
    </form>
  );
}

InstructionData.defaultProps = {
  helps: {},
  labels: {},
  descriptions: {},
  placeholders: {},
  errorMessages: {},
};
InstructionData.propTypes = {
  labels: PropTypes.object,
  descriptions: PropTypes.object,
  placeholders: PropTypes.object,
  helps: PropTypes.object,
  errorMessages: PropTypes.object,
  sharedData: PropTypes.any,
  setSharedData: PropTypes.func,
  editable: PropTypes.bool,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { InstructionData };
