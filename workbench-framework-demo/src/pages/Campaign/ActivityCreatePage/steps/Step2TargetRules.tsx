import { Form, Select, InputNumber, Card, Row, Col, Typography } from 'antd'
import type { FormInstance } from 'antd'
import type { ActivityFormValues, ActivityType, DiscountType } from '../types'
import { DISCOUNT_TYPE_MAP } from '../types'

const { Text } = Typography

const DISCOUNT_TYPE_LABELS: Record<DiscountType, string> = {
  percentage: 'Percentage Off',
  fixed_amount: 'Fixed Amount Off',
  buy_x_get_y: 'Buy X Get Y',
}

const SCOPE_OPTIONS = [
  { value: 'all_products', label: 'All Products' },
  { value: 'specific_category', label: 'Specific Category' },
  { value: 'specific_products', label: 'Specific Products' },
]

interface Step2Props {
  form: FormInstance<ActivityFormValues>
}

export function Step2TargetRules({ form }: Step2Props) {
  const activityType = Form.useWatch('activityType', form) as ActivityType | undefined
  const discountType = Form.useWatch('discountType', form) as DiscountType | undefined

  const availableDiscountTypes = activityType
    ? DISCOUNT_TYPE_MAP[activityType].map((t) => ({ value: t, label: DISCOUNT_TYPE_LABELS[t] }))
    : []

  return (
    <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
      {!activityType && (
        <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
          Discount options depend on the Activity Type selected in Step 1.
        </Text>
      )}
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Discount Type"
            name="discountType"
            rules={[{ required: true, message: 'Please select a discount type' }]}
          >
            <Select
              placeholder={activityType ? 'Select discount type' : 'Select Activity Type first'}
              options={availableDiscountTypes}
              disabled={!activityType}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Discount Value"
            name="discountValue"
            rules={[{ required: true, message: 'Discount value is required' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              max={discountType === 'percentage' ? 100 : undefined}
              placeholder={discountType === 'percentage' ? '0 – 100' : '0.00'}
              addonAfter={discountType === 'percentage' ? '%' : 'USD'}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Min Purchase Amount" name="minPurchase">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0.00" addonAfter="USD" />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Max Discount Cap" name="maxDiscount">
            <InputNumber style={{ width: '100%' }} min={0} placeholder="0.00" addonAfter="USD" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Applicable Scope"
            name="applicableScope"
            rules={[{ required: true, message: 'Please select applicable scope' }]}
          >
            <Select placeholder="Select scope" options={SCOPE_OPTIONS} />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}
