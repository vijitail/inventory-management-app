import { useState, useEffect } from "react";
import { useWindowDimensions } from "react-native";

export const useColumns = () => {
  const { width } = useWindowDimensions();

  const columnWidth = 320;

  const calculateColumns = (width: number) => {
    return width > (columnWidth + 16) * 2 ? 2 : 1;
  };
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    setColumns(calculateColumns(width));
  }, [width]);

  return { columns, columnWidth };
};
