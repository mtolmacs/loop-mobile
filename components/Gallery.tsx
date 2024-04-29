import { ArrowLeft, ArrowRight } from '@tamagui/lucide-icons'
import { useState } from 'react'
import { Button, Image, Paragraph, XStack, YStack, styled } from 'tamagui'

const GalleryItem = styled(YStack, {
  zIndex: 1,
  x: 0,
  opacity: 1,
  fullscreen: true,

  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    going: {
      ':number': (going) => ({
        enterStyle: {
          x: going > 0 ? 1000 : -1000,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          x: going < 0 ? 1000 : -1000,
          opacity: 0,
        },
      }),
    },
  } as const,
})

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

export function Gallery({ images }: { images: URL[] }) {
  const [[page, going], setPage] = useState([0, 0])

  images.forEach((image) => Image.prefetch(image.toString()))

  const imageIndex = wrap(0, images.length, page)
  const paginate = (going: number) => {
    setPage([page + going, going])
  }

  if (images.length === 0) {
    return <Paragraph>No images available</Paragraph>
  }

  return (
    <XStack
      overflow="hidden"
      backgroundColor="#000"
      position="relative"
      height={300}
      maxWidth={820}
      alignItems="center"
    >
      <GalleryItem key={page} going={going}>
        <Image
          source={{
            uri: images[imageIndex].toString(),
            width: 820,
            height: 300,
          }}
        />
      </GalleryItem>

      <Button
        icon={ArrowLeft}
        size="$5"
        position="absolute"
        left="$4"
        circular
        elevate
        onPress={() => paginate(-1)}
        zi={100}
      />
      <Button
        icon={ArrowRight}
        size="$5"
        position="absolute"
        right="$4"
        circular
        elevate
        onPress={() => paginate(1)}
        zi={100}
      />
    </XStack>
  )
}
