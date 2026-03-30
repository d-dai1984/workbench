import { Card, Typography, Row, Col, Table, Tag } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { PRINCIPLES, BUTTON_DATA } from '../data/contentGuidelines'

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

/* ─── Good / Bad example pair ─── */
function GoodBad({
  good,
  bad,
  goodCn,
  badCn,
}: {
  good: string
  bad: string
  goodCn?: string
  badCn?: string
}) {
  return (
    <Row gutter={16} style={{ marginTop: 8 }}>
      <Col xs={24} lg={12}>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(0, 179, 60, 0.06)',
            border: '1px solid rgba(0, 179, 60, 0.2)',
          }}
        >
          <CheckCircleOutlined style={{ color: '#00B33C', marginRight: 6 }} />
          <Text style={{ color: '#00B33C' }}>{good}</Text>
          {goodCn && (
            <div>
              <Text type="secondary" style={{ fontSize: 12, marginLeft: 20 }}>
                {goodCn}
              </Text>
            </div>
          )}
        </div>
      </Col>
      <Col xs={24} lg={12}>
        <div
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(255, 77, 79, 0.06)',
            border: '1px solid rgba(255, 77, 79, 0.2)',
          }}
        >
          <CloseCircleOutlined style={{ color: '#FF4D4F', marginRight: 6 }} />
          <Text style={{ color: '#FF4D4F' }}>{bad}</Text>
          {badCn && (
            <div>
              <Text type="secondary" style={{ fontSize: 12, marginLeft: 20 }}>
                {badCn}
              </Text>
            </div>
          )}
        </div>
      </Col>
    </Row>
  )
}

const BUTTON_COLUMNS = [
  { title: 'Action', dataIndex: 'action', key: 'action' },
  {
    title: (
      <>
        <CheckCircleOutlined style={{ color: '#00B33C', marginRight: 4 }} />
        Recommended
      </>
    ),
    dataIndex: 'good',
    key: 'good',
    render: (text: string) => <Tag color="success">{text}</Tag>,
  },
  {
    title: (
      <>
        <CloseCircleOutlined style={{ color: '#FF4D4F', marginRight: 4 }} />
        Avoid
      </>
    ),
    dataIndex: 'bad',
    key: 'bad',
    render: (text: string) => <Tag color="error">{text}</Tag>,
  },
  {
    title: 'CN',
    dataIndex: 'cn',
    key: 'cn',
    render: (text: string) => (
      <Text type="secondary" style={{ fontSize: 12 }}>
        {text}
      </Text>
    ),
  },
]

/* ─── Component ─── */

