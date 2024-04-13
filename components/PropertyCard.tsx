import { View, useWindowDimensions, useMedia } from 'tamagui'
import type { Property } from '#/properties'
import type React from 'react'
import { router } from 'expo-router'
import FlexiImage from '@/FlexiImage'
import QuickPanel from '@/QuickPanel'

export type PropertyProps = {
  data: Property
}

export default function PropertyCard({ data }: Readonly<PropertyProps>) {
  const media = useMedia()
  const dim = useWindowDimensions()
  const width = Math.min(dim.width - 100, 900)

  const image = new URL(
    data.image?.length > 0
      ? data.image
      : `https://picsum.photos/seed/${data.id}/200/300?blur=10`
  )

  return (
    <View
      backgroundColor="$color5"
      flexDirection="column"
      $gtXs={{ flexDirection: 'row' }}
      gap="$4"
      borderRadius="$2"
      minHeight={300}
      width={width}
    >
      <FlexiImage image={image} width={media.xs ? width : width / 3} />
      <QuickPanel data={data} />
    </View>
  )
}
