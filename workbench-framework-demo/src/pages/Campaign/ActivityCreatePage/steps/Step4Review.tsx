import { Card, Descriptions, Tag, Typography } from 'antd'
import type { FormInstance } from 'antd'
import type { ActivityFormValues, ActivityType, DiscountType, ApplicableScope } from '../types'

const { Text } = Typography

const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  flash_sale: 'Flash Sale',
  coupon: 'Coupon',
  bundle_deal: 'Bundle Deal',
}

const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  percentage: 'Percentage Off',
  fixed_amount: 'Fixed Amount Off',
  buy_x_get_y: 'Buy X Get Y',
}

const SCOPE_LABELS: Record<ApplicableScope, string> = {
  all_products: 'All Products',
  specific_category: 'Specific Category',
  specific_products: 'Specific Products',
}

interface Step4Props {
  form: FormInstance<ActivityFormValues>
}

export function Step4Review({ form }: Step4Props) {
  const values = form.getFieldsValue(true) as ActivityFormValues

  const formatDiscountValue = () => {
    if (!values.discountValue) return '—'
    return values.discountType === 'percentage'
      ? `${values.discountValue}%`
      : `$${values.discountValue}`
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Card
        title="Basic Information"
        style={{ borderRadius: 16 }}
        styles={{ body: { padding: 24 }, header: { borderBottom: '1px solid #f0f0f0' } }}
      >
        <Descriptions column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Activity Name">
            {values.activityName || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Activity Type">
            {values.activityType ? (
              <Tag color="blue">{ACTIVITY_TYPE_LABELS[values.activityType]}</Tag>
            ) : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Date Range">
            {values.dateRange
              ? `${values.dateRange[0]} — ${values.dateRange[1]}`
              : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {values.description || '—'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="Target & Rules"
        style={{ borderRadius: 16 }}
        styles={{ body: { padding: 24 }, header: { borderBottom: '1px solid #f0f0f0' } }}
      >
        <Descriptions column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Discount Type">
            {values.discountType ? DISCOUNT_TYPE_LABELS[values.discountType] : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Discount Value">
            {formatDiscountValue()}
          </Descriptions.Item>
          <Descriptions.Item label="Min Purchase">
            {values.minPurchase != null ? `$${values.minPurchase}` : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Max Discount Cap">
            {values.maxDiscount != null ? `$${values.maxDiscount}` : '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Applicable Scope">
            {values.applicableScope ? SCOPE_LABELS[values.applicableScope] : '—'}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Card
        title="Products"
        style={{ borderRadius: 16 }}
        styles={{ body: { padding: 24 }, header: { borderBottom: '1px solid #f0f0f0' } }}
      >
        {values.applicableScope === 'specific_products' ? (
          <Text>
            {values.selectedProductIds?.length ?? 0} product(s) selected
          </Text>
        ) : (
          <Text type="secondary">
            {values.applicableScope ? SCOPE_LABELS[values.applicableScope] : 'No scope selected'}
          </Text>
        )}
      </Card>
    </div>
  )
}
