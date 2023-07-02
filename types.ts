export enum AttributeDataTypes {
  CHECKBOX = "checkbox",
  TEXT = "text",
  DATE = "date",
  NUMBER = "number",
}

export interface Attribute {
  id: string;
  name: string;
  type: AttributeDataTypes;
}

export interface Category {
  id: string;
  categoryName: string;
  attributes: { [x: string]: Attribute };
  titleAttributeId: string;
}

export interface ItemAttribute {
  attributeId: string;
  value: string;
}

export interface Item {
  id: string;
  categoryId: string;
  attributes: { [x: string]: ItemAttribute };
}
