import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  StrictMode,
} from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import { getData } from "./data.jsx";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  createGrid,
} from "ag-grid-community";
import {
  ColumnMenuModule,
  ColumnsToolPanelModule,
  ContextMenuModule,
  FiltersToolPanelModule,
  SetFilterModule,
  TreeDataModule,
} from "ag-grid-enterprise";
ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ColumnsToolPanelModule,
  FiltersToolPanelModule,
  ColumnMenuModule,
  ContextMenuModule,
  SetFilterModule,
  TreeDataModule,
  ValidationModule /* Development Only */,
]);

const ThreeData = () => {
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState(getData());
  const [columnDefs, setColumnDefs] = useState([
    { field: "created" },
    { field: "modified" },
    {
      field: "size",
      aggFunc: "sum",
      sort: "desc",
      valueFormatter: (params) => {
        const sizeInKb = params.value / 1024;
        if (sizeInKb > 1024) {
          return `${+(sizeInKb / 1024).toFixed(2)} MB`;
        } else {
          return `${+sizeInKb.toFixed(2)} KB`;
        }
      },
    },
  ]);
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 200,
    };
  }, []);
  const autoGroupColumnDef = useMemo(() => {
    return {
      headerName : "File Explorer",
      cellRendererParams: {
        suppressCount: true,
      },
      filter: "agSetColumnFilter",
      filterParams: {
        treeList: true,
        keyCreator: (params) => (params.value ? params.value.join("#") : null),
      },
    };
  }, []);
  const getDataPath = useCallback((data) => data.path, []);

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
      checkboxLocation: "autoGroupColumn",
      headerCheckbox: true,
    };
  }, []);

  const onSelectionChanged = (params) => {
    const selectedNodes = params.api.getSelectedNodes();
    selectedNodes.forEach((node) => {
      if (node.group) {
        // Jika grup dipilih, pilih semua anaknya
        node.childrenAfterGroup.forEach((child) => {
          child.setSelected(node.isSelected());
        });
      } else {
        // Jangan batalkan pemilihan file individu meskipun grup dibatalkan
        // Tidak ada perubahan pada file individu di luar grup
      }
    });
  };
  
  
  return (
    <div style={containerStyle}>
      <div style={gridStyle}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          treeData={true}
          groupDefaultExpanded={-1}
          getDataPath={getDataPath}
          rowSelection={rowSelection}
          onSelectionChanged={onSelectionChanged}
        />
      </div>
    </div>
  );
};

export default ThreeData;