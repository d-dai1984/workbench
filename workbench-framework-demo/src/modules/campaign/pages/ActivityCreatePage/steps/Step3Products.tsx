import { useState, useMemo } from 'react'
import { Form, Card, Table, Input, Tag, Typography } from 'antd'
import type { FormInstance } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { ActivityFormValues, Product, ApplicableScope } from '../types'

const { Search } = Input
const { Text } = Typography

const MOCK_PRODUCTS: Product[] = [
  { id: 'P001', name: 'Hong Kong Disneyland Ticket', category: 'Theme Park', price: 89.0, status: 'active' },
  { id: 'P002', name: 'Universal Studios Singapore', category: 'Theme Park', price: 79.0, status: 'active' },
  { id: 'P003', name: 'Tokyo Tower Observation Deck', category: 'Attraction', price: 12.0, status: 'active' },
  { id: 'P004', name: 'Bali Spa & Massage Package', category: 'Wellness', price: 45.0, status: 'active' },
  { id: 'P005', name: 'Seoul City Bus Tour', category: 'Tour', price: 25.0, status: 'active' },
  { id: 'P006', name: 'Taipei 101 Observatory', category: 'Attraction', price: 15.0, status: 'inactive' },
  { id: 'P007', name: 'Bangkok River Cruise Dinner', category: 'Tour', price: 55.0, status: 'active' },
  { id: 'P008', name: 'Osaka Castle Admission', category: 'Attraction', price: 8.0, status: 'active' },
]

const columns: ColumnsType<Product> = [
  { title: 'Product ID', dataIndex: 'id', width: 120 },
  { title: 'Product Name', dataIndex: 'name', ellipsis: true },
  { title: 'Category', dataIndex: 'category', width: 120 },
  {
    title: 'Price',
    dataIndex: 'price',
    width: 100,
    render: (v: number) => `$${v.toFixed(2)}`,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 100,
    render: (s: string) => (
      <Tag color={s === 'active' ? 'green' : 'default'}>{s === 'active' ? 'Active' : 'Inactive'}</Tag>
    ),
  },
]

interface Step3Props {
  form: FormInstance<ActivityFormValues>
}

export function Step3Products({ form }: Step3Props) {
  const [searchText, setSearchText] = useState('')
  const applicableScope = Form.useWatch('applicableScope', form) as ApplicableScope | undefined
  const selectedProductIds: string[] = Form.useWatch('selectedProductIds', form) ?? []

  const filteredProducts = useMemo(() => {
    if (!searchText) return MOCK_PRODUCTS
    const lower = searchText.toLowerCase()
    return MOCK_PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(lower) || p.id.toLowerCase().includes(lower),
    )
  }, [searchText])

  if (applicableScope !== 'specific_products') {
    return (
      <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
        <Text type="secondary">
          {applicableScope === 'all_products'
            ? 'This activity applies to all products. No product selection needed.'
            : 'This activity applies to a specific category. Product selection is not required.'}
        </Text>
      </Card>
    )
  }

  return (
    <Card style={{ borderRadius: 16 }} styles={{ body: { padding: 24 } }}>
      <Form.Item
        name="selectedProductIds"
        rules={[{
          validator: (_, value) =>
            value && value.length > 0
              ? Promise.resolve()
              : Promise.reject(new Error('Please select at least one product')),
        }]}
        style={{ marginBottom: 0 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Search
            placeholder="Search by product name or ID"
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Text type="secondary">{selectedProductIds.length} product(s) selected</Text>
          <Table<Product>
            rowKey="id"
            columns={columns}
            dataSource={filteredProducts}
            size="middle"
            pagination={{ pageSize: 5, showTotal: (total) => `${total} items` }}
            rowSelection={{
              selectedRowKeys: selectedProductIds,
              onChange: (keys) => form.setFieldValue('selectedProductIds', keys as string[]),
            }}
          />
        </div>
      </Form.Item>
    </Card>
  )
}
