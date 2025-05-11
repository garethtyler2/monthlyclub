'use client';

import { useSearchParams } from 'next/navigation';

/**
 * Custom hook to extract rehab-related query parameters from the URL.
 * - injury: the injury name as a string
 * - complaintId: a UUID for the complaint
 * - isValid: true if both injury and a valid complaintId are present
 */
export const useRehabParams = () => {
  const params = useSearchParams();
  const injury = params.get('injury') ?? '';
  const complaintId = params.get('complaintId') ?? '';

  const isValidComplaintId = complaintId.length === 36;

  return {
    injury,
    complaintId,
    isValid: !!injury && isValidComplaintId,
  };
};