import { bonds_mocked } from "@/mock";
import PriceVariationCard from "@/sections/prices/price-variation";
import PricesTable from "@/sections/prices/prices-table";

export default function Page() {
  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
        Lista de Precios Bloomberg
      </h1>
      <div className="mt-10">
        <h3 className="text-xl font-semibold tracking-tighter">
          Variacion en las ultimas 24hs titulos mas usados
        </h3>
        <div className="grid grid-cols-3 gap-3 my-3">
          {bonds_mocked.map((e) => (
            <PriceVariationCard key={e.id} bond={e} />
          ))}
        </div>
        <p className="text-neutral-400 text-lg mt-5">
          Ultima actualizacion {new Date().toLocaleDateString()}
        </p>
      </div>
      <div className="my-5">
        <PricesTable />
      </div>
    </div>
  );
}
