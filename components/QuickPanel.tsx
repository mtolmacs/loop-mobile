import type { Property } from '#/properties'
import type React from 'react'
import { H4, H6, Paragraph, XStack, YStack } from 'tamagui'
import Superscript from '@/Superscript'
import StatusIcon from '@/StatusIcon'

function SquareFeet({ area }: { area: string }) {
  return (
    <XStack>
      <Paragraph color="$color9">{area} ft</Paragraph>
      <Superscript>2</Superscript>
    </XStack>
  )
}

function SquareFeetPrice({ price }: { price: string }) {
  return (
    <XStack>
      <Paragraph color="$color9">£{price} / ft</Paragraph>
      <Superscript>2</Superscript>
    </XStack>
  )
}

function DataPanel({ header, children }: React.PropsWithChildren<{ header: string }>) {
  return (
    <XStack flex={1}>
      <YStack alignItems="center" flex={1}>
        <H6 maxWidth={110} height="$5" textAlign="center">
          {header}
        </H6>
        {children}
      </YStack>
    </XStack>
  )
}

export default function QuickPanel({ data }: Readonly<{ data: Property }>) {
  const sqFeetPrice =
    data.price === 0 || data.floorArea === 0
      ? data.price.toLocaleString()
      : (data.price / data.floorArea).toLocaleString()
  const price = data.price.toLocaleString()

  return (
    <YStack px="$4" $gtXs={{ py: '$4' }} flexGrow={1} flex={1} cursor="pointer">
      <XStack gap="$4">
        <H4>£{price}</H4>
        <SquareFeetPrice price={sqFeetPrice} />
        <YStack flex={1} alignItems="flex-end" pr="$4">
          <StatusIcon status={data.status} statusText={data.statusText} />
        </YStack>
      </XStack>

      <Paragraph size="$2" pr="$4">
        {data.propertyTypeText} at {data.address}
      </Paragraph>

      <XStack flexWrap="wrap" gap="$4" m="$4" $xs={{ flexDirection: 'column' }}>
        <XStack flex={1} gap="$4">
          <DataPanel header="Area">
            <SquareFeet area={data.floorArea.toLocaleString()} />
          </DataPanel>
          <DataPanel header="Bedrooms">
            <Paragraph color="$color9">{data.bedrooms}</Paragraph>
          </DataPanel>
        </XStack>

        <XStack flex={1} gap="$4">
          <DataPanel header="Bathrooms">
            <Paragraph color="$color9">{data.bathrooms}</Paragraph>
          </DataPanel>
          <DataPanel header="Reception rooms">
            <Paragraph color="$color9">{data.receptionRooms}</Paragraph>
          </DataPanel>
        </XStack>
      </XStack>
    </YStack>
  )
}
