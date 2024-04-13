import type React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function GestureProvider({ children }: React.PropsWithChildren) {
  return <GestureHandlerRootView style={{ flex: 1 }}>{children}</GestureHandlerRootView>
}
