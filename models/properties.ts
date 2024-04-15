import { info } from '$/logging'
import { atom } from 'jotai'
import { RESET, atomWithReset } from 'jotai/utils'
import { Platform } from 'react-native'

const apiUrl =
  Platform.OS === 'web' && process.env.NODE_ENV === 'development'
    ? process.env.EXPO_PUBLIC_API_ENDPOINT!
    : process.env.EXPO_PUBLIC_API_URL!

/**
 * Load the properties from the LIST API
 */
const loadProperties = (query: string | null = null, offset = 0): Promise<Property[]> =>
  Promise.resolve(new URL(apiUrl + '/Properties'))
    // Set query parameter if needed
    .then((url) => {
      if (query != null && query.length > 0) {
        url.searchParams.set('query', query)
      }

      return url
    })
    // Set the offset if it's larger than 0
    .then((url) => {
      if (offset != 0) {
        url.searchParams.set('offset', offset.toString())
      }

      return url
    })
    // Load the data from the API
    .then((url) => fetch(url))
    // Logging the request
    .then((res) => {
      info(`[API] Properties LIST (${res.status})`)

      return res
    })
    // Transform into JSON
    .then((res) => res.json())
    .catch(() => ({ properties: [] }))
    // Extract the data we need
    .then((json) => json.properties)

const queryAtom = atom<string | undefined>(undefined)

export const searchAtom = atom(
  (get) => get(queryAtom),
  (get, set, term?: string) => {
    set(queryAtom, term)
    set(listAtom, true)
  }
)
export const offsetAtom = atom<number>(0) // With reset for pull to refresh?

const propertiesAtom = atom<Property[]>([])

export const listAtom = atom(
  (get) => get(propertiesAtom),
  async (get, set, reset?: boolean) => {
    const offset = reset ? 0 : get(offsetAtom)
    info('listAtom:SET with offset ' + offset)
    const data = await loadProperties(get(queryAtom), offset)
    set(offsetAtom, offset + 1)

    if (offset === 0) {
      set(propertiesAtom, data)
    } else {
      set(propertiesAtom, (prev) => [...prev, ...data])
    }
  }
)

const detailsAtom = atomWithReset<PropertyDetails | Error | null>(null)

export const loadDetailsAtom = atom(
  (get) => get(detailsAtom),
  (get, set, id?: number) => {
    if (typeof id === 'undefined') {
      set(detailsAtom, RESET)
    } else {
      fetch(apiUrl + `/Properties/${Number(id)}`)
        .then((res) => {
          info(`[API] Properties GET (${res.status})`)

          return res
        })
        .then((res) => res.json())
        .catch(() => new Error('Failed to load property details'))
        .then((res) => set(detailsAtom, res))
    }
  }
)

export type Property = {
  id: number
  address: string
  propertyType: PropertyType
  propertyTypeText: string
  price: number
  status: PropertyStatus
  statusText: string
  bedrooms: number
  bathrooms: number
  receptionRooms: number
  floorArea: number
  image: string
}

export type PropertyStatus = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6

export type PropertyType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19
  | 20
  | 21
  | 22
  | 24
  | 25
  | 26
  | 27
  | 28
  | 29
  | 30
  | 31
  | 32
  | 33
  | 34
  | 35
  | 36
  | 37
  | 38
  | 39
  | 40
  | 41
  | 42
  | 43
  | 44
  | 45
  | 46
  | 47
  | 48
  | 49
  | 50
  | 51
  | 52
  | 53
  | 54
  | 55
  | 56
  | 57
  | 58
  | 59
  | 60
  | 61
  | 62
  | 63
  | 64
  | 65
  | 67
  | 68
  | 69
  | 70
  | 71
  | 72
  | 73
  | 74
  | 75
  | 76
  | 77
  | 78
  | 79
  | 80
  | 81
  | 82
  | 83
  | 84
  | 85
  | 86
  | 87
  | 88
  | 89
  | 90
  | 91
  | 92
  | 93
  | 94
  | 95
  | -1

type PropertyDetails = {
  id: number
  propertyStatus: PropertyStatus
  propertyStatusText: string
  propertyType: PropertyType
  propertyTypeText: string
  sellerGroupId: number
  price: number
  priceCurrency: string
  bedrooms: 0
  bathrooms: 0
  receptionRooms: 0
  areaSquareFeet: 0
  address: string
  geolocation: {
    lat: number
    lng: number
  }
  leaseInformation: {
    type: number
    typeText: string
    leaseExpires: string
    serviceCharge: number
    groundRent: number
  }
  contractInformation: {
    instructedOnDate: string
    launchedDate: string
    expiresDate: string
  }
  taxInformation: {
    councilTaxBand: string
    localAuthority: string
  }
  accessAndAlarm: string
  images: [
    {
      id: number
      url: string
      mediaType: number
      priority: number
    },
  ]
  brochures: [
    {
      id: number
      url: string
      mediaType: number
      priority: number
    },
  ]
}
