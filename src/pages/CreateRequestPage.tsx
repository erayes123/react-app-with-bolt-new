import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { FileInput } from '../components/ui/FileInput';
import { Button } from '../components/ui/Button';
import { SuccessPopup } from '../components/ui/SuccessPopup';
import axiosInstance from '../utils/axios';

const steps = [
  { id: 1, title: 'Basic Information' },
  { id: 2, title: 'Documents' },
  { id: 3, title: 'Additional Details' },
  { id: 4, title: 'Terms & Conditions' },
  { id: 5, title: 'Review' },
];

const schema = z.object({
  // Step 1
  requestType: z.string().min(1, 'Request type is required'),
  subject: z.string()
    .min(1, 'Subject is required')
    .max(255, 'Subject cannot exceed 255 characters')
    .refine(value => !value.startsWith(' '), 'Cannot start with space'),
  description: z.string()
    .min(1, 'Description is required')
    .max(1000, 'Description cannot exceed 1000 characters')
    .refine(value => !value.startsWith(' '), 'Cannot start with space'),
  
  // Step 2 - Files will be handled separately
  
  // Step 3
  priority: z.string().min(1, 'Priority is required'),
  dueDate: z.string().min(1, 'Due date is required'),
  
  // Step 4
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

type FormData = z.infer<typeof schema>;

export const CreateRequestPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [requestNumber, setRequestNumber] = useState('');

  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const formData = watch();

  const handleFileChange = (newFiles: File[]) => {
    setFiles(newFiles);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Select
              label="Request Type"
              name="requestType"
              control={control}
              options={[
                { value: 'type1', label: 'Type 1' },
                { value: 'type2', label: 'Type 2' },
              ]}
              error={errors.requestType?.message}
              rules={{ required: 'Request type is required' }}
              isClearable={true}
            />
            <Input
              label="Subject"
              name="subject"
              register={register}
              error={errors.subject?.message}
            />
            <Input
              label="Description"
              name="description"
              register={register}
              error={errors.description?.message}
              isMultiline={true}
              rows={4}
            />
          </>
        );
      case 2:
        return (
          <FileInput
            label="Upload Documents"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
          />
        );
      case 3:
        return (
          <>
            <Select
              label="Priority"
              name="priority"
              control={control}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              error={errors.priority?.message}
              rules={{ required: 'Priority is required' }}
              isClearable={true}
            />
            <Input
              type="date"
              label="Due Date"
              name="dueDate"
              register={register}
              error={errors.dueDate?.message}
            />
          </>
        );
      case 4:
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium mb-2">Terms & Conditions</h3>
              <p className="text-sm text-gray-600">
                By submitting this request, you agree to our terms and conditions...
              </p>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                {...register('termsAccepted')}
                className="rounded border-gray-300"
              />
              <span className="text-sm">I accept the terms and conditions</span>
            </label>
            {errors.termsAccepted && (
              <p className="text-sm text-red-500">{errors.termsAccepted.message}</p>
            )}
          </div>
        );
      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Basic Information</h3>
                <dl className="space-y-2">
                  <dt className="text-sm text-gray-500">Request Type</dt>
                  <dd>{formData.requestType}</dd>
                  <dt className="text-sm text-gray-500">Subject</dt>
                  <dd>{formData.subject}</dd>
                  <dt className="text-sm text-gray-500">Description</dt>
                  <dd>{formData.description}</dd>
                </dl>
              </div>
              <div>
                <h3 className="font-medium mb-2">Additional Details</h3>
                <dl className="space-y-2">
                  <dt className="text-sm text-gray-500">Priority</dt>
                  <dd>{formData.priority}</dd>
                  <dt className="text-sm text-gray-500">Due Date</dt>
                  <dd>{formData.dueDate}</dd>
                </dl>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Uploaded Documents</h3>
              <ul className="list-disc list-inside">
                {files.map((file, index) => (
                  <li key={index} className="text-sm text-gray-600">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: FormData) => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await axiosInstance.post('/api/requests', formData);
      setRequestNumber(response.data.requestNumber);
      setShowSuccess(true);
    } catch (error) {
      console.error('Failed to create request:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Create New Request</h1>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`flex-1 text-center ${
                step.id === currentStep
                  ? 'text-primary'
                  : step.id < currentStep
                  ? 'text-green-500'
                  : 'text-gray-400'
              }`}
            >
              <div
                className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                  step.id === currentStep
                    ? 'bg-primary text-white'
                    : step.id < currentStep
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200'
                }`}
              >
                {step.id}
              </div>
              <div className="text-sm">{step.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderStep()}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outlined"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <Button type="submit">
            {currentStep === 5 ? 'Submit Request' : 'Next'}
          </Button>
        </div>
      </form>

      {showSuccess && (
        <SuccessPopup
          requestNumber={requestNumber}
          onClose={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};