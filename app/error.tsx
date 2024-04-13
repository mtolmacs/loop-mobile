import { useRouter } from 'expo-router'
import { Button, H3, Paragraph, XStack, YStack } from 'tamagui'

export default function ErrorPage() {
  const router = useRouter()

  return (
    <XStack alignItems="center">
      <YStack p="$4" flex={1} alignItems="center">
        <H3>Error</H3>
        <Paragraph>An error happened</Paragraph>
        <Button onPress={() => router.replace('/')} mt="$12">
          Back to property listings
        </Button>
      </YStack>
    </XStack>
  )
}
