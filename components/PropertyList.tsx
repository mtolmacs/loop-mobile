import { useAtomValue } from 'jotai'
import { loadable } from 'jotai/utils'
import { type Property, listAtom } from '#/properties'
import { FlatList } from 'react-native-gesture-handler'
import Loading from '@/Loading'
import { Redirect } from 'expo-router'
import { Paragraph } from 'tamagui'
import Link from '@/Link'

function ListItem({ item }: Readonly<{ item: Property }>) {
  return (
    <Link href={`/${item.id}`} m="$4">
      <Paragraph>{JSON.stringify(item)}</Paragraph>
    </Link>
  )
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
      data={properties.data?.properties}
      renderItem={({ item }) => <ListItem item={item} />}
    />
  )
}
