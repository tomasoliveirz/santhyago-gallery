#!/bin/bash
# Script COMPLETO para executar NO SERVIDOR via SSH
# Copie e cole tudo de uma vez na sessão SSH

set -e

SITE="santhyago-gallery"
WEBROOT="/var/www/$SITE"
NEW_IP="51.38.190.127"

echo "======================================"
echo "🚀 Setup Completo - Santhyago Gallery"
echo "======================================"

# 1. Configurar Nginx
echo ""
echo "📝 Criando configuração do Nginx..."

sudo tee /etc/nginx/sites-available/$SITE >/dev/null <<'NGINX'
server {
    listen 51.38.190.127:80 default_server;
    server_name _;

    root /var/www/santhyago-gallery;
    index index.html;

    # Identificação do vhost
    add_header X-Site "santhyago-gallery" always;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Sem cache no HTML
    location = /index.html { 
        add_header Cache-Control "no-store"; 
    }

    # Cache nos assets
    location ~* \.(?:js|mjs|css|png|jpe?g|webp|gif|svg|ico|woff2?)$ {
        expires 30d;
        access_log off;
    }

    access_log /var/log/nginx/santhyago-gallery.access.log;
    error_log  /var/log/nginx/santhyago-gallery.error.log;
}
NGINX

echo "✅ Configuração criada!"

# 2. Preparar webroot
echo ""
echo "📁 Preparando diretório..."
sudo mkdir -p "$WEBROOT"
echo '<h1>santhyago-gallery está configurado! ✅</h1><p>Aguardando deploy...</p>' | sudo tee "$WEBROOT/index.html" >/dev/null

# 3. Ativar site
echo ""
echo "🔗 Ativando site..."
sudo ln -sf /etc/nginx/sites-available/$SITE /etc/nginx/sites-enabled/$SITE

# 4. Remover default
echo ""
echo "🗑️  Removendo site default..."
sudo rm -f /etc/nginx/sites-enabled/default

# 5. Se houver site "santhyago" antigo, mover para o IP antigo
if [ -f /etc/nginx/sites-available/santhyago ]; then
    echo ""
    echo "🔧 Ajustando site antigo (santhyago) para IP 51.38.190.126..."
    sudo sed -i 's/listen 80 default_server;/listen 51.38.190.126:80 default_server;/' /etc/nginx/sites-available/santhyago 2>/dev/null || true
    sudo sed -i 's/listen \[::\]:80 default_server;/# listen [::]:80 default_server;/' /etc/nginx/sites-available/santhyago 2>/dev/null || true
fi

# 6. Testar configuração
echo ""
echo "✅ Testando configuração do Nginx..."
sudo nginx -t

# 7. Recarregar nginx
echo ""
echo "🔄 Recarregando Nginx..."
sudo systemctl reload nginx

# 8. Verificar status
echo ""
echo "📊 Status:"
sudo systemctl status nginx --no-pager -l | head -n 10

# 9. Teste local
echo ""
echo "🧪 Teste rápido:"
curl -sI http://127.0.0.1/ -H "Host: 51.38.190.127" | head -n 5 || true

echo ""
echo "======================================"
echo "✅ Nginx configurado com sucesso!"
echo "======================================"
echo ""
echo "🌐 Site: http://51.38.190.127/"
echo ""
echo "📝 Próximo passo: Fazer deploy da aplicação"
echo "   (execute 'npm run deploy' no seu PC)"
echo ""

