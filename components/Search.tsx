import { Search as SearchIcon } from '@tamagui/lucide-icons'
import { Button, Input, Paragraph, XStack, YStack } from 'tamagui'
import { searchAtom } from '#/properties'
import { useAtom } from 'jotai'
import React from 'react'
import type { NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native'
import { XCircle } from '@tamagui/lucide-icons'

export default function Search() {
  const [query, setQuery] = useAtom(searchAtom)
  const [value, setValue] = React.useState<string>(query ?? '')

  function search() {
    setQuery(value)
  }

  function reset() {
    setValue('')
    setQuery()
  }

  function handleEnterKey(e: NativeSyntheticEvent<TextInputKeyPressEventData>) {
    if (e.nativeEvent.key === 'Enter') {
      search()
    }
  }

  return (
    <YStack>
      <XStack alignItems="center" gap="$2" mx="$4" my="$2">
        <Input
          onChangeText={setValue}
          onKeyPress={handleEnterKey}
          value={value}
          tabIndex={0}
          flex={1}
          placeholder="Search for properties..."
        />
        <Button icon={SearchIcon} onPress={search} />
      </XStack>
      {query && (
        <XStack px="$4">
          <Paragraph px="$2" flex={1}>
            {`Searching for: ${query}`}
          </Paragraph>
          <Button chromeless icon={XCircle} onPress={reset} />
        </XStack>
      )}
    </YStack>
  )
}
