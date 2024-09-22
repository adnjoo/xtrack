import type { ForceMountable } from '@/src/components/primitives/types';

interface CheckboxRootProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

type CheckboxIndicator = ForceMountable;

export type { CheckboxRootProps, CheckboxIndicator };
