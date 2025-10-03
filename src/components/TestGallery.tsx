// =============================
// 🧪 Test Gallery Component
// =============================
export function TestGallery() {
  return (
    <div className="gallery-container bg-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="text-white text-lg mb-4">Teste de Imagem</div>
        <img 
          src="/images/1.jpg" 
          alt="Teste" 
          className="max-w-full max-h-64 rounded-lg"
          onLoad={() => console.log('Imagem carregada com sucesso!')}
          onError={(e) => console.log('Erro ao carregar imagem:', e)}
        />
        <div className="text-white text-sm mt-2">URL: /images/1.jpg</div>
      </div>
    </div>
  );
}
