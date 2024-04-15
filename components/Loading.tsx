import { Paragraph, Spinner, XStack, YStack } from 'tamagui'

export default function Loading() {
  return (
    <XStack flex={1} alignItems="center">
      <YStack flex={1} alignItems="center" m="$4">
        <Spinner size="large" />
        <Paragraph>LOADING...</Paragraph>
      </YStack>
    </XStack>
  )
}
