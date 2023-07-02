import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Attribute, AttributeDataTypes, Category } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";
import { useItemStore } from "./item-store";

interface CategoryState {
  categories: { [id: string]: Category };
  addCategory: () => void;
  editCategory: (updatedCategory: Category) => void;
  addAttribute: (categoryId: string, type: AttributeDataTypes) => void;
  removeCategory: (categoryId: string) => void;
  editAttribute: (categoryId: string, attribute: Attribute) => void;
  removeAttribute: (categoryId: string, attributeId: string) => void;
}

const createAttribute = (type = AttributeDataTypes.TEXT): Attribute => {
  const id = uuid.v4() as string;

  return {
    id,
    name: "",
    type,
  };
};

const createNewCategory = (): Category => {
  const id = uuid.v4() as string;

  const defaultAttribute = createAttribute();

  return {
    id,
    categoryName: "",
    attributes: { [defaultAttribute.id]: defaultAttribute },
    titleAttributeId: defaultAttribute.id,
  };
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set, get) => ({
      categories: {},
      addCategory: () =>
        set((state) => {
          const newCategory = createNewCategory();
          return {
            categories: {
              ...state.categories,
              [newCategory.id]: newCategory,
            },
          };
        }),
      editCategory: (updatedCategory: Category) =>
        set((state) => ({
          categories: {
            ...state.categories,
            [updatedCategory.id]: updatedCategory,
          },
        })),
      removeCategory: (categoryId: string) =>
        set((state) => {
          const removeItemsByCategoryId = useItemStore.getState().removeItems;
          removeItemsByCategoryId(categoryId);

          const categories = { ...state.categories };
          delete categories[categoryId];
          return { categories };
        }),
      addAttribute: (categoryId: string, type: AttributeDataTypes) => {
        const { categories, editCategory } = get();
        const addAttributeInItems = useItemStore.getState().addAttribute;

        const newAttribute = createAttribute(type);

        const category = categories[categoryId];

        category.attributes = {
          ...category.attributes,
          [newAttribute.id]: newAttribute,
        };

        editCategory(category);
        addAttributeInItems(categoryId, newAttribute.id);
      },
      editAttribute: (categoryId: string, updatedAttribute: Attribute) => {
        const { categories, editCategory } = get();
        const category = categories[categoryId];
        const currentAttribute = category.attributes[updatedAttribute.id];
        if (currentAttribute.type !== updatedAttribute.type) {
          const clearAttributeValue = useItemStore.getState().addAttribute;
          clearAttributeValue(categoryId, updatedAttribute.id);
        }
        category.attributes[updatedAttribute.id] = updatedAttribute;
        editCategory(category);
      },
      removeAttribute: (categoryId: string, attributeId: string) => {
        const { categories, editCategory } = get();

        const removeAttributesInItems =
          useItemStore.getState().removeAttributes;
        removeAttributesInItems(categoryId, attributeId);

        const category = categories[categoryId];

        delete category.attributes[attributeId];
        if (category.titleAttributeId === attributeId)
          category.titleAttributeId = "";

        editCategory(category);
      },
    }),
    {
      name: "category-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
