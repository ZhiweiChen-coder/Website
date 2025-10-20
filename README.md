# 无界青年论坛官网

一个简洁的静态网站，包含中英文双语页面和图片资源。无需构建步骤或后端服务。

## 项目概述
- **技术栈**: 纯 HTML/CSS/JS，无依赖
- **运行方式**: 直接在浏览器中打开任意 `*-en.html` 或 `*-zh.html` 文件
- **推荐**: 使用简单的本地服务器以确保相对路径正确处理

## 项目结构
### 双语页面
- `index-en.html` / `index-zh.html` — 首页
- `about-en.html` / `about-zh.html` — 关于我们
- `services-en.html` / `services-zh.html` — 服务介绍
- `activities-en.html` / `activities-zh.html` — 活动展示
- `team-en.html` / `team-zh.html` — 团队介绍
- `contact-en.html` / `contact-zh.html` — 联系我们

### 资源文件
- `css/style.css` — 样式文件
- `js/main.js` — 交互脚本
- `assets/images/` — 图片资源
  - `team/` — 团队成员照片
  - `events/` — 活动照片
  - `community/` — 社区二维码和社交媒体资源

## 本地预览
可以直接打开 HTML 文件，或使用轻量级 HTTP 服务器来避免浏览器对本地文件的限制。

### Python 3:
```bash
cd "/Users/peter/Desktop/论坛材料/Website"
python3 -m http.server 8000
```
然后访问 `http://localhost:8000/index-en.html` 或 `http://localhost:8000/index-zh.html`

### Node.js (http-server):
```bash
npm install -g http-server
cd "/Users/peter/Desktop/论坛材料/Website"
http-server -p 8000
```

## 部署
由于网站是纯静态的，可以部署到任何静态托管服务：
- GitHub Pages
- Netlify
- Vercel
- 任何静态 Web 服务器 (Nginx/Apache/S3+CloudFront 等)

### GitHub Pages (快速开始)
1. 创建新的 GitHub 仓库并推送此文件夹的内容
2. 在 GitHub 中，转到 Settings → Pages
3. 在 "Branch" 下，选择默认分支（如 `main`）和根目录（`/`）
4. 保存。您的网站将在提供的 GitHub Pages URL 上可用

## 编辑指南
- 保持文件命名一致；页面目前遵循 `*-en.html` 和 `*-zh.html` 模式
- 优化图片以降低加载时间
- 验证 HTML 的可访问性和 SEO（标题、元标签、alt 属性）
- 如果添加 JavaScript 或 CSS，建议使用单独的文件和相对路径

## 功能特性
- 🌐 中英文双语支持
- 📱 响应式设计，适配移动端
- 🎨 现代化 UI 设计，支持轮播图
- ♿ 无障碍访问支持
- 🔍 SEO 优化
- ⚡ 快速加载，无依赖

## 注意事项
- 文件名包含非 ASCII 字符（中文）。确保您的编辑器和主机正确处理 UTF-8 路径
- 如果后续引入需要服务器的路由或导入，请使用上述本地服务器

## 许可证
如果您计划公开分享，请在此添加您首选的许可证（如 MIT）。