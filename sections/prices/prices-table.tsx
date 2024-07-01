"use client";
import { cn } from "@/lib/utils";
import { bond_price_mocked, bonds_mocked } from "@/mock";
import { BondPriceFull } from "@/type/operations";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  Row,
} from "@tanstack/react-table";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

export default function PricesTable() {
  const columns = useMemo<ColumnDef<BondPriceFull>[]>(
    () => [
      {
        header: "Fecha",
        accessorKey: "created_at",
        cell: (c) => new Date(c.getValue() as string).toLocaleDateString(),
      },
      {
        header: "Bono/Titulo",
        accessorKey: "bond_name",
      },
      {
        header: "Especie",
        accessorKey: "bond_isin",
      },
      {
        header: "Precio",
        accessorKey: "price",
        cell: (c) => `$${c.row.original.bond_currency} ${c.getValue()}`,
      },
    ],
    [],
  );
  const makeData = useMemo<BondPriceFull[]>(() => {
    const result: BondPriceFull[] = bond_price_mocked.map((e) => ({
      ...e,
      bond_name: bonds_mocked.find((b) => b.id === e.bond_id)?.name ?? "",
      bond_isin: bonds_mocked.find((b) => b.id === e.bond_id)?.isin ?? "",
      bond_currency:
        bonds_mocked.find((b) => b.id === e.bond_id)?.currency ?? "",
    }));
    return result;
  }, []);
  const [data, setData] = useState(makeData);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (
        rowIndex: number,
        columnId: number,
        value: string | number,
      ) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          }),
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="border rounded-lg overflow-auto">
        <table className="w-full max-w-full h-auto">
          <thead className="bg-neutral-200 dark:bg-neutral-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan} className="py-2">
                    {header.isPlaceholder ? null : (
                      <p>{header.column.columnDef.header?.toString()}</p>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className={cn("bg-neutral-100", "dark:bg-neutral-800")}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} align="center" className="py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
