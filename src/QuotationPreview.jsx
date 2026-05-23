import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import logo from './assets/brand_assets/LOGO - Windal.png';
import award1 from './assets/awards/IIID_Best_Stall_Design_Award_2023.jpeg';
import award2 from './assets/awards/IDEA_24_Trophy.jpeg';
import award3 from './assets/awards/IDEA_25_Exhibitor.jpeg';
import award4 from './assets/awards/IDEA_23_Exhibitor.jpeg';
import award5 from './assets/awards/Fabricator_Certificate.png';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const QuotationPreview = ({ meta, client, project, items, totals }) => {
  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.rate * parseFloat(item.area || 0)), 0);
  const finalSubtotal = subtotal - totals.discount + totals.logistics + totals.installation;
  const gst = finalSubtotal * 0.18;
  const grandTotal = finalSubtotal + gst;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="quotation-preview-container">
      {/* ════ PAGE 1 ════ */}
      <div className="qp-page qp-page-1">
        <div className="qp-header">
          <div className="qp-header-top">
            <div className="qp-header-logo">
              <img src={logo} alt="Windal" />
              <div className="tagline">Premium Architectural Glass & Aluminium Systems</div>
            </div>
            <div className="qp-header-contact">
              <span>Wadhwa Enterprises</span>
              11, Gumti Gurudwara Building, GT Road<br />
              Kanpur — 208012, Uttar Pradesh<br />
              +91 98390 36334 &nbsp;·&nbsp; samir.w@windal.in<br />
              <span style={{ color: 'var(--gold-lt)', fontSize: '7pt', letterSpacing: '0.5px' }}>GSTIN: 09AABPW2030P1ZD</span>
            </div>
          </div>
        </div>

        <div className="qp-body">
          <div className="qp-doc-title-row">
            <h1>Quota<em>tion</em></h1>
            <div className="qp-doc-meta-box">
              <strong style={{ display: 'block', marginBottom: '4px' }}>{meta.quoteNo || 'WIN-QT-YYYY-XXX'}</strong>
              <table style={{ fontSize: 'inherit', color: 'inherit', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr><td style={{ paddingRight: '8px', verticalAlign: 'top' }}>Date</td><td style={{ verticalAlign: 'top' }}>: {meta.date}</td></tr>
                  <tr><td style={{ paddingRight: '8px', verticalAlign: 'top' }}>Valid Until</td><td style={{ verticalAlign: 'top' }}>: {meta.validUntil}</td></tr>
                  <tr><td style={{ paddingRight: '8px', verticalAlign: 'top' }}>Prepared by</td><td style={{ verticalAlign: 'top' }}>: {meta.preparedBy}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="qp-info-grid">
            <div className="qp-info-card">
              <div className="qp-info-card-label">Prepared For</div>
              <div className="qp-info-card-name">{client.name}</div>
              <p>
                {client.address}<br />
                {client.city}<br />
                {client.contact}
              </p>
            </div>
            <div className="qp-info-card gold-top">
              <div className="qp-info-card-label">Project / Site</div>
              <div className="qp-info-card-name">{project.name}</div>
              <p style={{ marginBottom: '4px' }}>{project.address}</p>
              <table style={{ fontSize: 'inherit', color: 'inherit', borderCollapse: 'collapse', lineHeight: '1.4' }}>
                <tbody>
                  <tr><td style={{ paddingRight: '8px', verticalAlign: 'top' }}>Architect / ID</td><td style={{ verticalAlign: 'top' }}>: {project.architect}</td></tr>
                  <tr><td style={{ paddingRight: '8px', verticalAlign: 'top' }}>Reference No.</td><td style={{ verticalAlign: 'top' }}>: {project.refNo}</td></tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="qp-section-header">
            <div className="qp-section-number">01</div>
            <h2>A Note from Windal</h2>
          </div>

          <div className="qp-intro-text">
            <p>Dear {client.name},</p>
            <p>Thank you for considering Windal Systems for your project. It is a privilege to present this quotation, and we look forward to being a trusted part of your space from start to finish.</p>
            <p>Every system we supply is custom-fabricated to your exact openings using <strong>AluK aluminium profiles</strong>, a globally certified European brand used in landmark residential and commercial projects across India. Our systems are built and tested for thermal comfort, sound control, wind resistance, and long-term structural strength.</p>
            <p>We are confident the solution below will enhance both the beauty and functionality of your space for decades to come. Our team is available at every step — from survey to installation and beyond.</p>
            <p style={{ marginTop: '3mm', fontStyle: 'italic', color: 'var(--text-soft)' }}>We value this opportunity and look forward to a long-standing association with you.</p>
            <p style={{ marginTop: '3mm' }}>Warm regards,<br /><strong style={{ color: 'var(--navy)' }}>Samir Wadhwa</strong><br /><span style={{ fontSize: '8pt', color: 'var(--text-soft)' }}>Director, Wadhwa Enterprises</span></p>
          </div>

          <div className="qp-awards-strip">
            <div className="qp-awards-strip-label">Recognition</div>
            <div className="qp-awards-row">
              <div className="qp-award-card">
                <img src={award5} alt="AluK Fabricator Certificate" />
                <div className="qp-award-card-name">Certified AluK</div>
                <div className="qp-award-card-sub">Fabricator Partner</div>
              </div>
              <div className="qp-award-card">
                <img src={award1} alt="IIID Best Stall Design Award" />
                <div className="qp-award-card-name">Best Design</div>
                <div className="qp-award-card-sub">IIID 2023</div>
              </div>
              <div className="qp-award-card">
                <img src={award2} alt="IDEA 24 Trophy" />
                <div className="qp-award-card-name">Excellence</div>
                <div className="qp-award-card-sub">IDEA 2024</div>
              </div>
              <div className="qp-award-card">
                <img src={award3} alt="IDEA 25 Exhibitor" />
                <div className="qp-award-card-name">Exhibitor</div>
                <div className="qp-award-card-sub">IDEA 2025</div>
              </div>
              <div className="qp-award-card">
                <img src={award4} alt="IDEA 23 Exhibitor" />
                <div className="qp-award-card-name">Exhibitor</div>
                <div className="qp-award-card-sub">IDEA 2023</div>
              </div>
            </div>
          </div>
        </div>

        <div className="qp-footer">
          <span>windal.in &nbsp;·&nbsp; samir.w@windal.in &nbsp;·&nbsp; +91 98390 36334</span>
          <span className="pg-number">01 / 03</span>
        </div>
      </div>

      {/* ════ PAGE 2 ════ */}
      <div className="qp-page">
        <div className="qp-header-compact">
          <img src={logo} alt="Windal" />
          <div className="hc-right">
            <strong>{meta.quoteNo}</strong> &nbsp;·&nbsp; {client.name} &nbsp;·&nbsp; {project.name}
          </div>
        </div>

        <div className="qp-body">
          <div className="qp-section-header">
            <div className="qp-section-number">02</div>
            <h2>Scope of Supply & Pricing</h2>
          </div>

          <table className="qp-items-table">
            <thead>
              <tr>
                <th width="10%">Code</th>
                <th width="52%">System Specification</th>
                <th width="6%" style={{ textAlign: 'center' }}>Qty</th>
                <th width="16%" style={{ textAlign: 'right' }}>Rate / Unit</th>
                <th width="16%" style={{ textAlign: 'right' }}>Amount (₹)</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => {
                const itemAmount = item.qty * item.rate * parseFloat(item.area || 0);
                return (
                  <tr key={idx}>
                    <td>
                      <div className="qp-item-code">{item.code}</div>
                      <div className="qp-item-thumb">
                        {item.imageBlob ? (
                          item.imageBlob.startsWith('data:application/pdf') ? (
                            <Document file={item.imageBlob} loading="Loading PDF...">
                              <Page pageNumber={1} width={280} renderTextLayer={false} renderAnnotationLayer={false} />
                            </Document>
                          ) : (
                            <img src={item.imageBlob} alt="Drawing" />
                          )
                        ) : (
                          <>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#607d8b" strokeWidth="1.2">
                              <rect x="3" y="3" width="18" height="18" rx="1"/>
                              <line x1="12" y1="3" x2="12" y2="21"/>
                              <line x1="3" y1="12" x2="21" y2="12"/>
                              <line x1="3" y1="7" x2="6" y2="7"/>
                              <line x1="3" y1="17" x2="6" y2="17"/>
                            </svg>
                            Technical Drawing<br />
                            <span style={{ fontSize: '6pt', letterSpacing: '0.3px' }}>To be added</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="qp-item-system">{item.system}</div>
                      <div className="qp-item-type">{item.type}</div>
                      <dl className="qp-item-specs">
                        {item.dimension && <><dt>Dimension</dt><dd>{item.dimension}</dd></>}
                        {item.area && <><dt>Area</dt><dd>{item.area}</dd></>}
                        {item.location && <><dt>Location</dt><dd>{item.location}</dd></>}
                        {item.glazing && <><dt>Glazing</dt><dd>{item.glazing}</dd></>}
                        {item.profile && <><dt>Profile</dt><dd>{item.profile}</dd></>}
                        {item.hardware && <><dt>Hardware</dt><dd>{item.hardware}</dd></>}
                        {item.track && <><dt>Track</dt><dd>{item.track}</dd></>}
                      </dl>
                    </td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>{item.qty}</td>
                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                      <div className="qp-rate-label">₹ per Sq.ft</div>
                      <div className="qp-rate-amount">{new Intl.NumberFormat('en-IN').format(item.rate)}</div>
                    </td>
                    <td style={{ textAlign: 'right', verticalAlign: 'middle' }}>
                      <div className="qp-rate-amount">{formatCurrency(itemAmount).replace('₹', '')}</div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ fontSize: '7.5pt', color: 'var(--text-soft)', marginTop: '4mm', marginBottom: '8mm' }}>
            * <strong>AluK</strong> — globally certified European aluminium systems brand used across India.<br />
          </div>

          <div style={{ pageBreakInside: 'avoid', breakInside: 'avoid', display: 'block' }}>
            <div className="qp-totals-section">
              <div className="qp-bank-block">
                <h4>Bank Details</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <table style={{ fontSize: '8pt', borderCollapse: 'collapse', lineHeight: '1.6', textAlign: 'left' }}>
                    <tbody>
                      <tr>
                        <td style={{ color: 'var(--text-soft)', paddingRight: '12px' }}>Account Name</td>
                        <td><strong>WADHWA ENTERPRISES</strong></td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--text-soft)', paddingRight: '12px' }}>Account No.</td>
                        <td><strong>09410400008722</strong></td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--text-soft)', paddingRight: '12px' }}>Bank</td>
                        <td><strong>Bank of Baroda, Sisamau, Kanpur</strong></td>
                      </tr>
                      <tr>
                        <td style={{ color: 'var(--text-soft)', paddingRight: '12px' }}>IFSC Code</td>
                        <td><strong>BARB0SISAMA</strong></td>
                      </tr>
                    </tbody>
                  </table>
                  <div style={{ textAlign: 'center', background: 'white', padding: '6px', border: '1px solid var(--rule)', borderRadius: '4px' }}>
                    <QRCodeSVG value="upi://pay?pa=wadhw98390@barodampay&pn=WADHWA%20ENTERPRISES&cu=INR" size={85} />
                    <div style={{ fontSize: '6.5pt', marginTop: '4px', color: 'var(--navy)', fontWeight: '700', letterSpacing: '0.5px' }}>SCAN TO PAY</div>
                  </div>
                </div>
                <p style={{ marginTop: '2mm' }}>
                  <strong style={{ color: 'var(--gold)', fontSize: '8pt' }}>GSTIN &nbsp;</strong> 
                  <strong style={{ fontSize: '10pt' }}>09AABPW2030P1ZD</strong>
                </p>
              </div>

              <div className="qp-totals-block">
                <div className="qp-totals-row">
                  <span className="t-label">Basic Value</span>
                  <span className="t-value">{formatCurrency(subtotal)}</span>
                </div>
                <div className="qp-totals-row">
                  <span className="t-label">Discount</span>
                  <span className="t-value" style={{color: '#e53e3e'}}>- {formatCurrency(totals.discount)}</span>
                </div>
                <div className="qp-totals-row">
                  <span className="t-label">Logistics</span>
                  <span className="t-value">{formatCurrency(totals.logistics)}</span>
                </div>
                <div className="qp-totals-row">
                  <span className="t-label">Installation</span>
                  <span className="t-value">{formatCurrency(totals.installation)}</span>
                </div>
                <div className="qp-totals-row" style={{ borderTop: '2px solid var(--rule)' }}>
                  <span className="t-label">Subtotal (excl. GST)</span>
                  <span className="t-value">{formatCurrency(finalSubtotal)}</span>
                </div>
                <div className="qp-totals-row">
                  <span className="t-label">GST @ 18%</span>
                  <span className="t-value">{formatCurrency(gst)}</span>
                </div>
                <div className="qp-totals-row">
                  <span className="t-label">Grand Total</span>
                  <span className="t-value">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="qp-footer">
          <span>Prices are inclusive of supply & installation. GST @ 18% applicable.</span>
          <span className="pg-number">02 / 03</span>
        </div>
      </div>

      {/* ════ PAGE 3: Terms & Conditions ════ */}
      <div className="qp-page">
        <div className="qp-header-compact">
          <img src={logo} alt="Windal" />
          <div className="hc-right">
            <strong>{meta.quoteNo}</strong> &nbsp;·&nbsp; Terms & Conditions
          </div>
        </div>

        <div className="qp-body">
          <div style={{ textAlign: 'center', marginTop: '4mm', marginBottom: '8mm' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '20pt', fontWeight: '600', color: 'var(--navy)', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>Terms & Conditions</h2>
            <p style={{ fontSize: '8.5pt', color: 'var(--text-soft)', marginTop: '2mm' }}>Please read all terms carefully. Signing or emailing approval of this document constitutes full acceptance.</p>
          </div>

          <div className="qp-tc-grid">
            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">01</span>
                <h4>PRODUCT & SPECIFICATIONS</h4>
              </div>
              <ul>
                <li>All specifications, colours, and hardware are final upon sign-off. Minor visual variations from showroom samples may occur due to scale.</li>
                <li>Systems are custom-manufactured; no two units are identical.</li>
                <li>Signed document or email approval constitutes a binding contract.</li>
              </ul>
            </div>

            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">02</span>
                <h4>ORDER CONFIRMATION & PAYMENT</h4>
              </div>
              <ul>
                <li>Quotation valid for 15 days from date of issue.</li>
                <li>Orders confirmed only on receipt of advance. No cancellations or refunds post-confirmation.</li>
                <li>Schedule: <strong>50% Advance</strong> · <strong>40% Before Dispatch</strong> · <strong>10% Post Installation</strong>.</li>
                <li>Site must be ready within 3 months of order, else subject to price revision.</li>
              </ul>
            </div>

            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">03</span>
                <h4>SITE READINESS (CUSTOMER SCOPE)</h4>
              </div>
              <ul>
                <li>Civil structure with plaster / POP complete. Jambs, soffits, and sills must be smooth, level, and finished.</li>
                <li>Scaffolding, electricity, and water to be provided by the customer at site.</li>
                <li>Aperture tapering or unevenness must be corrected prior to installation.</li>
              </ul>
            </div>

            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">04</span>
                <h4>SURVEY & TECHNICAL REVIEW</h4>
              </div>
              <ul>
                <li>Survey is scheduled only after site readiness confirmation and advance receipt.</li>
                <li>Any post-sign-off specification change (size, colour, glass type) requires a revised quotation and may incur charges.</li>
              </ul>
            </div>

            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">05</span>
                <h4>PRODUCTION & DISPATCH</h4>
              </div>
              <ul>
                <li>Production commences after survey sign-off. Lead time: 45 to 60 days for standard finishes.</li>
                <li>On delivery, material must be stored upright in a dry, protected area. Customer's responsibility.</li>
              </ul>
            </div>

            <div className="qp-tc-card">
              <div className="qp-tc-header">
                <span className="tc-num">06</span>
                <h4>INSTALLATION & WARRANTY</h4>
              </div>
              <ul>
                <li>Installation scheduled once major civil and interior work is complete.</li>
                <li>Protection tape must be removed within 30 days of installation.</li>
                <li>Warranty on hardware and profile integrity is valid only upon quality check, signed handover, and 100% payment clearance.</li>
              </ul>
            </div>
          </div>

          <div className="qp-signature-row">
            <div className="qp-sig-box">
              <strong style={{ color: 'var(--navy)' }}>Wadhwa Enterprises</strong>
              <div className="sig-line"></div>
              <span>Authorised Signatory &nbsp;·&nbsp; Date: ___________</span>
            </div>
            <div className="qp-sig-box right">
              <strong style={{ color: 'var(--navy)' }}>Customer Acceptance</strong>
              <div className="sig-line"></div>
              <span>Signature & Stamp &nbsp;·&nbsp; Date: ___________</span>
            </div>
          </div>
        </div>

        <div className="qp-footer">
          <span>Wadhwa Enterprises &nbsp;·&nbsp; 11, Gumti Gurudwara Building, GT Road, Kanpur 208012</span>
          <span className="pg-number">03 / 03</span>
        </div>
      </div>
    </div>
  );
};

export default QuotationPreview;
