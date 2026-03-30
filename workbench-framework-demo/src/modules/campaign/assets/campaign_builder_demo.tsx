import { useState } from "react";

const TERMINAL_OPTIONS = [
  { value: "mobile_app", label: "Mobile App (iOS/Android)" },
  { value: "desktop_web", label: "Desktop Web" },
  { value: "mobile_web", label: "Mobile Web" },
  { value: "external", label: "External Partners" },
];
const CURRENCY_OPTIONS = ["USD","SGD","HKD","TWD","MYR","JPY","KRW"];
const POC_OPTIONS = [
  { value: "jasmine.xie", label: "Jasmine Xie", email: "jasmine.xie@klook.com" },
  { value: "kevin.tan", label: "Kevin Tan", email: "kevin.tan@klook.com" },
  { value: "sarah.lim", label: "Sarah Lim", email: "sarah.lim@klook.com" },
  { value: "michael.chen", label: "Michael Chen", email: "michael.chen@klook.com" },
];
const CAMPAIGN_OPTIONS = [
  { value: "CMP-2025-001", label: "CMP-2025-001 · 双十一全球大促" },
  { value: "CMP-2025-002", label: "CMP-2025-002 · 东南亚夏日季" },
  { value: "CMP-2025-003", label: "CMP-2025-003 · 新加坡国庆专场" },
];

const tk = {
  border:"#e0dfd8", bg:"#f7f6f2", card:"#fff",
  text:"#2c2c2a", muted:"#5f5e5a", hint:"#888780",
  blue:"#185FA5", blueBg:"#E6F1FB", blueActive:"#378ADD",
  s50:"#FAECE7", s400:"#D85A30", s600:"#993C1D",
  err:"#E24B4A", errBg:"#FCEBEB", errBd:"#F7C1C1",
  warnBg:"#FAEEDA", warn:"#854F0B", warnBd:"#FAC775",
  green:"#3B6D11", greenBg:"#EAF3DE", greenBd:"#C0DD97",
};

const base = {
  width:"100%", padding:"7px 10px", borderRadius:6, fontSize:12,
  border:`1px solid ${tk.border}`, background:tk.card, color:tk.text,
  outline:"none", boxSizing:"border-box", fontFamily:"inherit",
};

function Label({ text, required }) {
  return (
    <div style={{ fontSize:11, fontWeight:500, color:tk.hint, letterSpacing:"0.04em", textTransform:"uppercase", marginBottom:5, display:"flex", gap:3 }}>
      {required && <span style={{ color:tk.err }}>*</span>}{text}
    </div>
  );
}

function ErrMsg({ msg }) {
  return msg ? <div style={{ fontSize:11, color:tk.err, marginTop:3 }}>{msg}</div> : null;
}

function SectionHead({ children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14, paddingBottom:10, borderBottom:`1px solid ${tk.border}` }}>
      <span style={{ fontSize:13, fontWeight:500, color:tk.text }}>{children}</span>
    </div>
  );
}

function Inp({ value, onChange, placeholder, error, mono }) {
  return <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
    style={{ ...base, borderColor:error?tk.err:tk.border, fontFamily: mono?"monospace":"inherit" }} />;
}

function Sel({ value, onChange, options, placeholder, error }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{ ...base, borderColor:error?tk.err:tk.border, color:value?tk.text:tk.hint }}>
      <option value="">{placeholder||"Select..."}</option>
      {options.map(o=><option key={o.value||o} value={o.value||o}>{o.label||o}</option>)}
    </select>
  );
}

function LevelTabs({ value, onChange, error }) {
  return (
    <div>
      <div style={{ display:"flex", gap:0, borderRadius:6, overflow:"hidden", border:`1px solid ${value?tk.blueActive:tk.border}`, width:"fit-content" }}>
        {["S","A","B"].map((v,i)=>{
          const on = value===v;
          return (
            <div key={v} onClick={()=>onChange(v)} style={{
              width:52, height:32, display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:13, fontWeight:500, cursor:"pointer",
              background: on?tk.blueActive:tk.card,
              color: on?"#fff":tk.muted,
              borderRight: i<2?`1px solid ${tk.border}`:"none",
              transition:"all .12s",
            }}>{v}</div>
          );
        })}
      </div>
      <ErrMsg msg={error}/>
    </div>
  );
}

