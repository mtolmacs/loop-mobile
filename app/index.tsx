import { YStack } from 'tamagui'
import { SafeAreaView } from 'react-native-safe-area-context'
import PropertyList from '@/PropertyList'
import Search from '@/Search'

export default function HomePage() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <YStack flex={1} gap="$4" p="$4">
        <Search />
        <PropertyList />
      </YStack>
    </SafeAreaView>
  )
}
