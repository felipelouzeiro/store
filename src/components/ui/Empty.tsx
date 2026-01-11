export function Empty() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-4">
      <div className="text-center space-y-4">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold text-gray-800">Nenhum produto encontrado</h2>
        <p className="text-gray-600">Tente ajustar os filtros para encontrar mais produtos.</p>
      </div>
    </div>
  );
}
