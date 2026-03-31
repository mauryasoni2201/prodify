import { useFavoritesStore } from "@/store/useFavoritesStore";

jest.mock("@/lib/toast", () => ({
  showToast: {
    success: jest.fn(),
    remove: jest.fn(),
  },
}));

describe("useFavoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favoriteIds: [] });
  });

  test("toggle adds an item to favorites", () => {
    useFavoritesStore.getState().toggleFavorite(1, "Apple");
    const { favoriteIds } = useFavoritesStore.getState();
    expect(favoriteIds).toContain(1);
  });

  test("toggle removes item if it is already in favorites", () => {
    useFavoritesStore.getState().toggleFavorite(1, "Apple");
    useFavoritesStore.getState().toggleFavorite(1, "Apple");
    const { favoriteIds } = useFavoritesStore.getState();
    expect(favoriteIds).not.toContain(1);
  });

  test("isFavorite returns true for an item that was added", () => {
    useFavoritesStore.getState().toggleFavorite(1, "Apple");
    const result = useFavoritesStore.getState().isFavorite(1);
    expect(result).toBe(true);
  });
});
