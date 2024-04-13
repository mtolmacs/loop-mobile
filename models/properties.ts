import { info } from '$/logging'
import { atom } from 'jotai'
import { RESET, atomWithRefresh, atomWithReset } from 'jotai/utils'

export const listAtom = atomWithRefresh(async (get) =>
  fetch(process.env.EXPO_PUBLIC_API_ENDPOINT! + '/Properties')
    .then((res) => {
      info(`[API] Properties LIST (${res.status})`)

      return res
    })
    .then((res) => res.json())
    .catch(() => ({
      properties: [],
    }))
)

const detailsAtom = atomWithReset<PropertyDetails | Error | null>(null)

export const loadDetailsAtom = atom(
  (get) => get(detailsAtom),
  (get, set, id?: number) => {
    if (typeof id === 'undefined') {
      set(detailsAtom, RESET)
    } else {
      fetch(process.env.EXPO_PUBLIC_API_ENDPOINT! + `/Properties/${Number(id)}`)
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
  image: URL
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