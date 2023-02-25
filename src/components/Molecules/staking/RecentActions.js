import { memo } from 'react';
import { TEXT_COLORS } from '../../../theme/theme';
import { RecentActionRow } from './RecentActionRow';

export const RecentActions = memo(() => (
  <div className="flex-1 mt-5 overflow-scroll">
    <h1 className={`${TEXT_COLORS.PURPLE_DARK} font-noto-sans-bold text-lg`}>
      Your recent actions:
    </h1>
    <RecentActionRow operation="Deposite" amount="0000" unlockTime="00:00:00" />
    <RecentActionRow operation="Withdraw" amount="0000" unlockTime="00:00:00" />
    <RecentActionRow />
    <RecentActionRow />
  </div>
));
