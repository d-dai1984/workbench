import { Button, Table, Tag } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { ModuleCard } from '../ModuleCard'
import { todoData, type TodoRow } from './dashboardData'

const stageTagClassMap: Record<string, string> = {
  contracting: 'klook-bench-todo-stage-tag--contracting',
  Active: 'klook-bench-todo-stage-tag--active',
  Growth: 'klook-bench-todo-stage-tag--growth',
}

const columns: TableColumnsType<TodoRow> = [
  {
    title: '',
    dataIndex: 'priority',
    key: 'priority',
    width: 36,
    render: (text: string) => <span className="klook-bench-todo-priority">{text}</span>,
  },
  {
    title: 'Task Name',
    dataIndex: 'taskTitle',
    key: 'taskName',
    width: 300,
    render: (_, record) => (
      <div className="klook-bench-todo-task-name">
        <div>{record.taskTitle}</div>
        <div>{record.taskSubtitle}</div>
      </div>
    ),
  },
  {
    title: 'Stage',
    dataIndex: 'stage',
    key: 'stage',
    width: 108,
    align: 'center',
    render: (text: string) => (
      <Tag className={`klook-bench-todo-stage-tag ${stageTagClassMap[text] ?? ''}`} variant="filled">
        {text}
      </Tag>
    ),
  },
  { title: 'Deadline', dataIndex: 'deadline', key: 'deadline', width: 84, align: 'center' },
  { title: 'Risk', dataIndex: 'risk', key: 'risk', width: 64, align: 'center' },
  { title: 'Status', dataIndex: 'status', key: 'status', width: 124, align: 'center' },
  {
    title: 'Actions',
    key: 'actions',
    width: 190,
    align: 'left',
    onHeaderCell: () => ({ style: { textAlign: 'center' } }),
    render: (_, record) => (
      <div className="klook-bench-todo-actions">
        <Button type="link" className="klook-bench-todo-action-btn">
          {record.primaryAction}
        </Button>
        <span className="klook-bench-todo-action-divider" />
        <Button type="link" className="klook-bench-todo-action-btn">
          {record.secondaryAction}
        </Button>
      </div>
    ),
  },
]

export function TodoListCard() {
  return (
    <ModuleCard
      title="Todo List"
      className="klook-bench-todo-module-card"
      action={
        <Button size="small" icon={<PlusOutlined />} className="klook-bench-todo-add-btn">
          Add New
        </Button>
      }
    >
      <Table<TodoRow>
        columns={columns}
        dataSource={todoData}
        pagination={false}
        className="klook-bench-todo-table"
        rowClassName={() => 'klook-bench-todo-table-row'}
        scroll={{ x: 960 }}
      />
    </ModuleCard>
  )
}
