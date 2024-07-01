import OperationsTable from "@/sections/operations/operations-table";

export default function Page() {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Lista de Operaciones
      </h1>
      <div className="my-3">
        <OperationsTable />
      </div>
    </div>
  );
}
