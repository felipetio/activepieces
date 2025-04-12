import { t } from 'i18next';
import { Calendar } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { PieceIconList } from '@/features/pieces/components/piece-icon-list';
import { formatUtils, cn } from '@/lib/utils';
import {
  FlowStatus,
  PopulatedFlow,
  STATUS_COLORS,
  STATUS_VARIANT,
} from '@activepieces/shared';

type McpFlowCardProps = {
  flow: PopulatedFlow;
  onClick: () => void;
};

export const McpFlowCard = ({ flow, onClick }: McpFlowCardProps) => {
  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200 relative border-border cursor-pointer h-full',
        'hover:shadow-md hover:border-primary/30 hover:bg-accent/10',
      )}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-medium text-foreground truncate text-sm">
              {flow.version.displayName}
            </h4>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{formatUtils.formatDate(new Date(flow.created))}</span>
            </div>
          </div>

          <div className="w-full">
            <div className="text-xs text-muted-foreground mb-2">
              {t('Steps')}
            </div>
            <div className="w-full flex items-center gap-2 justify-between">
              <div className="flex items-start py-1">
                <PieceIconList
                  trigger={flow.version.trigger}
                  maxNumberOfIconsToShow={3}
                  size="md"
                />
              </div>
              <span
                style={{
                  backgroundColor:
                    flow.status === FlowStatus.ENABLED
                      ? STATUS_COLORS[STATUS_VARIANT.POSITIVE].color
                      : STATUS_COLORS[STATUS_VARIANT.NEGATIVE].color,
                  color:
                    flow.status === FlowStatus.ENABLED
                      ? STATUS_COLORS[STATUS_VARIANT.POSITIVE].textColor
                      : STATUS_COLORS[STATUS_VARIANT.NEGATIVE].textColor,
                }}
                className="text-xs px-2 py-1 rounded-sm"
              >
                {flow.status === FlowStatus.ENABLED
                  ? t('Enabled')
                  : t('Disabled')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
