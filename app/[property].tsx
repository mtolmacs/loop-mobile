import { loadDetailsAtom } from '#/properties'
import Loading from '@/Loading'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { useAtom } from 'jotai'
import React from 'react'
import { Paragraph } from 'tamagui'

export default function PropertyDetailsPage() {
  const { property: propertyId } = useLocalSearchParams()
  const [property, loadProperty] = useAtom(loadDetailsAtom)

  React.useEffect(() => {
    loadProperty(Number(propertyId))
  }, [])

  if (!propertyId) {
    return <Redirect href="/not-found" />
  }

  if (property === null) {
    return <Loading />
  }

  if (property instanceof Error) {
    return <Redirect href="/error" />
  }

  return <Paragraph m="$4">{property && JSON.stringify(property)}</Paragraph>
}
