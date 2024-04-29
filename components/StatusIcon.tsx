import type { PropertyStatus } from '#/properties'
import {
  ArrowLeftRight,
  BadgeAlert,
  Camera,
  CheckCircle,
  CircleDollarSign,
  Landmark,
  SearchSlash,
  XCircle,
} from '@tamagui/lucide-icons'
import { Paragraph, Tooltip } from 'tamagui'
import selector from '$/selector'

export type StatusIconProps = {
  /**
   * The property status from the API
   */
  status: PropertyStatus

  /**
   * The property status in textual form directly
   * from the API
   */
  statusText: string
}

export default function StatusIcon({ status, statusText }: Readonly<StatusIconProps>) {
  return (
    <Tooltip>
      <Tooltip.Trigger>
        {selector(
          0,
          <SearchSlash />,
          1,
          <Camera />,
          2,
          <Landmark />,
          3,
          <CircleDollarSign />,
          4,
          <ArrowLeftRight />,
          5,
          <CheckCircle />,
          6,
          <XCircle />
        )(status, <BadgeAlert />)}
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        <Paragraph>
          {statusText} {status}
        </Paragraph>
      </Tooltip.Content>
    </Tooltip>
  )
}
