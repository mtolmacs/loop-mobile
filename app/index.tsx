import { YStack } from 'tamagui'
import PropertyList from '@/PropertyList'
import Search from '@/Search'

export default function HomePage() {
  return (
    <YStack flex={1} gap="$4" p="$4">
      <Search />
      <PropertyList />
    </YStack>
  )
}
