function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateSection(name, value, errors) {
  if (value == null) return;
  if (!isPlainObject(value)) {
    errors.push(`"${name}" must be an object.`);
  }
}

function validateItems(items, errors) {
  if (items == null) return;
  if (!Array.isArray(items)) {
    errors.push('"items" must be an array.');
    return;
  }
  items.forEach((item, i) => {
    if (!isPlainObject(item)) {
      errors.push(`Item ${i + 1} is not a valid object.`);
    }
  });
}

/**
 * @returns {{ ok: boolean, errors: string[], data?: object }}
 */
export function validateWindalTemplate(raw) {
  const errors = [];

  if (raw == null || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, errors: ['File must contain a JSON object with quote data.'] };
  }

  const hasPayload =
    raw.meta != null ||
    raw.client != null ||
    raw.project != null ||
    raw.items != null ||
    raw.totals != null;

  if (!hasPayload) {
    errors.push('No quote data found (expected meta, client, project, items, or totals).');
  }

  validateSection('meta', raw.meta, errors);
  validateSection('client', raw.client, errors);
  validateSection('project', raw.project, errors);
  validateSection('totals', raw.totals, errors);
  validateItems(raw.items, errors);

  if (raw.version != null && typeof raw.version !== 'number' && typeof raw.version !== 'string') {
    errors.push('"version" must be a number or string if present.');
  }

  return { ok: errors.length === 0, errors, data: raw };
}

export function formatValidationErrors(errors) {
  return `Invalid .windal file:\n\n${errors.map((e) => `• ${e}`).join('\n')}`;
}
