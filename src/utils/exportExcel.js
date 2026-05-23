import * as XLSX from 'xlsx';

export function itemsToExcelRows(items) {
  return items.map((item) => ({
    Code: item.code ?? '',
    Location: item.location ?? '',
    System: item.system ?? '',
    Type: item.type ?? '',
    Width: item.width ?? '',
    Height: item.height ?? '',
    Area: item.area ?? '',
    Qty: item.qty ?? '',
    Rate: item.rate ?? '',
    Glazing: item.glazing ?? '',
    'Profile Color': item.profile ?? '',
    Hardware: item.hardware ?? '',
    Track: item.track ?? '',
  }));
}

export function downloadItemsExcel(items, filenameBase = 'Quote_Items') {
  const rows = itemsToExcelRows(items);
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Items');
  const safeName = filenameBase.replace(/[^a-zA-Z0-9 -]/g, '').trim() || 'Quote_Items';
  XLSX.writeFile(wb, `${safeName}.xlsx`);
}
