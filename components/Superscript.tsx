import { Text } from 'tamagui'

export default function Supercript({ children }: React.PropsWithChildren) {
  return (
    <Text fontSize="$1" style={{ textAlignVertical: 'top' }} color="$color9">
      {children}
    </Text>
  )
}
