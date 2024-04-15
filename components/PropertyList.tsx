import { useAtom } from 'jotai'
import { type Property, listAtom, loadDetailsAtom } from '#/properties'
import { FlatList } from 'react-native-gesture-handler'
import Loading from '@/Loading'
import { Redirect, useRouter } from 'expo-router'
import { Button, Paragraph, View, YStack } from 'tamagui'
import { RefreshControl } from 'react-native'
import PropertyCard from './PropertyCard'
import { Suspense, useEffect } from 'react'

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

function PropertyList({ loading }: { loading?: boolean }) {
  const [properties, loadMore] = useAtom(listAtom)

  return (
    <FlatList
      contentContainerStyle={{
        alignItems: 'center',
      }}
      ListEmptyComponent={!loading ? <EmptyList /> : <></>}
      data={properties}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
      onEndReached={() => loadMore()}
      onEndReachedThreshold={0.5}
      ListHeaderComponent={<Button onPress={() => loadMore(true)}>Refresh</Button>}
      ListFooterComponent={loading ?? false ? <Loading /> : <></>}
      refreshControl={
        <RefreshControl
          enabled={true}
          refreshing={loading ?? false}
          onRefresh={() => loadMore(true)}
        />
      }
    />
  )
}

export default function AsyncPropertyList() {
  return (
    <Suspense fallback={<PropertyList loading />}>
      <PropertyList />
    </Suspense>
  )
}
