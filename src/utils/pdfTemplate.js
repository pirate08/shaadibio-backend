// ── Traditional Template ──
// Classic, formal layout with borders and decorative elements
const traditionalTemplate = (biodata, isPremium) => {
  const { personal, family, education, horoscope, photo, privacy } = biodata;
  const color = biodata.template?.color || "#8B1A4A";

  const watermark = !isPremium
    ? `
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-45deg);
    font-size:80px;color:rgba(0,0,0,0.06);font-weight:bold;z-index:1000;
    pointer-events:none;white-space:nowrap;">ShaadiBio Free</div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Georgia',serif; color:#333; padding:40px; background:#fff; }
    .outer-border { border:3px double ${color}; padding:20px; }
    .inner-border { border:1px solid ${color}; padding:20px; }
    .header { text-align:center; padding-bottom:20px; margin-bottom:20px; }
    .header .om { font-size:28px; color:${color}; }
    .header h1 { font-size:28px; color:${color}; letter-spacing:3px; margin:8px 0 4px; }
    .header p { color:#888; font-size:13px; }
    .header .divider { font-size:20px; color:${color}; margin:8px 0; letter-spacing:8px; }
    .photo-section { text-align:center; margin-bottom:20px; }
    .photo-section img { width:110px; height:110px; border-radius:50%;
      border:4px solid ${color}; object-fit:cover; }
    .section { margin-bottom:20px; }
    .section-title { font-size:14px; font-weight:bold; color:#fff;
      background:${color}; padding:6px 12px; margin-bottom:12px;
      text-transform:uppercase; letter-spacing:1px; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
    .field { display:flex; gap:6px; padding:4px 0;
      border-bottom:1px dotted #eee; align-items:baseline; }
    .field label { font-size:11px; color:#888; min-width:120px;
      text-transform:uppercase; letter-spacing:0.5px; }
    .field span { font-size:13px; color:#333; font-weight:500; }
    .about-me { font-size:13px; line-height:1.8; color:#444; font-style:italic;
      padding:12px; border:1px solid ${color}; background:#fdf8f0; }
    .footer { text-align:center; margin-top:30px; font-size:11px; color:#bbb;
      border-top:2px double ${color}; padding-top:10px; }
  </style></head><body>
  ${watermark}
  <div class="outer-border"><div class="inner-border">
    <div class="header">
      <div class="om">🕉</div>
      <h1>${personal?.fullName || "Marriage BioData"}</h1>
      <div class="divider">✦ ✦ ✦</div>
      <p>Marriage BioData</p>
    </div>
    ${photo?.photoUrl ? `<div class="photo-section"><img src="${photo.photoUrl}" alt="Photo"/></div>` : ""}
    ${
      personal?.aboutMe
        ? `<div class="section"><div class="section-title">About Me</div>
      <p class="about-me">${personal.aboutMe}</p></div>`
        : ""
    }
    <div class="section"><div class="section-title">Personal Details</div>
      <div class="grid">
        <div class="field"><label>Full Name</label><span>${personal?.fullName || "-"}</span></div>
        <div class="field"><label>Date of Birth</label><span>${personal?.dob || "-"}</span></div>
        <div class="field"><label>Age</label><span>${personal?.age ? personal.age + " yrs" : "-"}</span></div>
        <div class="field"><label>Gender</label><span>${personal?.gender || "-"}</span></div>
        <div class="field"><label>Height</label><span>${personal?.height || "-"}</span></div>
        <div class="field"><label>Religion</label><span>${personal?.religion || "-"}</span></div>
        <div class="field"><label>Caste</label><span>${personal?.caste || "-"}</span></div>
        <div class="field"><label>Mother Tongue</label><span>${personal?.motherTongue || "-"}</span></div>
        <div class="field"><label>Marital Status</label><span>${personal?.maritalStatus || "-"}</span></div>
        <div class="field"><label>Nationality</label><span>${personal?.nationality || "Indian"}</span></div>
      </div>
    </div>
    <div class="section"><div class="section-title">Family Details</div>
      <div class="grid">
        <div class="field"><label>Father's Name</label><span>${family?.fatherName || "-"}</span></div>
        <div class="field"><label>Father's Job</label><span>${family?.fatherOccupation || "-"}</span></div>
        <div class="field"><label>Mother's Name</label><span>${family?.motherName || "-"}</span></div>
        <div class="field"><label>Mother's Job</label><span>${family?.motherOccupation || "-"}</span></div>
        <div class="field"><label>Brothers</label><span>${family?.brothers ?? "-"} (Married: ${family?.marriedBrothers ?? "-"})</span></div>
        <div class="field"><label>Sisters</label><span>${family?.sisters ?? "-"} (Married: ${family?.marriedSisters ?? "-"})</span></div>
        <div class="field"><label>Family Type</label><span>${family?.familyType || "-"}</span></div>
        <div class="field"><label>Family Status</label><span>${family?.familyStatus || "-"}</span></div>
        <div class="field"><label>Native Place</label><span>${family?.nativePlace || "-"}</span></div>
        <div class="field"><label>Family Values</label><span>${family?.familyValues || "-"}</span></div>
      </div>
    </div>
    <div class="section"><div class="section-title">Education & Career</div>
      <div class="grid">
        <div class="field"><label>Qualification</label><span>${education?.qualification || "-"}</span></div>
        <div class="field"><label>College</label><span>${education?.college || "-"}</span></div>
        <div class="field"><label>Profession</label><span>${education?.profession || "-"}</span></div>
        <div class="field"><label>Company</label><span>${education?.company || "-"}</span></div>
        ${!privacy?.hideIncome ? `<div class="field"><label>Annual Income</label><span>${education?.annualIncome || "-"}</span></div>` : ""}
        <div class="field"><label>Working City</label><span>${education?.workingCity || "-"}</span></div>
        <div class="field"><label>Working Country</label><span>${education?.workingCountry || "India"}</span></div>
      </div>
    </div>
    ${
      horoscope?.enabled
        ? `<div class="section"><div class="section-title">Horoscope Details</div>
      <div class="grid">
        <div class="field"><label>Rashi</label><span>${horoscope?.rashi || "-"}</span></div>
        <div class="field"><label>Nakshatra</label><span>${horoscope?.nakshatra || "-"}</span></div>
        <div class="field"><label>Gotra</label><span>${horoscope?.gotra || "-"}</span></div>
        <div class="field"><label>Manglik</label><span>${horoscope?.manglik || "-"}</span></div>
        <div class="field"><label>Time of Birth</label><span>${horoscope?.timeOfBirth || "-"}</span></div>
        <div class="field"><label>Place of Birth</label><span>${horoscope?.placeOfBirth || "-"}</span></div>
      </div>
      ${horoscope?.aiSummary ? `<p class="about-me" style="margin-top:10px">${horoscope.aiSummary}</p>` : ""}
    </div>`
        : ""
    }
    ${
      !privacy?.hideContact
        ? `<div class="section"><div class="section-title">Contact Details</div>
      <div class="grid">
        <div class="field"><label>Phone</label><span>${biodata.contact?.phone || "-"}</span></div>
        <div class="field"><label>Email</label><span>${biodata.contact?.email || "-"}</span></div>
        <div class="field"><label>City</label><span>${biodata.contact?.city || "-"}</span></div>
        <div class="field"><label>State</label><span>${biodata.contact?.state || "-"}</span></div>
      </div>
    </div>`
        : ""
    }
    <div class="footer">✦ Generated by ShaadiBio • ${new Date().toLocaleDateString("en-IN")} ✦</div>
  </div></div>
  </body></html>`;
};

