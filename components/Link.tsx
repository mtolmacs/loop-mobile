import { useRouter } from 'expo-router'
import { Paragraph } from 'tamagui'

export default function Link({
  href,
  children,
  ...props
}: any) {
  const router = useRouter()

  return (
    <Paragraph cursor="pointer" onPress={() => router.push(href)} {...props}>
      {children}
    </Paragraph>
  )
}