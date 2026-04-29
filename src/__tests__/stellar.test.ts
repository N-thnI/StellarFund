/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi } from 'vitest';
import { handleStellarError } from '../lib/stellar';

// Mock Albedo so it doesn't crash the Node environment
vi.mock('@albedo-link/intent', () => ({
  default: {
    publicKey: vi.fn(),
  },
}));

describe('Stellar DApp Logic', () => {
  // Test 1: Error Mapping Logic
  it('identifies user cancellation correctly', () => {
    const err = { message: "connection closed" };
    expect(handleStellarError(err)).toBe("Connection closed by user.");
  });

  // Test 2: Error Handling for Invalid Data
  it('handles invalid transaction data errors', () => {
    const err = { message: "invalid transaction" };
    expect(handleStellarError(err)).toBe("Invalid transaction data.");
  });

  // Test 3: Fallback Error Message
  it('provides a generic fallback for unknown errors', () => {
    const err = { message: "something went wrong" };
    expect(handleStellarError(err)).toContain("Account not found");
  });
});
