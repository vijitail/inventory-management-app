import { create } from "zustand";
import { Item, ItemAttribute } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCategoryStore } from "./category-store";
import uuid from "react-native-uuid";

interface ItemState {
  items: { [categoryId: string]: { [id: string]: Item } };
  addItem: (categoryId: string) => void;
  editItem: (item: Item) => void;
  removeItem: (categoryId: string, itemId: string) => void;
  removeItems: (categoryId: string) => void;
  removeAttributes: (categoryId: string, attributeId: string) => void;
  addAttribute: (categoryId: string, attributeId: string) => void;
  // clearAttributeValue: (categoryId: string, attributeId: string) => void;
}

const createItem = (categoryId: string): Item => {
  const id = uuid.v4() as string;
  const { categories } = useCategoryStore.getState();
  const attributes = categories[categoryId]?.attributes || {};

  return {
    id,
    categoryId,
    attributes: Object.values(attributes).reduce(
      (acc: { [x: string]: ItemAttribute }, curr) => {
        acc[curr.id] = {
          attributeId: curr.id,
          value: "",
        };
        return acc;
      },
      {}
    ),
  };
};

export const useItemStore = create<ItemState>()(
  persist(
    (set) => ({
      items: {},
      addItem: (categoryId: string) =>
        set((state) => {
          const item = createItem(categoryId);
          return {
            items: {
              ...state.items,
              [categoryId]: { ...state.items[categoryId], [item.id]: item },
            },
          };
        }),
      editItem: (updatedItem: Item) =>
        set((state) => {
          const categoryItems = state.items[updatedItem.categoryId];

          return {
            items: {
              ...state.items,
              [updatedItem.categoryId]: {
                ...categoryItems,
                [updatedItem.id]: updatedItem,
              },
            },
          };
        }),
      removeItem: (categoryId: string, itemId: string) =>
        set((state) => {
          const allItems = { ...state.items };
          const items = allItems[categoryId] || {};
          delete items[itemId];
          return { items: { ...allItems, [categoryId]: items } };
        }),
      removeItems: (categoryId: string) =>
        set((state) => {
          const items = { ...state.items };
          delete items[categoryId];
          return items;
        }),
      removeAttributes: (categoryId: string, attributeId: string) =>
        set((state) => {
          const allItems = { ...state.items };
          const items = allItems[categoryId] || {};

          const updateItems = Object.values(items).reduce(
            (acc: { [x: string]: Item }, curr) => {
              const item = { ...curr };
              delete item.attributes[attributeId];
              acc[curr.id] = item;
              return acc;
            },
            {}
          );

          return { ...allItems, [categoryId]: updateItems };
        }),
      addAttribute: (categoryId: string, attributeId: string) =>
        set((state) => {
          const allItems = { ...state.items };
          const items = allItems[categoryId] || {};

          const updateItems = Object.values(items).reduce(
            (acc: { [x: string]: Item }, curr) => {
              const item = { ...curr };
              item.attributes[attributeId] = { attributeId, value: "" };
              acc[curr.id] = item;
              return acc;
            },
            {}
          );

          return { ...allItems, [categoryId]: updateItems };
        }),
    }),
    {
      name: "items-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
