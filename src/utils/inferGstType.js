import { company } from '../config/company';

function siteLocationText(client, project) {
  return [client?.address, client?.city, project?.address].filter(Boolean).join(' ').toLowerCase();
}

function isIntrastateSupply(locationText) {
  if (!locationText.trim()) return true;
  return company.registeredStateAliases.some((alias) => locationText.includes(alias));
}

/** CGST+SGST for UP/intrastate supply; IGST for interstate. */
export function inferGstType(client, project) {
  return isIntrastateSupply(siteLocationText(client, project)) ? 'cgst_sgst' : 'igst';
}

export function gstTypeLabel(gstType) {
  return gstType === 'igst' ? 'IGST (interstate)' : 'CGST + SGST (intrastate)';
}
