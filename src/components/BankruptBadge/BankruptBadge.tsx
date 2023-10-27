import { features, ui } from 'config';

import Pill from '../Pill';

type BankruptBadgeProps = {
  bankrupt?: boolean | null;
};

function BankruptBadge({ bankrupt }: BankruptBadgeProps) {
  if (!features.fantasy.enabled || !ui.socialLogin.enabled) return null;

  if (!bankrupt) return null;

  return (
    <Pill variant="subtle" color="danger">
      Bankrupt
    </Pill>
  );
}

export default BankruptBadge;
