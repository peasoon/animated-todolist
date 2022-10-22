import { ListContext } from "./listContenxt";
import { IListContext } from "./listContenxt";

interface IListContextProviderProps {
  children: React.ReactNode;
  value: IListContext | null;
}

export const ListContextProvider: React.FC<IListContextProviderProps> = ({
  children,
  value,
}) => {
  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};
