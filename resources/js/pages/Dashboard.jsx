import { usePage,  } from '@inertiajs/react';
import AdminLayout from '../layouts/admin-layout';

export default function Dashboard() {
  const { users, produits, commandes, stocks } = usePage().props;

  return (
    <div>
      <div className="flex justify-end mb-6">
       
      </div>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Tableau de bord administrateur</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard label="Utilisateurs inscrits" value={users} />
        <StatCard label="Produits en vente" value={produits} />
        <StatCard label="Commandes/Achats" value={commandes} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Stocks des produits</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/80 rounded-xl shadow">
            <thead>
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Stock</th>
              </tr>
            </thead>
            <tbody>
              {stocks && stocks.length > 0 ? (
                stocks.map(product => (
                  <tr key={product.id} className={product.stock === 0 ? "bg-red-200" : ""}>
                    <td className="px-4 py-2">
                      {product.image && (
                        <img src={`/produits/${product.image}`} alt={product.nom} width={60} />
                      )}
                    </td>
                    <td className="px-4 py-2">{product.nom}</td>
                    <td className="px-4 py-2 font-bold">
                      {product.stock === 0
                        ? <span className="text-red-600">Rupture</span>
                        : product.stock}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-4">Aucun produit trouvé.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white/80 rounded-xl p-6 shadow flex flex-col items-center">
      <div className="text-3xl font-bold text-red-500">{value}</div>
      <div className="mt-2 text-gray-700 font-semibold">{label}</div>
    </div>
  );
}

Dashboard.layout = page => <AdminLayout>{page}</AdminLayout>;