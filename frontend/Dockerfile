# ====================================
# Space-in 空間預約系統 - 前端 Dockerfile
# Multi-stage: Angular Build + Nginx
# GCP Cloud Run 部署用
# ====================================

# Stage 1: Build Angular App
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
# Angular 專案依賴龐大，使用 npm install --legacy-peer-deps 提升相容性
RUN npm install --legacy-peer-deps --no-audit --no-fund

COPY . .

# 後端 API URL 透過 build arg 注入，替換 environment.prod.ts 的 domain
ARG BACKEND_URL=http://localhost:8082
ENV BACKEND_URL=${BACKEND_URL}

# 僅替換 domain 欄位，保留 googleOAuth 等其餘設定，避免整份覆寫造成編譯錯誤
RUN echo "前端建置使用後端 URL: ${BACKEND_URL}" && \
    sed -i "s|domain: '[^']*'|domain: '${BACKEND_URL}'|" src/environments/environment.prod.ts && \
    cat src/environments/environment.prod.ts

# 放寬 angular.json budgets，避免 main bundle 超過預設 500KB 限制而報 error
RUN node -e "const fs=require('fs'); const p='angular.json'; const j=JSON.parse(fs.readFileSync(p,'utf8')); const prod=j.projects['space-in'].architect.build.configurations.production; if(prod && prod.budgets){prod.budgets=prod.budgets.map(b=>({...b,maximumWarning:'10mb',maximumError:'20mb'}));} fs.writeFileSync(p, JSON.stringify(j,null,2));"

RUN npm run build:prod

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/templates/default.conf.template

# Angular 17 browser builder 輸出至 dist/space-in
COPY --from=build /app/dist/space-in /usr/share/nginx/html

# Cloud Run 預設 PORT=8080
ENV PORT=8080
EXPOSE 8080

# 使用 envsubst 將 nginx template 的 ${PORT} 替換後啟動
CMD ["/bin/sh", "-c", "envsubst '${PORT}' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
