"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  agents_mocked,
  bonds_mocked,
  clients_mocked,
  operations_mocked,
} from "@/mock";
import { OperationFull } from "@/type/operations";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Edit } from "lucide-react";
import { cn } from "@/lib/utils";

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

const globalFilterFunction = (
  row: Row<OperationFull>,
  columnId: string,
  filterValue: string,
) => {
  columnId;
  return row.getVisibleCells().some((cell) => {
    return String(cell.getValue())
      .toLowerCase()
      .includes(String(filterValue).toLowerCase());
  });
};

export default function OperationsTable() {
  const columns = useMemo<ColumnDef<OperationFull>[]>(
    () => [
      {
        header: "Fecha",
        accessorKey: "created_at",
        cell: (c) => new Date(c.getValue() as string).toLocaleDateString(),
      },
      {
        header: "Cliente",
        accessorKey: "client_name",
        enableColumnFilter: false,
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
        enableColumnFilter: false,
      },
      {
        header: "Broker",
        accessorKey: "agent_name",
      },
      {
        header: "Acciones",
        enableColumnFilter: false,
        cell: () => <Edit size={15} />,
      },
    ],
    [],
  );
  const makeData = useMemo<OperationFull[]>(() => {
    const result: OperationFull[] = operations_mocked.map((e) => ({
      ...e,
      bond_name: bonds_mocked.find((b) => b.id === e.bond_id)?.name ?? "",
      agent_name: agents_mocked.find((a) => a.id === e.agent_id)?.name ?? "",
      client_name: "Quantum",
      bond_isin: bonds_mocked.find((b) => b.id === e.bond_id)?.isin ?? "",
    }));
    return result;
  }, []);
  const [data, setData] = useState(makeData);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [globalFilter, setGlobalFilter] = useState("");
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    globalFilterFn: globalFilterFunction,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
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
      <div className={"py-2 flex justify-between"}>
        <Input
          type="string"
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="w-full max-w-40 border shadow rounded"
          placeholder="Ingrese Filtro"
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Agregar Operacion</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Agregar Operacion</DialogTitle>
              <DialogDescription>
                Complete los campos y presione guardar
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="name" className="col-span-12">
                  Cliente
                </Label>
                <Select>
                  <SelectTrigger className="w-full col-span-12">
                    <SelectValue placeholder="Seleccione Cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    {clients_mocked.map((e) => (
                      <SelectItem value={e.id} key={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="title" className="col-span-12">
                  Titulo
                </Label>
                <Select name="title">
                  <SelectTrigger className="w-full col-span-12">
                    <SelectValue placeholder="Seleccione titulo adquirido" />
                  </SelectTrigger>
                  <SelectContent>
                    {bonds_mocked.map((e) => (
                      <SelectItem value={e.id.toString()} key={e.id}>
                        <div className="flex">
                          <p>
                            {e.isin}{" "}
                            <span className="text-xs text-neutral-500">
                              {e.name}
                            </span>
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-1 items-center gap-4">
                <Label htmlFor="username" className="text-left col-span-12">
                  Cantidad de titulos
                </Label>
                <Input
                  name="username"
                  placeholder="Ingrese cantidad de titulos"
                  type="number"
                  className="col-span-12"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 py-4">
                <Label htmlFor="price" className="text-left col-span-12">
                  Precio
                </Label>
                <Input
                  name="price"
                  placeholder="Precio de compra"
                  type="number"
                  className="col-span-12"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
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
