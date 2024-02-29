export interface IRestaurant {
  id: string
  name: string
  uniqueName: string
  address: {
    city: string
    firstLine: string
    postalCode: string
    location: {
      type: string
      coordinates: [number, number]
    }
  }
  rating: {
    count: number
    starRating: number
    userRating: number | null
  }
  isNew: boolean
  driveDistanceMeters: number
  openingTimeLocal: string
  deliveryOpeningTimeLocal: string
  deliveryEtaMinutes: {
    rangeLower: number
    rangeUpper: number
  }
  isCollection: boolean
  isDelivery: boolean
  isOpenNowForCollection: boolean
  isOpenNowForDelivery: boolean
  isOpenNowForPreorder: boolean
  isTemporarilyOffline: boolean
  deliveryCost: number
  minimumDeliveryValue: number
  defaultDisplayRank: number
  isTemporaryBoost: boolean
  isPremier: boolean
  logoUrl: string
  isTestRestaurant: boolean
  deals: {
    description: string
    offerType: string
  }[]
  tags: string[]
  cuisines: {
    name: string
    uniqueName: string
  }[]
  availability: {
    delivery: {
      isOpen: boolean
      canPreOrder: boolean
      isTemporarilyOffline: boolean
      nextAvailability: {
        from: string
      }
      etaMinutes: {
        rangeLower: number
        rangeUpper: number
      }
    }
    collection: {
      isOpen: boolean
      canPreOrder: boolean
      isTemporarilyOffline: boolean
      nextAvailability: {
        from: string
      }
      etaMinutes: {
        approximate: number
      }
    }
  }
}
