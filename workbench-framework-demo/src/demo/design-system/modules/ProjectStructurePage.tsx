import { Card, Typography, Row, Col, Table, Tag } from 'antd'
import {
  FolderOutlined,
  FileOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons'
import type { TreeNode } from '../data/projectStructure'
import { DIR_TREE, CORE_RULES, NAMING_DATA, ROUTES, CHECKLIST } from '../data/projectStructure'

const { Title, Text, Paragraph } = Typography

/* ─── Bilingual helpers ─── */
function Bi({ en, cn }: { en: string; cn: string }) {
  return (
    <>
      {en}
      <Text type="secondary" style={{ fontSize: '0.85em', marginLeft: 6 }}>
        {cn}
      </Text>
    </>
  )
}

function BiBlock({ en, cn }: { en: string; cn: string }) {
  return (
    <div>
      <div>{en}</div>
      <Text type="secondary" style={{ fontSize: 12 }}>
        {cn}
      </Text>
    </div>
  )
}

const NAMING_COLUMNS = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (text: string, record: (typeof NAMING_DATA)[number]) => (
      <div>
        <Text strong>{text}</Text>
        <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>{record.typeCn}</Text>
      </div>
    ),
  },
  {
    title: 'Convention',
    dataIndex: 'convention',
    key: 'convention',
    render: (text: string) => <Tag>{text}</Tag>,
  },
  {
    title: 'Example',
    dataIndex: 'example',
    key: 'example',
    render: (text: string) => <Text code style={{ fontSize: 12 }}>{text}</Text>,
  },
]

/* ─── Tree visualization component ─── */

function DirectoryTree({ nodes }: { nodes: TreeNode[] }) {
  return (
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: 13,
        lineHeight: 2,
        padding: '16px 20px',
        borderRadius: 10,
        background: 'rgba(0, 0, 0, 0.02)',
      }}
    >
      <div style={{ color: 'rgba(0,0,0,0.45)', marginBottom: 4 }}>
        {'src/'}
      </div>
      {nodes.map((node, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            paddingLeft: 16 + node.indent * 16,
            gap: 8,
          }}
        >
          {node.isDir ? (
            <FolderOutlined style={{ color: '#1677FF', fontSize: 12 }} />
          ) : (
            <FileOutlined style={{ color: '#8C8C8C', fontSize: 12 }} />
          )}
          <Text strong style={{ minWidth: 120 }}>
            {node.name}
          </Text>
          <Text type="secondary" style={{ fontSize: 12 }}>
            {node.desc}
          </Text>
          <Text type="secondary" style={{ fontSize: 11 }}>
            {node.descCn}
          </Text>
        </div>
      ))}
    </div>
  )
}

/* ─── Component ─── */

export function ProjectStructurePage() {
  return (
    <div className="skill-ref-page">
      {/* Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Project Structure
          <Text
            type="secondary"
            style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}
          >
            项目结构
          </Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          Directory conventions, file naming rules, routing structure, and
          collaboration boundaries for the B-end workbench project.
        </Paragraph>
        <Paragraph
          type="secondary"
          style={{ marginBottom: 0, fontSize: 13 }}
        >
          B 端工作台项目的目录约定、文件命名规则、路由结构和协作边界。
        </Paragraph>
      </div>

      {/* Directory Tree */}
      <Card
        title={<Bi en="Directory Structure" cn="目录结构" />}
        style={{ borderRadius: 16 }}
      >
        <DirectoryTree nodes={DIR_TREE} />
      </Card>

      {/* Core Rules */}
      <Card
        title={<Bi en="Core Rules" cn="核心规则" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {CORE_RULES.map((rule) => (
            <div
              key={rule.num}
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                border: '1px solid rgba(0, 0, 0, 0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
                <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
                  {rule.num}
                </Tag>
                <div>
                  <Text strong>{rule.en}</Text>
                  <Text type="secondary" style={{ fontSize: 13, marginLeft: 6 }}>
                    {rule.cn}
                  </Text>
                </div>
              </div>
              <div style={{ paddingLeft: 34 }}>
                <Text type="secondary" style={{ fontSize: 13 }}>
                  {rule.detail}
                </Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {rule.detailCn}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* New Page Checklist & Naming */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="New Page Checklist" cn="新页面检查清单" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <Paragraph type="secondary" style={{ marginBottom: 12 }}>
              Required files when creating a new page:
              <br />
              <Text type="secondary" style={{ fontSize: 12 }}>
                创建新页面时的必需文件：
              </Text>
            </Paragraph>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CHECKLIST.map((item) => (
                <div
                  key={item.file}
                  style={{
                    display: 'flex',
                    gap: 10,
                    alignItems: 'flex-start',
                    padding: '8px 12px',
                    borderRadius: 8,
                    background: 'rgba(0, 0, 0, 0.02)',
                  }}
                >
                  <CheckCircleOutlined style={{ color: '#00B33C', marginTop: 3 }} />
                  <div style={{ flex: 1 }}>
                    <Text code style={{ fontSize: 12 }}>
                      {item.file}
                    </Text>
                    <div>
                      <Text type="secondary" style={{ fontSize: 12 }}>
                        {item.desc}
                      </Text>
                      <Text type="secondary" style={{ fontSize: 11, marginLeft: 6 }}>
                        {item.descCn}
                      </Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="File Naming Conventions" cn="文件命名约定" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <Table
              dataSource={NAMING_DATA}
              columns={NAMING_COLUMNS}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>

      {/* Product Line Routing */}
      <Card
        title={<Bi en="Product Line Routing" cn="产品线路由" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ROUTES.map((r) => (
            <div
              key={r.line}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '10px 16px',
                borderRadius: 10,
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Tag color="blue" style={{ margin: 0, minWidth: 90, textAlign: 'center' }}>
                {r.line}
              </Tag>
              <Text type="secondary" style={{ fontSize: 12, minWidth: 48 }}>
                {r.cn}
              </Text>
              <Text code style={{ fontSize: 13 }}>
                {r.path}
              </Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Multi-person Collaboration */}
      <Card
        title={<Bi en="Multi-person Collaboration Boundaries" cn="多人协作边界" />}
        style={{ borderRadius: 16 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(0, 179, 60, 0.2)',
                background: 'rgba(0, 179, 60, 0.04)',
              }}
            >
              <Text strong style={{ color: '#00B33C', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <CheckCircleOutlined />
                Allowed
                <Text type="secondary" style={{ fontSize: 12 }}>允许</Text>
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <BiBlock
                  en="Work freely within your own pages/ directory"
                  cn="在自己的 pages/ 目录内自由开发"
                />
                <BiBlock
                  en="Create page-private components and hooks"
                  cn="创建页面私有组件和 hooks"
                />
                <BiBlock
                  en="Import from shared components/"
                  cn="从共享 components/ 导入"
                />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(250, 140, 22, 0.3)',
                background: 'rgba(250, 140, 22, 0.04)',
              }}
            >
              <Text strong style={{ color: '#FA8C16', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <FolderOutlined />
                Requires PR
                <Text type="secondary" style={{ fontSize: 12 }}>需要 PR</Text>
              </Text>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <BiBlock
                  en="Adding or modifying shared components/"
                  cn="新增或修改共享 components/"
                />
                <BiBlock
                  en="Modifying shared hooks/ or services/"
                  cn="修改共享 hooks/ 或 services/"
                />
                <BiBlock
                  en="Changes to theme/ or store/ (global impact)"
                  cn="修改 theme/ 或 store/（全局影响）"
                />
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
