import React, {
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect,
    StrictMode,
} from "react";
import { AgGridReact } from "ag-grid-react";
import { getData } from "./data.jsx";
import { AgChartsCommunityModule } from "ag-charts-community";
import {
    ClientSideRowModelModule,
    ModuleRegistry,
    ValidationModule,
    createGrid,
    themeQuartz,
} from "ag-grid-community";
import { SparklinesModule } from "ag-grid-enterprise";
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    SparklinesModule.with(AgChartsCommunityModule),
    ValidationModule /* Development Only */,
]);
import "../App.css"

const tooltipRenderer = (params) => {
    return {
      title: params.context.data.symbol,
    };
  };



const GridSparkLine = () => {
    const gridRef = useRef();
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState(getData());
    const [columnDefs, setColumnDefs] = useState([
        { field: "symbol", maxWidth: 120 },
        { field: "name", minWidth: 250 },
        {
            field: "change",
            flex: 2,
            cellRenderer: "agSparklineCellRenderer",
            cellRendererParams: {
                sparklineOptions: {
                    type: 'area',
                    padding: {
                            top: 2,
                            bottom: 2,
                    },
                    marker: {
                        enabled: true,
                        itemStyler: (params) => {
                            const { min, max } = params;
                            return {
                                size: min || max ? 5 : 3,
                                fill: min ? "#ee6666" : max ? "#3ba272" : "Black",
                                stroke: min ? "#ee6666" : max ? "#3ba272" : "Black",
                                strokeWidth: 2,
                                shape: 'circle', // Marker berbentuk lingkaran
                            };
                        },
                        size: 3,
                        shape: 'circle', // Optional - marker shape is 'circle' by default.
                        fill: 'green',
                        stroke: 'green',
                        strokeWidth: 2
                    },
                    highlightStyle: {
                        item: {
                            fill: 'cyan',
                            stroke: 'cyan',
                        }
                    },
                    tooltip: {
                        renderer: tooltipRenderer,
                      },
                    axis: {
                        type: "category",
                        stroke: "rgb(204, 204, 235)",
                    },
                },
            },
        },
        {
            field: "volume",
            maxWidth: 140,
        },
    ]);
    const defaultColDef = useMemo(() => {
        return {
            flex: 1,
            minWidth: 100,
        };
    }, []);

     const myTheme = themeQuartz.withParams({
        backgroundColor: "rgb(248, 249, 250)", // Hijau tua
        foregroundColor: "black", // Hijau muda
        headerTextColor: "rgb(255, 255, 255)", // Kuning muda untuk kontras
        headerBackgroundColor: "rgb(52, 58, 64)", // Hijau tua lebih gelap
        oddRowBackgroundColor: "rgb(240, 246, 253)", // Hijau tua transparan untuk efek garis
    
        headerColumnResizeHandleColor: "rgb(255, 255, 255)", // Hijau muda terang
        accentColor: 'green', // efect hover warna pada column
        selectedRowBackgroundColor: 'rgb(0, 100, 0, 0.1)', // memberi warna ketika di pilih
    
        
      });



    return (
        <div style={containerStyle}>
            <div style={gridStyle}>
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    rowHeight={50}
                    theme={myTheme}
                />
            </div>
        </div>
    );
};

export default GridSparkLine;