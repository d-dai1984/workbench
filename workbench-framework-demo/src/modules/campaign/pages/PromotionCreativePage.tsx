import '../styles/PromotionCreativePage.css'

export function PromotionCreativePage() {
  return (
    <div className="promo-layout">
      {/* ===== Sub_title: Breadcrumb + Page Header ===== */}
      <div className="promo-sub-title">
        <div className="promo-page-header">
          {/* Breadcrumb */}
          <div className="promo-breadcrumb">
            <span className="promo-breadcrumb-item">Home</span>
            <span className="promo-breadcrumb-sep">/</span>
            <span className="promo-breadcrumb-item">Promotion</span>
            <span className="promo-breadcrumb-sep">/</span>
            <span className="promo-breadcrumb-item promo-breadcrumb-item--active">Create Promotion</span>
          </div>
          {/* Title bar */}
          <div className="promo-title-bar">
            <h1 className="promo-title">Limited time promotion</h1>
            <div className="promo-meta">
              <span className="promo-meta-label">Status:</span>
              <span className="promo-tag">Draft</span>
            </div>
            <div className="promo-meta">
              <span className="promo-meta-label">Creator:</span>
              <span className="promo-meta-value">Kelsey.jiang@klook.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* ===== content_2_column ===== */}
      <div className="promo-content-2col">
        {/* ---- Left: Setting forms ---- */}
        <div className="promo-left-setting">
          {/* Section 1: Promo info */}
          <div className="promo-section-card">
            <div className="promo-section-header">
              <h2 className="promo-section-title">Promo info</h2>
              <p className="promo-section-desc">description</p>
            </div>

            {/* Promotion Name card */}
            <div className="promo-card">
              <div className="promo-card-title">Promotion name *</div>
              <div className="promo-card-hint">It is only for internal reference, cannot be seen by guests.</div>
              <div className="promo-placeholder promo-placeholder--input" data-label="Input: eg. example (xx/xx)" />
            </div>

            {/* Discount card */}
            <div className="promo-card">
              <div className="promo-card-title">Discount</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Dynamic Cost</span>
                <div className="promo-placeholder promo-placeholder--radio" data-label="Radio: No ● / Yes ○" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Discount type *</span>
                <div className="promo-card-selector-group">
                  <div className="promo-card-selector promo-card-selector--active">
                    <div className="promo-card-selector-title">Value off</div>
                    <div className="promo-card-selector-desc">example description</div>
                    <div className="promo-placeholder promo-placeholder--number" data-label="InputNumber: 0 HKD" />
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Percentage off</div>
                    <div className="promo-card-selector-desc">example description</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Deal card */}
            <div className="promo-card">
              <div className="promo-card-title">Campaign Deal</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Campaign name / id</span>
                <div className="promo-placeholder promo-placeholder--select" data-label="Select: Please enter" />
              </div>
            </div>

            {/* Finance Info card */}
            <div className="promo-card">
              <div className="promo-card-title">Source</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Source type</span>
                <div className="promo-placeholder promo-placeholder--radio" data-label="Radio: Lower cost ○ / Cash ● / Free ticket ○" />
              </div>
            </div>
            <div className="promo-card">
              <div className="promo-card-title">Extra info</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Receivable ID *</span>
                <div className="promo-placeholder promo-placeholder--select" data-label="Select receivable id" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Contract ID</span>
                <div className="promo-placeholder promo-placeholder--input" data-label="Input: example" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Contract/Email confirmation *</span>
                <div className="promo-placeholder promo-placeholder--upload" data-label="⬆ Upload Contract or other deal document" />
              </div>
            </div>
          </div>

          {/* Section 2: Promo conditions */}
          <div className="promo-section-card">
            <div className="promo-section-header">
              <h2 className="promo-section-title">Promo conditions</h2>
              <p className="promo-section-desc">description</p>
            </div>

            {/* Booking Period */}
            <div className="promo-card">
              <div className="promo-card-title">Booking Period</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Time Zone *</span>
                <div className="promo-placeholder promo-placeholder--dropdown" data-label="Dropdown: GMT+8(Beijing/SG)" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Time Period *</span>
                <div className="promo-placeholder promo-placeholder--timepicker" data-label="TimePicker: 01 Feb 2026, 00:00:00 ↔ End time" />
                <div className="promo-placeholder promo-placeholder--checkbox" data-label="☐ No ends" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Recurring or not</span>
                <div className="promo-placeholder promo-placeholder--radio" data-label="Radio: No ● / Yes ○" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Excluded date</span>
                <div className="promo-placeholder promo-placeholder--upload" data-label="➕ Add excluded date" />
              </div>
            </div>

            {/* Participate Period */}
            <div className="promo-card">
              <div className="promo-card-title">Participate Period</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Time Zone *</span>
                <div className="promo-placeholder promo-placeholder--dropdown" data-label="Dropdown: GMT+8(Beijing/SG)" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Time Period *</span>
                <div className="promo-placeholder promo-placeholder--timepicker" data-label="TimePicker: Start time ↔ End time" />
              </div>
              <div className="promo-form-row">
                <span className="promo-form-label">Excluded date</span>
                <div className="promo-placeholder promo-placeholder--upload" data-label="➕ Add excluded date" />
              </div>
            </div>

            {/* Sale Limit */}
            <div className="promo-card">
              <div className="promo-card-title">Sales limit</div>
              <div className="promo-card-hint">When the quantity/amount of products sold reaches this, the promotion will automatically stop.</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Type</span>
                <div className="promo-card-selector-group promo-card-selector-group--3col">
                  <div className="promo-card-selector promo-card-selector--active">
                    <div className="promo-card-selector-title">Unlimited</div>
                    <div className="promo-card-selector-desc">example description</div>
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Quantity limit</div>
                    <div className="promo-card-selector-desc">example description</div>
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Amount limit</div>
                    <div className="promo-card-selector-desc">example description</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform */}
            <div className="promo-card">
              <div className="promo-card-title">Platform limit</div>
              <div className="promo-form-row">
                <span className="promo-form-label">Platform</span>
                <div className="promo-placeholder promo-placeholder--checkbox-group" data-label="☐ App  ☐ Desktop  ☐ Mobile" />
              </div>
            </div>

            {/* Country */}
            <div className="promo-card">
              <div className="promo-card-title">Country limit</div>
              <div className="promo-form-row">
                <span className="promo-form-label">IP country</span>
                <div className="promo-card-selector-group promo-card-selector-group--3col">
                  <div className="promo-card-selector promo-card-selector--active">
                    <div className="promo-card-selector-title">Inbound only</div>
                    <div className="promo-card-selector-desc">The user's IP does not equal the destination</div>
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Domestic only</div>
                    <div className="promo-card-selector-desc">The user's IP does equal the destination</div>
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Domestic only</div>
                    <div className="promo-card-selector-desc">The user's IP does equal the destination</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Promotion Stacking */}
          <div className="promo-section-card">
            <div className="promo-section-header">
              <h2 className="promo-section-title">Promotion Stacking</h2>
              <p className="promo-section-desc">description</p>
            </div>
            <div className="promo-card">
              <div className="promo-form-row">
                <span className="promo-form-label">Stacking type</span>
                <div className="promo-card-selector-group">
                  <div className="promo-card-selector promo-card-selector--active">
                    <div className="promo-card-selector-title">Standalone</div>
                    <div className="promo-card-selector-desc">description</div>
                  </div>
                  <div className="promo-card-selector">
                    <div className="promo-card-selector-title">Stackable</div>
                    <div className="promo-card-selector-desc">description</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ---- Divider ---- */}
        <div className="promo-divider" />

        {/* ---- Right: Step nav ---- */}
        <div className="promo-right-step">
          <div className="promo-step-item promo-step-item--active">
            <div className="promo-step-dot promo-step-dot--active" />
            <span className="promo-step-label promo-step-label--active">Promotion settings</span>
          </div>
          <div className="promo-step-line" />
          <div className="promo-step-item">
            <div className="promo-step-dot" />
            <span className="promo-step-label">Select Products</span>
          </div>
        </div>
      </div>
    </div>
  )
}
