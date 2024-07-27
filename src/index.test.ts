import { describe, expect, test } from '@jest/globals';
import { tableToExcel } from './index';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(tableToExcel({ a: '12' }, 'a')).toBe('12');
  });
});