export function ContentGuidelinesPage() {
  return (
    <div className="skill-ref-page">
      {/* Header */}
      <div>
        <Title level={3} style={{ margin: 0 }}>
          Content Guidelines
          <Text
            type="secondary"
            style={{ fontSize: 16, fontWeight: 400, marginLeft: 8 }}
          >
            文案规范
          </Text>
        </Title>
        <Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
          Standardized copy rules for buttons, labels, placeholders, empty
          states, confirmation dialogs, and error messages across all B-end
          products.
        </Paragraph>
        <Paragraph
          type="secondary"
          style={{ marginBottom: 0, fontSize: 13 }}
        >
          涵盖按钮命名、字段标签、占位符、空状态、确认弹窗和错误提示的标准化文案规范。
        </Paragraph>
      </div>

      {/* General Principles */}
      <Card
        title={<Bi en="General Principles" cn="通用原则" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PRINCIPLES.map((p, i) => (
            <div
              key={i}
              style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}
            >
              <Tag color="blue" style={{ flexShrink: 0, margin: 0 }}>
                {i + 1}
              </Tag>
              <BiBlock en={p.en} cn={p.cn} />
            </div>
          ))}
        </div>
      </Card>

      {/* Button Naming */}
      <Card
        title={<Bi en="Button Naming" cn="按钮命名" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 12 }}>
          Buttons use action verbs. Danger actions must use verb + noun format
          to prevent ambiguity.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            按钮使用动作动词。危险操作必须使用「动词+名词」格式，防止歧义。
          </Text>
        </Paragraph>
        <Table
          dataSource={BUTTON_DATA}
          columns={BUTTON_COLUMNS}
          pagination={false}
          size="small"
        />
      </Card>

      {/* Field Labels */}
      <Card
        title={<Bi en="Field Labels" cn="字段标签" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              1
            </Tag>
            <BiBlock
              en='Use nouns only — no verbs like "Please enter"'
              cn="仅使用名词 — 不使用「请输入」等动词"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              2
            </Tag>
            <BiBlock
              en="Required mark (*) placed after the label text"
              cn="必填标记 (*) 放在标签文字之后"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              3
            </Tag>
            <BiBlock
              en="Keep label text concise: maximum 3 words"
              cn="标签文字简洁：最多 3 个词"
            />
          </div>
        </div>
        <GoodBad
          good="Campaign Name *"
          bad="Please enter campaign name"
          goodCn="活动名称 *"
          badCn="请输入活动名称"
        />
      </Card>

      {/* Placeholder Rules */}
      <Card
        title={<Bi en="Placeholder Rules" cn="占位符规则" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              1
            </Tag>
            <BiBlock
              en="Show example values, not a repeat of the label"
              cn="显示示例值，而非重复标签文字"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              2
            </Tag>
            <BiBlock
              en="Include format hints when applicable"
              cn="适用时包含格式提示"
            />
          </div>
          <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
            <Tag color="blue" style={{ margin: 0, flexShrink: 0 }}>
              3
            </Tag>
            <BiBlock
              en="Maximum 40 characters"
              cn="最多 40 个字符"
            />
          </div>
        </div>
        <GoodBad
          good='e.g. "Summer Sale 2025"'
          bad="Please enter campaign name"
          goodCn='例如 "夏季促销 2025"'
          badCn="请输入活动名称"
        />
        <GoodBad
          good="YYYY-MM-DD"
          bad="Enter date"
          goodCn="日期格式提示"
          badCn="重复标签"
        />
      </Card>

      {/* Help Text & Empty State */}
      <Row gutter={16}>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Help Text" cn="帮助文字" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <BiBlock
                en="Font size: 12px, color: colorTextTertiary"
                cn="字号 12px，颜色 colorTextTertiary"
              />
              <BiBlock
                en="One sentence only — no paragraphs"
                cn="仅一句话 — 不写段落"
              />
              <BiBlock
                en="Place close to the related field"
                cn="紧贴关联字段放置"
              />
            </div>
            <div
              style={{
                marginTop: 16,
                padding: '12px 16px',
                borderRadius: 8,
                background: 'rgba(0, 0, 0, 0.02)',
              }}
            >
              <Text strong style={{ fontSize: 13 }}>
                Campaign Name *
              </Text>
              <div
                style={{
                  marginTop: 4,
                  padding: '6px 12px',
                  border: '1px solid #d9d9d9',
                  borderRadius: 6,
                  color: 'rgba(0,0,0,0.25)',
                  fontSize: 13,
                }}
              >
                e.g. "Summer Sale 2025"
              </div>
              <div style={{ marginTop: 4, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                Used as display name in campaign list. Max 60 characters.
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title={<Bi en="Empty State Copy" cn="空状态文案" />}
            style={{ borderRadius: 16, height: '100%' }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              <BiBlock
                en="Main text: max 5 words, describe the state"
                cn="主文案：最多 5 个词，描述状态"
              />
              <BiBlock
                en="Sub text: include the next action"
                cn="副文案：包含下一步操作"
              />
              <BiBlock
                en="Cover all scenarios: no data, no result, no permission"
                cn="覆盖所有场景：无数据、无结果、无权限"
              />
            </div>
            <div
              style={{
                marginTop: 16,
                padding: 24,
                borderRadius: 8,
                background: 'rgba(0, 0, 0, 0.02)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 32, color: 'rgba(0,0,0,0.15)', marginBottom: 8 }}>
                :)
              </div>
              <GoodBad
                good="No campaigns yet"
                bad="No data"
                goodCn="暂无活动"
                badCn="暂无数据"
              />
              <div style={{ marginTop: 8 }}>
                <GoodBad
                  good='Sub: "Create your first campaign to get started"'
                  bad='Sub: "Please check back later"'
                  goodCn="副文案有引导"
                  badCn="副文案无意义"
                />
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Confirm Dialog */}
      <Card
        title={<Bi en="Confirm Dialog Copy" cn="确认弹窗文案" />}
        style={{ borderRadius: 16 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
          <BiBlock
            en="Title: use verb + object format (e.g. Delete Campaign)"
            cn="标题：使用动词+名词格式（如 删除活动）"
          />
          <BiBlock
            en="Body: describe the impact clearly"
            cn="正文：清楚描述影响"
          />
          <BiBlock
            en="Buttons: use action verbs, not OK/Cancel"
            cn="按钮：使用动作动词，而非确定/取消"
          />
        </div>
        <Row gutter={16}>
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(0, 179, 60, 0.3)',
                background: 'rgba(0, 179, 60, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <CheckCircleOutlined style={{ color: '#00B33C' }} />
                <Text strong style={{ color: '#00B33C' }}>Good Example</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>好的示例</Text>
              </div>
              <div
                style={{
                  padding: 16,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #f0f0f0',
                }}
              >
                <Text strong>Delete Campaign</Text>
                <Text type="secondary" style={{ fontSize: 12, marginLeft: 4 }}>
                  删除活动
                </Text>
                <div style={{ margin: '8px 0', fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
                  This campaign and all associated creatives will be permanently
                  removed. This action cannot be undone.
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Tag>Cancel</Tag>
                  <Tag color="error">Delete Campaign</Tag>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: '1px solid rgba(255, 77, 79, 0.3)',
                background: 'rgba(255, 77, 79, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <CloseCircleOutlined style={{ color: '#FF4D4F' }} />
                <Text strong style={{ color: '#FF4D4F' }}>Bad Example</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>差的示例</Text>
              </div>
              <div
                style={{
                  padding: 16,
                  background: '#fff',
                  borderRadius: 8,
                  border: '1px solid #f0f0f0',
                }}
              >
                <Text strong>Confirm</Text>
                <div style={{ margin: '8px 0', fontSize: 13, color: 'rgba(0,0,0,0.65)' }}>
                  Are you sure?
                </div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                  <Tag>No</Tag>
                  <Tag color="error">Yes</Tag>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Error Messages */}
      <Card
        title={<Bi en="Error Messages" cn="错误提示" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Every error message must explain the cause and provide a solution path.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            每条错误提示必须解释原因并提供解决路径。
          </Text>
        </Paragraph>
        <GoodBad
          good='Upload failed: file exceeds 5MB limit. Compress and retry.'
          bad="Upload failed"
          goodCn="上传失败：文件超过 5MB 限制。请压缩后重试。"
          badCn="上传失败"
        />
        <div style={{ marginTop: 8 }}>
          <GoodBad
            good="Campaign name already exists. Try a different name."
            bad="Duplicate entry"
            goodCn="活动名称已存在，请尝试其他名称。"
            badCn="重复条目"
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <GoodBad
            good="Session expired. Please log in again to continue."
            bad="Error 401"
            goodCn="会话过期，请重新登录以继续。"
            badCn="错误 401"
          />
        </div>
      </Card>

      {/* Status Copy */}
      <Card
        title={<Bi en="Status Copy" cn="状态文案" />}
        style={{ borderRadius: 16 }}
      >
        <Paragraph type="secondary" style={{ marginBottom: 16 }}>
          Use business language, max 3 words. Always pair color with text for
          dual encoding.
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            使用业务语言，最多 3 个词。始终使用颜色+文字双重编码。
          </Text>
        </Paragraph>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          <Tag color="success">Active</Tag>
          <Tag color="processing">In Review</Tag>
          <Tag color="warning">Pending</Tag>
          <Tag color="error">Rejected</Tag>
          <Tag color="default">Draft</Tag>
          <Tag color="default">Archived</Tag>
        </div>
        <div style={{ marginTop: 12 }}>
          <GoodBad
            good="Active / In Review / Pending"
            bad="Status 1 / Status 2 / Status 3"
            goodCn="有业务含义的状态名"
            badCn="无意义的编号"
          />
        </div>
      </Card>
    </div>
  )
}
