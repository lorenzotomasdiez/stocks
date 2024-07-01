import ReportDownloadCard from "@/sections/reports/download-card";

export default function Page() {
  return (
    <div className="flex flex-col max-w-screen-md mx-auto text-center">
      <h3 className="text-3xl font-bold sm:text-5xl">Genere sus reportes</h3>
      <div className="grid grid-rows-3 mt-10 gap-4">
        <ReportDownloadCard
          title="Reporte por clientes"
          subtitle="Genere el reporte por cliente con la información de la variación diaria de la posición contable. Seleccione su cliente y la cantidad de títulos que quiere incluir en su reporte y genere el reporte necesario para enviar a su cliente."
        />
        <ReportDownloadCard
          title="Reporte por agentes"
          subtitle="Genere el reporte por agente con detalles de las transacciones y comisiones. Seleccione el agente y el periodo de tiempo para incluir en el reporte y obtenga un informe detallado para su revisión."
        />
        <ReportDownloadCard
          title="Reporte diario"
          subtitle="Genere un reporte diario con un resumen completo de todas las operaciones y variaciones de mercado. Seleccione la fecha para obtener un informe actualizado de todas las actividades del día."
        />
      </div>
    </div>
  );
}
