# 组件组合模式速查

## PageHeader
```tsx
<Breadcrumb items={[...]} />
<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <Space>
    <Title level={4}>Page Title</Title>
    <Tag color="processing">Status</Tag>
  </Space>
  <Space>
    <Button>Cancel</Button>
    <Button type="primary">Save</Button>
  </Space>
</div>
```

## FilterBar
```tsx
<Card style={{ marginBottom: 24 }}>
  <Space wrap>
    <Input.Search placeholder="Search..." style={{ width: 240 }} />
    <Select placeholder="Status" options={[...]} style={{ width: 160 }} />
    <DatePicker.RangePicker />
    <Button type="primary" icon={<SearchOutlined />}>Filter</Button>
    <Button icon={<ReloadOutlined />}>Reset</Button>
  </Space>
</Card>
```

## DataCard
```tsx
<Card>
  <Statistic title="Total Revenue" value={112893} prefix="$" />
  <Progress percent={68} status="active" />
</Card>
```

## FormSection（分步表单区块）
```tsx
<div className="form-section">
  <div className="form-section-header">
    <Badge count={1} />
    <Title level={5}>Section Title</Title>
    <Button size="small" icon={<PlusOutlined />}>Add</Button>
  </div>
  <Card>
    <Form layout="vertical">
      <Form.Item label="Field" required>
        <Input />
      </Form.Item>
    </Form>
  </Card>
</div>
```

## StatusDot 状态文字
```tsx
// 不要用 Tag，用 Badge 圆点 + 彩色文字
<Space>
  <Badge status="success" />
  <span style={{ color: '#00B33C' }}>Active</span>
</Space>
```

## ActionTable 操作表格
```tsx
<Table
  columns={[
    ...dataColumns,
    { title: 'Actions', fixed: 'right', width: 160,
      render: () => (
        <Space>
          <Button type="link" size="small">Edit</Button>
          <Button type="link" size="small" danger>Delete</Button>
        </Space>
      )
    }
  ]}
/>
```

## Empty + CTA
```tsx
<Empty description="No campaigns yet">
  <Button type="primary" icon={<PlusOutlined />}>Create Campaign</Button>
</Empty>
```
