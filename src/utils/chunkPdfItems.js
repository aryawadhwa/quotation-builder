/** Weight units per row — rows with drawings need more vertical space. */
function rowWeight(item) {
  return item?.imageBlob && !String(item.imageBlob).startsWith('data:application/pdf') ? 2.5 : 1;
}

/**
 * Split line items across PDF pages so rows are not clipped.
 * First pricing page has section header + less room; continuation pages fit more.
 */
export function chunkItemsForPdf(items) {
  if (!items?.length) return [[]];

  const maxFirstPage = 5;
  const maxContinuation = 7;
  const chunks = [];
  let current = [];
  let weight = 0;
  let limit = maxFirstPage;

  for (const item of items) {
    const w = rowWeight(item);
    if (current.length > 0 && weight + w > limit) {
      chunks.push(current);
      current = [];
      weight = 0;
      limit = maxContinuation;
    }
    current.push(item);
    weight += w;
  }

  if (current.length) chunks.push(current);
  return chunks;
}