// ── Modern Template ──
// Clean, two-column layout with sidebar
const modernTemplate = (biodata, isPremium) => {
  const { personal, family, education, horoscope, photo, privacy } = biodata;
  const color = biodata.template?.color || "#1A3A8B";

  const watermark = !isPremium
    ? `
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-45deg);
    font-size:80px;color:rgba(0,0,0,0.06);font-weight:bold;z-index:1000;
    pointer-events:none;white-space:nowrap;">ShaadiBio Free</div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Helvetica Neue',sans-serif; color:#333; background:#fff; }
    .layout { display:flex; min-height:100vh; }
    .sidebar { width:220px; background:${color}; color:#fff; padding:30px 20px;
      flex-shrink:0; }
    .sidebar .photo img { width:100px; height:100px; border-radius:50%;
      border:3px solid rgba(255,255,255,0.5); object-fit:cover;
      display:block; margin:0 auto 16px; }
    .sidebar .name { font-size:18px; font-weight:bold; text-align:center;
      margin-bottom:4px; }
    .sidebar .subtitle { font-size:11px; text-align:center;
      opacity:0.7; margin-bottom:24px; }
    .sidebar-section { margin-bottom:20px; }
    .sidebar-section h3 { font-size:10px; text-transform:uppercase;
      letter-spacing:1px; opacity:0.6; margin-bottom:8px;
      border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:4px; }
    .sidebar-section p { font-size:12px; opacity:0.9; margin-bottom:4px; }
    .main { flex:1; padding:30px; }
    .main-header { border-bottom:3px solid ${color}; padding-bottom:16px;
      margin-bottom:24px; }
    .main-header h1 { font-size:26px; color:${color}; }
    .main-header p { font-size:13px; color:#888; margin-top:2px; }
    .section { margin-bottom:24px; }
    .section-title { font-size:13px; font-weight:bold; color:${color};
      text-transform:uppercase; letter-spacing:1px; margin-bottom:12px;
      display:flex; align-items:center; gap:8px; }
    .section-title::after { content:''; flex:1; height:1px; background:#eee; }
    .grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
    .field label { font-size:10px; color:#aaa; text-transform:uppercase;
      letter-spacing:0.5px; display:block; }
    .field span { font-size:13px; color:#333; font-weight:500; }
    .about-me { font-size:13px; line-height:1.8; color:#555;
      background:#f5f7ff; padding:14px; border-left:4px solid ${color};
      border-radius:0 8px 8px 0; }
    .footer { text-align:center; margin-top:30px; font-size:11px;
      color:#bbb; padding-top:12px; border-top:1px solid #eee; }
  </style></head><body>
  ${watermark}
  <div class="layout">
    <div class="sidebar">
      ${photo?.photoUrl ? `<div class="photo"><img src="${photo.photoUrl}" alt="Photo"/></div>` : ""}
      <div class="name">${personal?.fullName || "Name"}</div>
      <div class="subtitle">Marriage BioData</div>
      ${
        !privacy?.hideContact
          ? `<div class="sidebar-section">
        <h3>Contact</h3>
        <p>📞 ${biodata.contact?.phone || "-"}</p>
        <p>✉ ${biodata.contact?.email || "-"}</p>
        <p>📍 ${biodata.contact?.city || ""}, ${biodata.contact?.state || ""}</p>
      </div>`
          : ""
      }
      <div class="sidebar-section">
        <h3>Quick Info</h3>
        <p>🎂 ${personal?.dob || "-"}</p>
        <p>📏 ${personal?.height || "-"}</p>
        <p>🙏 ${personal?.religion || "-"}</p>
        <p>🗣 ${personal?.motherTongue || "-"}</p>
      </div>
      ${
        horoscope?.enabled
          ? `<div class="sidebar-section">
        <h3>Horoscope</h3>
        <p>Rashi: ${horoscope?.rashi || "-"}</p>
        <p>Nakshatra: ${horoscope?.nakshatra || "-"}</p>
        <p>Manglik: ${horoscope?.manglik || "-"}</p>
      </div>`
          : ""
      }
    </div>
    <div class="main">
      <div class="main-header">
        <h1>${personal?.fullName || "Marriage BioData"}</h1>
        <p>${education?.profession || ""} ${education?.workingCity ? "• " + education.workingCity : ""}</p>
      </div>
      ${
        personal?.aboutMe
          ? `<div class="section">
        <div class="section-title">About Me</div>
        <p class="about-me">${personal.aboutMe}</p>
      </div>`
          : ""
      }
      <div class="section"><div class="section-title">Personal Details</div>
        <div class="grid">
          <div class="field"><label>Age</label><span>${personal?.age ? personal.age + " yrs" : "-"}</span></div>
          <div class="field"><label>Gender</label><span>${personal?.gender || "-"}</span></div>
          <div class="field"><label>Caste</label><span>${personal?.caste || "-"}</span></div>
          <div class="field"><label>Marital Status</label><span>${personal?.maritalStatus || "-"}</span></div>
          <div class="field"><label>Nationality</label><span>${personal?.nationality || "Indian"}</span></div>
        </div>
      </div>
      <div class="section"><div class="section-title">Education & Career</div>
        <div class="grid">
          <div class="field"><label>Qualification</label><span>${education?.qualification || "-"}</span></div>
          <div class="field"><label>College</label><span>${education?.college || "-"}</span></div>
          <div class="field"><label>Profession</label><span>${education?.profession || "-"}</span></div>
          <div class="field"><label>Company</label><span>${education?.company || "-"}</span></div>
          ${!privacy?.hideIncome ? `<div class="field"><label>Annual Income</label><span>${education?.annualIncome || "-"}</span></div>` : ""}
          <div class="field"><label>Working Country</label><span>${education?.workingCountry || "India"}</span></div>
        </div>
      </div>
      <div class="section"><div class="section-title">Family Details</div>
        <div class="grid">
          <div class="field"><label>Father's Name</label><span>${family?.fatherName || "-"}</span></div>
          <div class="field"><label>Father's Job</label><span>${family?.fatherOccupation || "-"}</span></div>
          <div class="field"><label>Mother's Name</label><span>${family?.motherName || "-"}</span></div>
          <div class="field"><label>Mother's Job</label><span>${family?.motherOccupation || "-"}</span></div>
          <div class="field"><label>Brothers</label><span>${family?.brothers ?? "-"} (M: ${family?.marriedBrothers ?? "-"})</span></div>
          <div class="field"><label>Sisters</label><span>${family?.sisters ?? "-"} (M: ${family?.marriedSisters ?? "-"})</span></div>
          <div class="field"><label>Family Type</label><span>${family?.familyType || "-"}</span></div>
          <div class="field"><label>Native Place</label><span>${family?.nativePlace || "-"}</span></div>
        </div>
      </div>
      ${
        horoscope?.enabled && horoscope?.aiSummary
          ? `<div class="section">
        <div class="section-title">Horoscope Summary</div>
        <p class="about-me">${horoscope.aiSummary}</p>
      </div>`
          : ""
      }
      <div class="footer">Generated by ShaadiBio • ${new Date().toLocaleDateString("en-IN")}</div>
    </div>
  </div>
  </body></html>`;
};

