# 🚀 Guia de Deploy - Santhyago Gallery

## Primeira Configuração (apenas uma vez)

### 1. No Servidor (SSH)

Envie o script de configuração para o servidor e execute:

```bash
# Do seu PC, envie o script
scp configure-nginx.sh ubuntu@51.38.190.127:~/

# Entre no servidor
ssh ubuntu@51.38.190.127

# Execute o script de configuração
bash configure-nginx.sh
```

O script irá:
- Criar o diretório `/var/www/santhyago-gallery`
- Configurar o virtual host do Nginx para escutar em `51.38.190.127:80`
- Remover o site default que está mostrando a página do Nginx
- Testar e recarregar o Nginx

## Deploy Regular (sempre que atualizar o código)

### Do seu PC (local):

```bash
# Opção 1: Usar o script npm
npm run deploy

# Opção 2: Usar o script bash diretamente
bash deploy.sh
```

O script irá automaticamente:
1. ✅ Fazer o build da aplicação
2. ✅ Enviar os arquivos para o servidor via rsync
3. ✅ Instalar no diretório correto com permissões adequadas
4. ✅ Recarregar o Nginx

## Verificação

Após o deploy, teste:

```bash
# Do seu PC
curl -I http://51.38.190.127/

# Deve mostrar:
# HTTP/1.1 200 OK
# X-Site: santhyago-gallery
```

Ou abra no navegador: **http://51.38.190.127/**

## Troubleshooting

### 1. Ainda aparece a página default do Nginx?

Execute no servidor:
```bash
# Ver qual site está respondendo
sudo nginx -T | grep "listen.*80"

# Remover site default se ainda existir
sudo rm -f /etc/nginx/sites-enabled/default
sudo systemctl reload nginx
```

### 2. Verificar logs do Nginx

```bash
# No servidor
sudo tail -f /var/log/nginx/santhyago-gallery.access.log
sudo tail -f /var/log/nginx/santhyago-gallery.error.log
```

### 3. Permissões incorretas

```bash
# No servidor
sudo chown -R www-data:www-data /var/www/santhyago-gallery
sudo chmod -R 755 /var/www/santhyago-gallery
```

### 4. Testar configuração do Nginx

```bash
# No servidor
sudo nginx -t
sudo systemctl status nginx
```

## Deploy Manual (alternativa)

Se preferir fazer manualmente:

```bash
# 1. Build local
npm run build

# 2. Enviar para o servidor
rsync -avz --delete dist/ ubuntu@51.38.190.127:~/dist-temp/

# 3. No servidor
ssh ubuntu@51.38.190.127
sudo rsync -a --delete ~/dist-temp/ /var/www/santhyago-gallery/
sudo chown -R www-data:www-data /var/www/santhyago-gallery
sudo systemctl reload nginx
rm -rf ~/dist-temp
```

## Estrutura no Servidor

```
/var/www/santhyago-gallery/
├── index.html          # Entry point da SPA
├── logo.png
├── assets/
│   ├── index-*.js      # JavaScript bundle
│   ├── index-*.css     # CSS bundle
│   └── index-*.js.map  # Source maps
└── images/             # Galeria de imagens
    ├── 1.jpg
    ├── 1_1.jpg
    └── ...
```

## URLs

- **Produção**: http://51.38.190.127/
- **IP antigo (santhyago)**: http://51.38.190.126/

## Notas Importantes

- ✅ O IP `51.38.190.127` está configurado para servir **apenas** santhyago-gallery
- ✅ O site é uma SPA React, então usa fallback para `/index.html`
- ✅ Assets estáticos têm cache de 30 dias
- ✅ O `index.html` não tem cache (sempre busca a versão mais recente)
- ✅ Source maps estão incluídos para debug

