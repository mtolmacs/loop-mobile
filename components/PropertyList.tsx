import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { type Property, listAtom, loadDetailsAtom } from '#/properties'
import { FlatList } from 'react-native-gesture-handler'
import Loading from '@/Loading'
import { Redirect, useRouter } from 'expo-router'
import { Paragraph, View, YStack } from 'tamagui'
import { RefreshControl } from 'react-native'
import PropertyCard from './PropertyCard'

function ListItem({ item }: Readonly<{ item: Property }>) {
  const router = useRouter()
  const [details, resetDetails] = useAtom(loadDetailsAtom)

  function loadDetails(id: number) {
    // Clear cache of the last details structure (requirements)
    if (details instanceof Error || details?.id !== id) {
      resetDetails()
    }

    router.push({ pathname: `/${id}` })
  }

  return (
    <View onPress={() => loadDetails(Number(item.id))} m="$4" cursor="pointer">
      <PropertyCard data={item} />
    </View>
  )
}

function EmptyList() {
  return (
    <YStack flex={1} alignItems="center" pt="$4">
      <Paragraph>No properties available</Paragraph>
    </YStack>
  )
}

export default function PropertyList() {
  const properties = useAtomValue(loadable(listAtom))
  const reloadProperties = useSetAtom(listAtom)

  if (properties.state === 'loading') {
    return <Loading />
  }

  if (properties.state === 'hasError') {
    return <Redirect href="/error" />
  }

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
      }}
      ListEmptyComponent={<EmptyList />}
      data={properties.data?.properties}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          enabled={true}
          refreshing={properties.state !== 'hasData'}
          onRefresh={reloadProperties}
        />
      }
    />
  )
}