// ── Minimal Template ──
// Clean, simple, text-focused, no heavy design
const minimalTemplate = (biodata, isPremium) => {
  const { personal, family, education, horoscope, photo, privacy } = biodata;
  const color = biodata.template?.color || "#2D2D2D";

  const watermark = !isPremium
    ? `
    <div style="position:fixed;top:50%;left:50%;transform:translate(-50%,-50%) rotate(-45deg);
    font-size:80px;color:rgba(0,0,0,0.06);font-weight:bold;z-index:1000;
    pointer-events:none;white-space:nowrap;">ShaadiBio Free</div>`
    : "";

  return `<!DOCTYPE html><html><head><meta charset="UTF-8">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Helvetica Neue',sans-serif; color:#222;
      padding:50px; background:#fff; max-width:700px; margin:0 auto; }
    .header { margin-bottom:32px; }
    .header-top { display:flex; align-items:center; gap:20px; margin-bottom:16px; }
    .header-top img { width:80px; height:80px; border-radius:50%;
      object-fit:cover; border:2px solid #eee; }
    .header-top .name-block h1 { font-size:26px; color:${color}; font-weight:700; }
    .header-top .name-block p { font-size:13px; color:#888; margin-top:2px; }
    .header-divider { height:2px; background:${color}; width:40px; margin-bottom:32px; }
    .section { margin-bottom:28px; }
    .section-title { font-size:11px; font-weight:700; color:${color};
      text-transform:uppercase; letter-spacing:2px; margin-bottom:14px; }
    .row { display:flex; justify-content:space-between;
      padding:6px 0; border-bottom:1px solid #f0f0f0; }
    .row label { font-size:12px; color:#999; }
    .row span { font-size:13px; color:#222; font-weight:500; text-align:right; }
    .about-me { font-size:13px; line-height:1.9; color:#555; }
    .two-col { display:grid; grid-template-columns:1fr 1fr; gap:0 40px; }
    .footer { margin-top:40px; padding-top:16px; border-top:1px solid #eee;
      font-size:11px; color:#ccc; text-align:center; }
  </style></head><body>
  ${watermark}
  <div class="header">
    <div class="header-top">
      ${photo?.photoUrl ? `<img src="${photo.photoUrl}" alt="Photo"/>` : ""}
      <div class="name-block">
        <h1>${personal?.fullName || "Marriage BioData"}</h1>
        <p>${education?.profession || "Marriage BioData"}</p>
      </div>
    </div>
    <div class="header-divider"></div>
  </div>
  ${
    personal?.aboutMe
      ? `<div class="section">
    <div class="section-title">About</div>
    <p class="about-me">${personal.aboutMe}</p>
  </div>`
      : ""
  }
  <div class="section"><div class="section-title">Personal</div>
    <div class="two-col">
      <div class="row"><label>Date of Birth</label><span>${personal?.dob || "-"}</span></div>
      <div class="row"><label>Age</label><span>${personal?.age ? personal.age + " yrs" : "-"}</span></div>
      <div class="row"><label>Gender</label><span>${personal?.gender || "-"}</span></div>
      <div class="row"><label>Height</label><span>${personal?.height || "-"}</span></div>
      <div class="row"><label>Religion</label><span>${personal?.religion || "-"}</span></div>
      <div class="row"><label>Caste</label><span>${personal?.caste || "-"}</span></div>
      <div class="row"><label>Mother Tongue</label><span>${personal?.motherTongue || "-"}</span></div>
      <div class="row"><label>Marital Status</label><span>${personal?.maritalStatus || "-"}</span></div>
    </div>
  </div>
  <div class="section"><div class="section-title">Education & Career</div>
    <div class="two-col">
      <div class="row"><label>Qualification</label><span>${education?.qualification || "-"}</span></div>
      <div class="row"><label>College</label><span>${education?.college || "-"}</span></div>
      <div class="row"><label>Profession</label><span>${education?.profession || "-"}</span></div>
      <div class="row"><label>Company</label><span>${education?.company || "-"}</span></div>
      ${!privacy?.hideIncome ? `<div class="row"><label>Annual Income</label><span>${education?.annualIncome || "-"}</span></div>` : ""}
      <div class="row"><label>Working City</label><span>${education?.workingCity || "-"}</span></div>
    </div>
  </div>
  <div class="section"><div class="section-title">Family</div>
    <div class="two-col">
      <div class="row"><label>Father</label><span>${family?.fatherName || "-"}</span></div>
      <div class="row"><label>Father's Job</label><span>${family?.fatherOccupation || "-"}</span></div>
      <div class="row"><label>Mother</label><span>${family?.motherName || "-"}</span></div>
      <div class="row"><label>Mother's Job</label><span>${family?.motherOccupation || "-"}</span></div>
      <div class="row"><label>Brothers</label><span>${family?.brothers ?? "-"}</span></div>
      <div class="row"><label>Sisters</label><span>${family?.sisters ?? "-"}</span></div>
      <div class="row"><label>Family Type</label><span>${family?.familyType || "-"}</span></div>
      <div class="row"><label>Native Place</label><span>${family?.nativePlace || "-"}</span></div>
    </div>
  </div>
  ${
    horoscope?.enabled
      ? `<div class="section"><div class="section-title">Horoscope</div>
    <div class="two-col">
      <div class="row"><label>Rashi</label><span>${horoscope?.rashi || "-"}</span></div>
      <div class="row"><label>Nakshatra</label><span>${horoscope?.nakshatra || "-"}</span></div>
      <div class="row"><label>Gotra</label><span>${horoscope?.gotra || "-"}</span></div>
      <div class="row"><label>Manglik</label><span>${horoscope?.manglik || "-"}</span></div>
    </div>
    ${horoscope?.aiSummary ? `<p class="about-me" style="margin-top:12px">${horoscope.aiSummary}</p>` : ""}
  </div>`
      : ""
  }
  ${
    !privacy?.hideContact
      ? `<div class="section"><div class="section-title">Contact</div>
    <div class="two-col">
      <div class="row"><label>Phone</label><span>${biodata.contact?.phone || "-"}</span></div>
      <div class="row"><label>Email</label><span>${biodata.contact?.email || "-"}</span></div>
      <div class="row"><label>City</label><span>${biodata.contact?.city || "-"}</span></div>
      <div class="row"><label>State</label><span>${biodata.contact?.state || "-"}</span></div>
    </div>
  </div>`
      : ""
  }
  <div class="footer">Generated by ShaadiBio • ${new Date().toLocaleDateString("en-IN")}</div>
  </body></html>`;
};

// ── Main export — picks template based on name ──
const buildBiodataHTML = (biodata, isPremium, template) => {
  const name = template?.name || biodata.template?.name || "traditional";
  if (name === "modern") return modernTemplate(biodata, isPremium);
  if (name === "minimal") return minimalTemplate(biodata, isPremium);
  return traditionalTemplate(biodata, isPremium);
};

module.exports = { buildBiodataHTML };
