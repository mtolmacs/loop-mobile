import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { loadable } from 'jotai/utils'
import { type Property, listAtom, loadDetailsAtom } from '#/properties'
import { FlatList } from 'react-native-gesture-handler'
import Loading from '@/Loading'
import { Redirect, useRouter } from 'expo-router'
import { Paragraph, View } from 'tamagui'

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
      <Paragraph>{JSON.stringify(item)}</Paragraph>
    </View>
  )
}

function EmptyList() {
  return <Paragraph>No properties available</Paragraph>
}

export default function PropertyList() {
  const properties = useAtomValue(loadable(listAtom))

  if (properties.state === 'loading') {
    return <Loading />
  }

  if (properties.state === 'hasError') {
    return <Redirect href="/error" />
  }

  return (
    <FlatList
      ListEmptyComponent={<EmptyList />}
      data={properties.data?.properties}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  )
}
