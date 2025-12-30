#!/bin/bash
# Script para executar NO SERVIDOR (ubuntu@51.38.190.126)
# Execute com: bash configure-nginx.sh

set -e

SITE="santhyago-gallery"
WEBROOT="/var/www/$SITE"
NEW_IP="51.38.190.126"

echo "🔧 Configurando Nginx para ${SITE}"
echo "================================"

# 1. Garantir que o webroot existe
echo ""
echo "📁 Preparando webroot..."
sudo mkdir -p "$WEBROOT"

# Se não houver index.html, criar um temporário
if [ ! -f "$WEBROOT/index.html" ]; then
    echo '<h1>santhyago-gallery ✅</h1>' | sudo tee "$WEBROOT/index.html" >/dev/null
    echo "⚠️  Index temporário criado. Faça deploy da build!"
fi

# 2. Criar configuração do nginx
echo ""
echo "⚙️  Criando configuração do Nginx..."
sudo tee /etc/nginx/sites-available/$SITE >/dev/null <<'NGINX'
server {
    listen 51.38.190.126:80 default_server;
    server_name gallery.santhyago.com;

    root /var/www/santhyago-gallery;
    index index.html;

    # Identificação do vhost (para debug rápido com curl -I)
    add_header X-Site "santhyago-gallery" always;

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Não caches o HTML da SPA (evita "ficar preso" em builds antigas)
    location = /index.html { 
        add_header Cache-Control "no-store"; 
    }

    # Cache agressiva de assets estáticos
    location ~* \.(?:js|mjs|css|png|jpe?g|webp|gif|svg|ico|woff2?)$ {
        expires 30d;
        access_log off;
    }

    access_log /var/log/nginx/santhyago-gallery.access.log;
    error_log  /var/log/nginx/santhyago-gallery.error.log;
}
NGINX

# 3. Ativar o site
echo ""
echo "🔗 Ativando site..."
sudo ln -sf /etc/nginx/sites-available/$SITE /etc/nginx/sites-enabled/$SITE

# 4. Remover site default para evitar conflitos
if [ -L /etc/nginx/sites-enabled/default ]; then
    echo "🗑️  Removendo site default do Nginx..."
    sudo rm -f /etc/nginx/sites-enabled/default
fi

# 5. Verificar configuração
echo ""
echo "✅ Testando configuração do Nginx..."
sudo nginx -t

# 6. Recarregar nginx
echo ""
echo "🔄 Recarregando Nginx..."
sudo systemctl reload nginx

# 7. Verificar status
echo ""
echo "📊 Status do Nginx:"
sudo systemctl status nginx --no-pager | head -n 10

# 8. Teste final
echo ""
echo "🧪 Teste rápido:"
curl -sSI http://127.0.0.1/ -H "Host: gallery.santhyago.com" | head -n 10

echo ""
echo "================================"
echo "✅ Configuração concluída!"
echo ""
echo "🌐 Acesse: http://gallery.santhyago.com/"
echo ""
echo "📝 Logs:"
echo "   sudo tail -f /var/log/nginx/santhyago-gallery.access.log"
echo "   sudo tail -f /var/log/nginx/santhyago-gallery.error.log"
echo ""

