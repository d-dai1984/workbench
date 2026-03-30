export type ActivityType = 'flash_sale' | 'coupon' | 'bundle_deal'

export type DiscountType = 'percentage' | 'fixed_amount' | 'buy_x_get_y'

export type ApplicableScope = 'all_products' | 'specific_category' | 'specific_products'

export interface ActivityFormValues {
  // Step 1: Basic Info
  activityName: string
  activityType: ActivityType
  dateRange: [string, string]
  description?: string

  // Step 2: Target & Rules
  discountType: DiscountType
  discountValue: number
  minPurchase?: number
  maxDiscount?: number
  applicableScope: ApplicableScope

  // Step 3: Products
  selectedProductIds: string[]
}

export interface Product {
  id: string
  name: string
  category: string
  price: number
  status: 'active' | 'inactive'
}

/** Discount types available per activity type */
export const DISCOUNT_TYPE_MAP: Record<ActivityType, DiscountType[]> = {
  flash_sale: ['percentage', 'fixed_amount'],
  coupon: ['percentage', 'fixed_amount', 'buy_x_get_y'],
  bundle_deal: ['fixed_amount', 'buy_x_get_y'],
}
