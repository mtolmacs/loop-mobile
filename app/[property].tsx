import { loadDetailsAtom } from '#/properties'
import { Gallery } from '@/Gallery'
import Loading from '@/Loading'
import { Redirect, Stack, useLocalSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import { H3, Paragraph, XStack, YStack } from 'tamagui'

export default function PropertyDetailsPage() {
  const { property: propertyId } = useLocalSearchParams()
  const [property, loadProperty] = useAtom(loadDetailsAtom)

  React.useEffect(() => {
    loadProperty(Number(propertyId))
  }, [])

  if (!propertyId) {
    return <Redirect href="/not-found" />
  }

  if (property === null) {
    return <Loading />
  }

  if (property instanceof Error) {
    return <Redirect href="/error" />
  }

  const images = property.images?.map(
    (image) => new URL(image.url?.length > 0 ? image.url : 'https://placehold.co/300x200')
  )

  return (
    <XStack flex={1}>
      <YStack flex={1} m="$4" alignItems="center" gap="$4">
        <YStack gap="$4" maxWidth={820}>
          <H3>{property.propertyTypeText} on {property.address}</H3>
          <Gallery images={images} />
        </YStack>
      </YStack>
      <Stack.Screen options={{ title: property.propertyTypeText }} />
    </XStack>
  )
}
