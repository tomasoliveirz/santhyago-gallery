#!/bin/bash
set -e

# Configurações
SERVER="ubuntu@51.38.190.126"
REMOTE_PATH="/var/www/santhyago-gallery"
PROJECT_NAME="santhyago-gallery"

echo "🚀 Deploy do ${PROJECT_NAME}"
echo "================================"

# 1. Build local
echo ""
echo "📦 Fazendo build..."
npm run build

# 2. Verificar se a build foi criada
if [ ! -d "dist" ]; then
    echo "❌ Erro: Pasta dist/ não foi criada!"
    exit 1
fi

echo "✅ Build concluída!"

# 3. Fazer deploy via rsync
echo ""
echo "📤 Enviando arquivos para o servidor..."
rsync -avz --delete \
    --exclude 'node_modules' \
    --exclude '.git' \
    dist/ ${SERVER}:~/dist-temp/

# 4. Mover para o diretório final no servidor (precisa de sudo)
echo ""
echo "🔧 Instalando no servidor..."
ssh ${SERVER} << 'ENDSSH'
    sudo mkdir -p /var/www/santhyago-gallery
    sudo rsync -a --delete ~/dist-temp/ /var/www/santhyago-gallery/
    sudo chown -R www-data:www-data /var/www/santhyago-gallery
    sudo chmod -R 755 /var/www/santhyago-gallery
    rm -rf ~/dist-temp
    echo "✅ Arquivos instalados!"
    
    # Recarregar nginx se já estiver configurado
    if sudo nginx -t 2>/dev/null; then
        sudo systemctl reload nginx
        echo "✅ Nginx recarregado!"
    else
        echo "⚠️  Nginx precisa de configuração. Execute ./configure-nginx.sh no servidor."
    fi
ENDSSH

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "🌐 Teste: http://51.38.190.127/"
echo ""

