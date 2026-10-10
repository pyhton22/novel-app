# 墨匠·小说工坊 (Ink Master Novel Workshop)
## 手机端 APK 打包与快速体验指南

本应用是专为小说创作、OC 设定管理、世界观构建打造的极简风移动端工作台，已完整复刻「墨匠工坊」与「RP Hub 评论区 & 提笔续写」功能。

---

### 🌟 核心特性速览
1. **多部作品书库**：支持自由创建不同小说（玄幻、科幻、同人等），随时切换作品。
2. **整本小说导入**：支持导入本地 TXT，智能正则按「第X章」拆分章节并统计字数。
3. **世界观设定 (Lore)**：地理、势力、体系、物品、种族分类筛选，支持二级标签检索。
4. **OC 人物卡 & 拓扑关系网**：
   - 包含姓名、称号、代表色、能力/武功、外貌描写与背景故事。
   - 交互式星阵关系网图谱（直观展示宿敌、同盟、师徒等羁绊连线）。
5. **仿 RP Hub 沉浸式评论区**：
   - 章节尾部附带 AI 读者热评（支持接入任意 OpenAI/DeepSeek 兼容 API，没配 Key 时也自带拟真本地算法，开箱即玩）。
6. **提笔续写**：
   - 输入剧情走向引导，选择单章字数与篇幅，一键驱动 AI 续写。

---

### 📱 方案一：手机端即开即用（秒变全屏独立 App，体验与 APK 一致）
1. 将 `novel-workshop-app` 文件夹上传到你的手机，或用任意局域网工具传输。
2. 用手机浏览器打开 `index.html`。
3. 点击浏览器菜单 -> **「添加到主屏幕」**。
4. 手机桌面上会立刻生成一个带有墨色图标的独立 App，点击即全屏启动（无地址栏、无底栏干扰），数据完全保存在手机本地离线环境，不费流量！

---

### 📦 方案二：生成真·Android APK 安装包

如果你需要真正的 `.apk` 安装文件，可以通过以下两种方式打包：

#### 方法 A：使用 GitHub Actions 免搭建环境在线自动打包（最推荐、零环境要求）
1. 在 GitHub 上新建一个仓库。
2. 将 `novel-workshop-app` 目录内的代码推送到仓库。
3. 添加 GitHub Action 配置文件 `.github/workflows/build-apk.yml`（基于 Capacitor 或 Cordova）。
4. GitHub 会自动为你云端编译出 `app-release.apk`，在 Releases 或 Actions 产物中直接扫码或下载到手机即可安装！

#### 方法 B：使用电脑本地 Capacitor / Cordova 命令行打包
若电脑已安装 Node 与 Android Studio：
```bash
# 1. 进入目录并初始化 Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init "墨匠工坊" "com.inkmaster.novel" --web-dir "."

# 2. 添加 Android 工程
npx cap add android

# 3. 构建并输出 APK
npx cap build android
```
随后用 Android Studio 打开 `android` 目录，点击 `Build -> Build Bundle(s) / APK(s) -> Build APK(s)`，即可得到 `.apk` 安装包文件！
