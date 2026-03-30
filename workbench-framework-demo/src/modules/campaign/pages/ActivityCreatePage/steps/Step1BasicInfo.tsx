import { Form, Input, Select, DatePicker, Card, Row, Col } from 'antd'
import type { FormInstance } from 'antd'
import type { ActivityFormValues } from '../types'

const { TextArea } = Input
const { RangePicker } = DatePicker

const ACTIVITY_TYPE_OPTIONS = [
  { value: 'flash_sale', label: 'Flash Sale' },
  { value: 'coupon', label: 'Coupon' },
  { value: 'bundle_deal', label: 'Bundle Deal' },
]

interface Step1Props {
  form: FormInstance<ActivityFormValues>
}

export function Step1BasicInfo({ form: _form }: Step1Props) {
  return (
    <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
      <Row gutter={[16, 0]}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Activity Name"
            name="activityName"
            rules={[{ required: true, message: 'Activity name is required' }]}
          >
            <Input placeholder="e.g. Summer Flash Sale 2026" maxLength={100} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Activity Type"
            name="activityType"
            rules={[{ required: true, message: 'Please select an activity type' }]}
          >
            <Select placeholder="Select type" options={ACTIVITY_TYPE_OPTIONS} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item
            label="Date Range"
            name="dateRange"
            rules={[{ required: true, message: 'Date range is required' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              rows={4}
              placeholder="Brief description of this activity"
              maxLength={500}
              showCount
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  )
}
