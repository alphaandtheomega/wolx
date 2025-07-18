import { MaterialReactTable, type MaterialReactTableProps } from 'material-react-table';

function CustomMaterialReactTable<T extends object>(props: MaterialReactTableProps<T>) {
  return <MaterialReactTable {...props} />;
}

export default CustomMaterialReactTable; 