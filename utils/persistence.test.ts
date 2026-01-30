/**
 * @jest-environment jsdom
 */

import { describe, it, expect, beforeEach, vi } from "vitest";

const STORAGE_KEY = "lendsqr_users_data";

describe("User Data Persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should retrieve data from localStorage if it exists", () => {
    const mockData = [{ id: "1", userName: "Israel" }];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockData));

    const cachedData = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(cachedData).toHaveLength(1);
    expect(cachedData[0].userName).toBe("Israel");
  });

  it("should return null if localStorage is empty (Negative Case)", () => {
    const cachedData = localStorage.getItem(STORAGE_KEY);
    expect(cachedData).toBeNull();
  });
});