function CheckboxGroup({ options, value, onChange, error }) {
  const toggle = v => onChange(value.includes(v)?value.filter(x=>x!==v):[...value,v]);
  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {options.map(o=>{
          const on = value.includes(o.value);
          return (
            <label key={o.value} onClick={()=>toggle(o.value)} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer", userSelect:"none" }}>
              <div style={{
                width:14, height:14, borderRadius:3, border:`1.5px solid ${on?tk.blueActive:tk.border}`,
                background:on?tk.blueActive:tk.card, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {on && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              <span style={{ fontSize:12, color:on?tk.text:tk.muted }}>{o.label}</span>
            </label>
          );
        })}
      </div>
      <ErrMsg msg={error}/>
    </div>
  );
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div style={{ display:"flex", gap:16 }}>
      {options.map(o=>{
        const on = value===o.value;
        return (
          <label key={o.value} onClick={()=>onChange(o.value)} style={{ display:"flex", alignItems:"center", gap:5, cursor:"pointer", userSelect:"none" }}>
            <div style={{ width:14, height:14, borderRadius:"50%", border:`1.5px solid ${on?tk.blueActive:tk.border}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {on && <div style={{ width:7, height:7, borderRadius:"50%", background:tk.blueActive }}/>}
            </div>
            <span style={{ fontSize:12, fontWeight:on?500:400, color:on?tk.text:tk.muted }}>{o.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function PocPicker({ value, onChange, error }) {
  const [q,setQ] = useState(""); const [open,setOpen] = useState(false);
  const filtered = POC_OPTIONS.filter(p=>p.label.toLowerCase().includes(q.toLowerCase())||p.email.toLowerCase().includes(q.toLowerCase()));
  const selected = POC_OPTIONS.filter(p=>value.includes(p.value));
  return (
    <div style={{ position:"relative" }}>
      <div onClick={()=>setOpen(true)} style={{ ...base, minHeight:32, display:"flex", flexWrap:"wrap", gap:4, alignItems:"center", padding:"4px 8px", cursor:"text", borderColor:error?tk.err:tk.border }}>
        {selected.map(p=>(
          <span key={p.value} style={{ background:tk.blueBg, color:tk.blue, borderRadius:4, padding:"1px 6px", fontSize:11, fontWeight:500, display:"flex", alignItems:"center", gap:3 }}>
            {p.label}
            <span onClick={e=>{e.stopPropagation();onChange(value.filter(x=>x!==p.value));}} style={{ cursor:"pointer", opacity:.6 }}>×</span>
          </span>
        ))}
        <input value={q} onChange={e=>{setQ(e.target.value);setOpen(true);}} onFocus={()=>setOpen(true)}
          placeholder={selected.length?"":"Owner email or name"}
          style={{ border:"none", outline:"none", background:"transparent", fontSize:12, color:tk.text, flex:1, minWidth:80 }}/>
      </div>
      {open && filtered.length>0 && (
        <div style={{ position:"absolute", top:"100%", left:0, right:0, zIndex:30, background:tk.card, border:`1px solid ${tk.border}`, borderRadius:6, boxShadow:"0 4px 12px rgba(0,0,0,0.08)", marginTop:3 }}>
          {filtered.map(p=>(
            <div key={p.value} onClick={()=>{if(!value.includes(p.value))onChange([...value,p.value]);setQ("");setOpen(false);}}
              style={{ padding:"7px 10px", cursor:"pointer", fontSize:12, borderBottom:`1px solid ${tk.border}` }}
              onMouseEnter={e=>e.currentTarget.style.background=tk.bg}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ fontWeight:500, color:tk.text }}>{p.label}</div>
              <div style={{ fontSize:10, color:tk.hint }}>{p.email}</div>
            </div>
          ))}
        </div>
      )}
      <ErrMsg msg={error}/>
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <div onClick={()=>onChange(!value)} style={{ width:36, height:20, borderRadius:10, background:value?tk.blueActive:tk.border, cursor:"pointer", position:"relative", transition:"background .2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:2, left:value?18:2, width:16, height:16, borderRadius:"50%", background:"#fff", transition:"left .2s", boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }}/>
    </div>
  );
}

function GoalMetric({ label, value, onChange, currency, error }) {
  const display = value ? Number(value).toLocaleString() : null;
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"8px 0", borderBottom:`1px solid ${tk.border}` }}>
      <span style={{ fontSize:12, color:tk.muted }}>{label}</span>
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {error && <span style={{ fontSize:10, color:tk.err }}>{error}</span>}
        <input type="number" value={value} onChange={e=>onChange(e.target.value)}
          placeholder="0"
          style={{ width:90, padding:"3px 6px", border:`1px solid ${error?tk.err:tk.border}`, borderRadius:4, fontSize:12, fontWeight:500, color:display?tk.blue:tk.hint, textAlign:"right", outline:"none", background:"transparent" }}/>
      </div>
    </div>
  );
}

const empty = { name:"",region:"",terminals:[],category:"",poc:[],parentId:"",level:"",startDate:"",endDate:"", currency:"USD", klookPct:"",partnerPct:"",revenue:"",booking:"",sessions:"",newUsers:"",brandNotes:"", featureCard:true, pageId:"", pageIdStatus:null };

export default function App() {
  const [view,setView] = useState("form");
  const [errors,setErrors] = useState({});
  const [form,setForm] = useState(empty);

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); if(errors[k]) setErrors(e=>({...e,[k]:null})); };
  const pctSum = () => (parseFloat(form.klookPct)||0)+(parseFloat(form.partnerPct)||0);

  const verifyPageId = () => {
    if(!form.pageId){ set("pageIdStatus","error"); return; }
    const valid = /^PID_[A-Z0-9_]+$/.test(form.pageId);
    set("pageIdStatus", valid?"success":"error");
  };

  const validate = (draft) => {
    const e = {};
    if(!form.name) e.name="Required";
    if(!form.region) e.region="Required";
    if(!form.terminals.length) e.terminals="Select at least one";
    if(!form.category) e.category="Required";
    if(!form.poc.length) e.poc="Required";
    if(!form.level) e.level="Required";
    if(!form.startDate) e.startDate="Required";
    if(!form.endDate) e.endDate="Required";
    if(!draft){
      if(!form.currency) e.currency="Required";
      if(!form.klookPct) e.klookPct="Required";
      if(!form.partnerPct) e.partnerPct="Required";
      if(form.klookPct&&form.partnerPct&&pctSum()!==100) e.klookPct=`Sum is ${pctSum()}%, must equal 100%`;
      if(!form.revenue) e.revenue="Required";
      if(!form.booking) e.booking="Required";
      if(!form.sessions) e.sessions="Required";
      if(!form.newUsers) e.newUsers="Required";
      if(form.featureCard && !form.pageId) e.pageId="Required when Feature Card is on";
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate(false);
    if(Object.keys(e).length){ setErrors(e); return; }
    if(form.level==="S"){ setView("conflict"); return; }
    setView("success");
  };

  if(view==="conflict") return (
    <div style={{ padding:20, fontFamily:"var(--font-sans,sans-serif)" }}>
      <div style={{ minHeight:260, background:"rgba(0,0,0,0.4)", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:10, padding:20 }}>
        <div style={{ background:tk.card, borderRadius:10, padding:24, width:400 }}>
          <div style={{ display:"flex", gap:10, marginBottom:14 }}>
            <div style={{ width:32, height:32, borderRadius:"50%", background:tk.s50, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="16" height="16" viewBox="0 0 18 18" fill="none"><path d="M9 2L16.5 15H1.5L9 2Z" stroke="#D85A30" strokeWidth="1.5" fill="none" strokeLinejoin="round"/><line x1="9" y1="7" x2="9" y2="10.5" stroke="#D85A30" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="12.5" r=".8" fill="#D85A30"/></svg>
            </div>
            <div>
              <div style={{ fontWeight:500, fontSize:14, color:tk.text, marginBottom:4 }}>S-Level Campaign Conflict</div>
              <div style={{ fontSize:12, color:tk.muted, lineHeight:1.6 }}>This campaign overlaps with an existing S-level campaign:</div>
            </div>
          </div>
          <div style={{ background:tk.s50, borderRadius:6, padding:"8px 12px", marginBottom:16, border:`1px solid #F5C4B3` }}>
            <div style={{ fontSize:11, color:tk.s600, fontWeight:500, marginBottom:3 }}>Conflicting Campaign</div>
            <div style={{ fontSize:12, color:"#712B13" }}>CMP-2025-001 · 双十一全球大促</div>
            <div style={{ fontSize:11, color:tk.s600, marginTop:2 }}>2025/11/01 – 2025/11/15</div>
          </div>
          <div style={{ fontSize:12, color:tk.hint, marginBottom:16, lineHeight:1.6 }}>Concurrent S-level campaigns may cause traffic dilution. You can ignore and continue, or go back to adjust.</div>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>setView("form")} style={{ flex:1, padding:"8px 0", borderRadius:6, fontSize:12, fontWeight:500, border:`1px solid ${tk.border}`, background:tk.card, color:tk.text, cursor:"pointer" }}>Go Back</button>
            <button onClick={()=>setView("success")} style={{ flex:1, padding:"8px 0", borderRadius:6, fontSize:12, fontWeight:500, border:"none", background:tk.s400, color:"#fff", cursor:"pointer" }}>Ignore & Save</button>
          </div>
        </div>
      </div>
    </div>
  );

  if(view==="success") return (
    <div style={{ padding:20, fontFamily:"var(--font-sans,sans-serif)" }}>
      <div style={{ background:tk.greenBg, border:`1px solid ${tk.greenBd}`, borderRadius:10, padding:28, textAlign:"center" }}>
        <svg width="36" height="36" viewBox="0 0 40 40" style={{ display:"block", margin:"0 auto 10px" }}>
          <circle cx="20" cy="20" r="18" fill="#EAF3DE" stroke="#639922" strokeWidth="1.5"/>
          <path d="M12 20l6 6 10-12" stroke="#3B6D11" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <div style={{ fontWeight:500, fontSize:15, color:"#27500A", marginBottom:6 }}>Campaign submitted for approval</div>
        <div style={{ fontSize:12, color:tk.green, marginBottom:16 }}>Campaign ID: CMP-2025-{String(Math.floor(Math.random()*900)+100)}</div>
        <button onClick={()=>{ setView("form"); setForm(empty); setErrors({}); }}
          style={{ padding:"7px 20px", borderRadius:6, border:`1px solid ${tk.greenBd}`, background:tk.card, color:tk.green, fontSize:12, cursor:"pointer", fontWeight:500 }}>
          Create Another
        </button>
      </div>
    </div>
  );

  const hasErr = Object.values(errors).some(Boolean);

  return (
    <div style={{ fontFamily:"var(--font-sans,sans-serif)", background:tk.bg, minHeight:"100vh" }}>
      {/* Breadcrumb */}
      <div style={{ padding:"10px 24px", fontSize:11, color:tk.hint, borderBottom:`1px solid ${tk.border}`, background:tk.card }}>
        Promo System &nbsp;›&nbsp; Campaign Management &nbsp;›&nbsp; <span style={{ color:tk.text }}>Create Campaign</span>
      </div>

      <div style={{ padding:"20px 24px" }}>
        {/* Page title */}
        <div style={{ marginBottom:16 }}>
          <div style={{ fontSize:20, fontWeight:500, color:tk.text, marginBottom:3 }}>Create New Campaign</div>
          <div style={{ fontSize:12, color:tk.hint }}>Configure your marketing initiative parameters and performance targets.</div>
        </div>

        {/* Two-column layout */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:14, alignItems:"start" }}>

          {/* LEFT COLUMN */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

            {/* Campaign Overview */}
            <div style={{ background:tk.card, border:`1px solid ${tk.border}`, borderRadius:10, padding:"16px 20px" }}>
              <SectionHead>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight:6, verticalAlign:"middle" }}><rect x="1" y="1" width="12" height="12" rx="2" stroke={tk.blue} strokeWidth="1.2"/><line x1="4" y1="5" x2="10" y2="5" stroke={tk.blue} strokeWidth="1.2" strokeLinecap="round"/><line x1="4" y1="8" x2="8" y2="8" stroke={tk.blue} strokeWidth="1.2" strokeLinecap="round"/></svg>
                Campaign Overview
              </SectionHead>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 14px" }}>

                <div style={{ gridColumn:"span 2" }}>
                  <Label text="Campaign Name" required/>
                  <Inp value={form.name} onChange={v=>set("name",v)} placeholder="e.g., Q4 Global Summer Extravaganza" error={errors.name}/>
                  <ErrMsg msg={errors.name}/>
                </div>

                <div>
                  <Label text="Campaign Level" required/>
                  <LevelTabs value={form.level} onChange={v=>set("level",v)} error={errors.level}/>
                </div>

                <div>
                  <Label text="Parent Campaign ID"/>
                  <Sel value={form.parentId} onChange={v=>set("parentId",v)} options={CAMPAIGN_OPTIONS} placeholder="Select Parent Campaign..."/>
                </div>

                <div>
                  <Label text="Campaign POC" required/>
                  <PocPicker value={form.poc} onChange={v=>set("poc",v)} error={errors.poc}/>
                </div>

                <div>
                  <Label text="Category" required/>
                  <div style={{ paddingTop:4 }}>
                    <RadioGroup options={[{value:"mega",label:"Mega"},{value:"local",label:"Local"}]} value={form.category} onChange={v=>set("category",v)}/>
                    <ErrMsg msg={errors.category}/>
                  </div>
                </div>

                <div style={{ gridColumn:"span 2" }}>
                  <Label text="Target Channels & Destinations" required/>
                  <CheckboxGroup options={TERMINAL_OPTIONS} value={form.terminals} onChange={v=>set("terminals",v)} error={errors.terminals}/>
                </div>

                <div style={{ gridColumn:"span 2" }}>
                  <Label text="Campaign Duration" required/>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <input value={form.startDate} onChange={e=>set("startDate",e.target.value)} placeholder="mm/dd/yyyy"
                      style={{ ...base, width:"auto", flex:1, borderColor:errors.startDate?tk.err:tk.border }}/>
                    <span style={{ fontSize:12, color:tk.hint }}>to</span>
                    <input value={form.endDate} onChange={e=>set("endDate",e.target.value)} placeholder="mm/dd/yyyy"
                      style={{ ...base, width:"auto", flex:1, borderColor:errors.endDate?tk.err:tk.border }}/>
                  </div>
                  {(errors.startDate||errors.endDate) && <div style={{ fontSize:11, color:tk.err, marginTop:3 }}>Please fill in campaign duration</div>}
                </div>

              </div>
            </div>

            {/* Display Configuration */}
            <div style={{ background:tk.card, border:`1px solid ${(errors.pageId)?tk.err:tk.border}`, borderRadius:10, padding:"16px 20px" }}>
              <SectionHead>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight:6, verticalAlign:"middle" }}><rect x="1" y="2" width="12" height="9" rx="1.5" stroke={tk.blue} strokeWidth="1.2"/><line x1="5" y1="12" x2="9" y2="12" stroke={tk.blue} strokeWidth="1.2" strokeLinecap="round"/></svg>
                Display Configuration
              </SectionHead>

              {/* Feature Card toggle */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom: form.featureCard?14:0 }}>
                <div>
                  <div style={{ fontSize:12, fontWeight:500, color:tk.text }}>Campaign Feature Card</div>
                  <div style={{ fontSize:11, color:tk.hint, marginTop:2 }}>Enable prominent placement in app discovery feed</div>
                </div>
                <Toggle value={form.featureCard} onChange={v=>{ set("featureCard",v); if(!v){ set("pageId",""); set("pageIdStatus",null); }}}/>
              </div>

              {form.featureCard && (
                <>
                  <div style={{ marginBottom:10 }}>
                    <Label text="Campaign Page ID Mapping" required/>
                    <div style={{ display:"flex", gap:6 }}>
                      <input value={form.pageId} onChange={e=>{ set("pageId",e.target.value); set("pageIdStatus",null); }}
                        placeholder="PID_XXXXX_2B24"
                        style={{ ...base, flex:1, fontFamily:"monospace", fontSize:12, borderColor: form.pageIdStatus==="error"?tk.err: form.pageIdStatus==="success"?"#639922":errors.pageId?tk.err:tk.border }}/>
                      <button onClick={verifyPageId} style={{ padding:"7px 12px", borderRadius:6, fontSize:12, fontWeight:500, border:`1px solid ${tk.border}`, background:tk.bg, color:tk.text, cursor:"pointer", whiteSpace:"nowrap" }}>
                        Verify ID
                      </button>
                    </div>
                    {form.pageIdStatus==="success" && <div style={{ fontSize:11, color:"#3B6D11", marginTop:3 }}>ID format is valid</div>}
                    {form.pageIdStatus==="error" && <div style={{ fontSize:11, color:tk.err, marginTop:3 }}>Invalid format. Expected: PID_XXXXX_XXXX</div>}
                    {!form.pageIdStatus && <ErrMsg msg={errors.pageId}/>}
                  </div>
                  <a href="#" onClick={e=>e.preventDefault()} style={{ fontSize:12, color:tk.blue, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M1 10L10 1M10 1H4M10 1v6" stroke={tk.blue} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Preview Landing Page Layout
                  </a>
                </>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN — Campaign Goals */}
          <div style={{ background:tk.card, border:`1px solid ${tk.border}`, borderRadius:10, padding:"16px 18px", position:"sticky", top:20 }}>
            <SectionHead>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ marginRight:6, verticalAlign:"middle" }}><circle cx="7" cy="7" r="5.5" stroke={tk.blue} strokeWidth="1.2"/><path d="M7 4v3l2 1.5" stroke={tk.blue} strokeWidth="1.2" strokeLinecap="round"/></svg>
              Campaign Goals
            </SectionHead>

            <div style={{ marginBottom:12 }}>
              <Label text="Currency"/>
              <Sel value={form.currency} onChange={v=>set("currency",v)} options={CURRENCY_OPTIONS.map(c=>({value:c,label:`${c} - ${({USD:"United States Dollar",SGD:"Singapore Dollar",HKD:"Hong Kong Dollar",TWD:"Taiwan Dollar",MYR:"Malaysian Ringgit",JPY:"Japanese Yen",KRW:"Korean Won"}[c])||c}`}))} error={errors.currency}/>
            </div>

            <div style={{ marginBottom:12 }}>
              <Label text="Revenue Share"/>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                <div>
                  <div style={{ fontSize:10, color:tk.hint, marginBottom:3 }}>KLOOK AMOUNT</div>
                  <input type="number" value={form.klookPct} onChange={e=>set("klookPct",e.target.value)}
                    onBlur={()=>{ if(form.klookPct&&!form.partnerPct) set("partnerPct",String(100-parseFloat(form.klookPct))); }}
                    placeholder="0.00"
                    style={{ ...base, borderColor:errors.klookPct?tk.err:tk.border }}/>
                </div>
                <div>
                  <div style={{ fontSize:10, color:tk.hint, marginBottom:3 }}>PARTNER AMOUNT</div>
                  <input type="number" value={form.partnerPct} onChange={e=>set("partnerPct",e.target.value)} placeholder="0.00"
                    style={{ ...base, borderColor:errors.partnerPct?tk.err:tk.border }}/>
                </div>
              </div>
              {errors.klookPct && <div style={{ fontSize:11, color:tk.err, marginTop:3 }}>{errors.klookPct}</div>}
              {form.klookPct && form.partnerPct && !errors.klookPct && (
                <div style={{ fontSize:10, color: pctSum()===100?tk.green:tk.warn, marginTop:3 }}>
                  {pctSum()===100 ? "Sum: 100% ✓" : `Sum: ${pctSum()}% — must equal 100%`}
                </div>
              )}
            </div>

            <div style={{ borderTop:`1px solid ${tk.border}`, paddingTop:10 }}>
              <GoalMetric label="Target Revenue" value={form.revenue} onChange={v=>set("revenue",v)} currency={form.currency} error={errors.revenue}/>
              <GoalMetric label="Target Bookings" value={form.booking} onChange={v=>set("booking",v)} error={errors.booking}/>
              <GoalMetric label="Target Sessions" value={form.sessions} onChange={v=>set("sessions",v)} error={errors.sessions}/>
              <GoalMetric label="New Users Target" value={form.newUsers} onChange={v=>set("newUsers",v)} error={errors.newUsers}/>
            </div>

            <div style={{ marginTop:12 }}>
              <Label text="Brand Awareness Notes"/>
              <textarea value={form.brandNotes} onChange={e=>set("brandNotes",e.target.value)}
                placeholder="Describe the qualitative brand impact goals..." rows={3}
                style={{ ...base, resize:"vertical", fontSize:12 }}/>
            </div>

            {hasErr && (
              <div style={{ marginTop:10, padding:"8px 10px", background:tk.errBg, border:`1px solid ${tk.errBd}`, borderRadius:6, fontSize:11, color:"#A32D2D" }}>
                Please complete all required fields before submitting.
              </div>
            )}
          </div>
        </div>

        {/* Bottom action bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:16, paddingTop:14, borderTop:`1px solid ${tk.border}` }}>
          <button onClick={()=>{ setForm(empty); setErrors({}); }} style={{ padding:"8px 0", fontSize:12, color:tk.muted, background:"none", border:"none", cursor:"pointer" }}>
            Cancel changes
          </button>
          <div style={{ display:"flex", gap:8 }}>
            <button onClick={()=>{ const e=validate(true); if(Object.keys(e).length){setErrors(e);return;} setView("success"); }}
              style={{ padding:"8px 18px", borderRadius:6, fontSize:12, fontWeight:500, border:`1px solid ${tk.border}`, background:tk.card, color:tk.text, cursor:"pointer" }}>
              Save as Draft
            </button>
            <button onClick={handleSubmit}
              style={{ padding:"8px 18px", borderRadius:6, fontSize:12, fontWeight:500, border:"none", background:tk.blue, color:"#fff", cursor:"pointer", display:"flex", alignItems:"center", gap:5 }}>
              Submit Campaign for Approval
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
