import { Redirect, useLocalSearchParams } from 'expo-router'
import { Paragraph } from 'tamagui'

export default function PropertyDetailsPage() {
  const { property: propertyId } = useLocalSearchParams()

  if (!propertyId) {
    return <Redirect href="/not-found" />
  }

  return <Paragraph>DETAILS WITH ID {propertyId}</Paragraph>
}
