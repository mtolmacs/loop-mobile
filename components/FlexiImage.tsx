import { Image } from 'tamagui'

export default function FlexiImage({ image, width }: { image: URL; width: number }) {
  return (
    <Image
      borderTopLeftRadius="$2"
      borderTopRightRadius="$2"
      borderBottomLeftRadius={0}
      borderBottomRightRadius={0}
      $gtSm={{
        borderTopLeftRadius: '$2',
        borderTopRightRadius: 0,
        borderBottomLeftRadius: '$2',
        borderBottomRightRadius: 0,
      }}
      source={{
        uri: image.toString(),
        width: width,
        height: 300,
      }}
    />
  )
}
