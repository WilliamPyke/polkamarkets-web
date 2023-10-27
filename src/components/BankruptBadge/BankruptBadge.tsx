import { features, ui } from 'config';

import { useAppSelector } from 'hooks';

import Pill from '../Pill';

function BankruptBadge() {
  const bankrupt = useAppSelector(state => state.polkamarkets.bankrupt);

  if (!features.fantasy.enabled || !ui.socialLogin.enabled) return null;

  if (!bankrupt) return null;

  return (
    <Pill variant="subtle" color="danger">
      Bankrupt
    </Pill>
  );
}

export default BankruptBadge;
