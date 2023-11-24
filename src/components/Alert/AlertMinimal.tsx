import { CSSProperties, ReactNode } from 'react';

import Text from '../Text';

export type AlertMinimalVariant =
  | 'information'
  | 'success'
  | 'warning'
  | 'danger';

type AlertMinimalProps = {
  /**
   * Variant of Alert styles
   */
  variant: AlertMinimalVariant;
  /**
   * Description of Alert
   */
  description: ReactNode;
  /**
   * Aditional CSS styles
   */
  style?: CSSProperties;
};

/**
 *
 * Alert to show messages to users
 */
function AlertMinimal({ variant, description, style }: AlertMinimalProps) {
  return (
    <div
      className={`pm-c-alert-minimal--${variant}`}
      role="alert"
      style={style}
    >
      <Text
        as="p"
        scale="caption"
        fontWeight="semibold"
        className="pm-c-alert-minimal__description"
      >
        {description}
      </Text>
    </div>
  );
}

export default AlertMinimal;
