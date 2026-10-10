// 墨匠·小说工坊 - 全功能交互逻辑与离线数据驱动
// 包含：多书管理、世界观Lore、人物卡、拓扑关系网、章节码字、AI评论区与提笔续写

(function () {
  // --- 默认种子数据 (参考用户截图：星陨大陆 与 RP Hub 风格) ---
  const DEFAULT_DATA = {
    activeBookId: "book-1",
    apiConfig: {
      baseUrl: "https://api.deepseek.com/v1",
      apiKey: "",
      model: "deepseek-chat",
      commentCount: 5,
      commentLength: "medium",
      commentStyle: "mixed",
      allowReplies: true
    },
    books: [
      {
        id: "book-1",
        title: "星陨大陆",
        tag: "玄幻",
        desc: "灵脉断绝后的引星修仙之路，少年拾荒者的星辰救赎。",
        lastEditTime: "10月10日 22:30",
        lores: [
          {
            id: "lore-1",
            name: "星辉修行体系",
            category: "体系",
            tags: ["核心设定", "力量体系"],
            content: "灵脉断绝后，修士改为引星辉入体。星辉分七阶：微光、萤火、月华、日曜、辰宿、星河、天穹。每突破一阶需在观星台渡一次「星蚀」劫。"
          },
          {
            id: "lore-2",
            name: "观星台遗址群",
            category: "地理",
            tags: ["地图", "遗迹"],
            content: "上古修士留下的九座观星台，按北斗方位分布，是唯一能安全引星辉的场所，也是各方势力争夺的焦点。"
          },
          {
            id: "lore-3",
            name: "司天监",
            category: "势力",
            tags: ["王朝", "组织"],
            content: "流星王朝的官方修士机构，垄断三座观星台。表面监察天象，暗中寻找传说中的「坠星主体」。"
          }
        ],
        characters: [
          {
            id: "char-1",
            name: "陈星阑",
            alias: "拾荒少年",
            color: "#3B6998",
            gender: "男",
            age: "16",
            identity: "边镇拾荒少年 / 天生星瞳",
            power: "天生星瞳可直视星核本质；尚未开始修行。",
            appearance: "瘦小黝黑，左眼瞳孔深处有一点星芒，夜里会微微发亮。",
            story: "父母在星陨之夜失踪，由镇上老更夫抚养长大。"
          },
          {
            id: "char-2",
            name: "大人",
            alias: "监",
            color: "#6D538E",
            gender: "男",
            age: "42",
            identity: "司天监特使 / 执事",
            power: "月华境巅峰星辉术士",
            appearance: "身着墨紫纹鹤朝服，神色阴鸷，常握一把星罗盘。",
            story: "奉命前往边境清查失落星陨核心，怀疑陈星阑的身世。"
          },
          {
            id: "char-3",
            name: "苏挽",
            alias: "挽儿",
            color: "#C25975",
            gender: "女",
            age: "17",
            identity: "观星台守脉人后裔",
            power: "微光境，擅长星纹推演",
            appearance: "素衣胜雪，长发轻挽，气质清冷而温婉。",
            story: "背负家族使命寻找九台合一的关键线索，在废墟中结识陈星阑。"
          },
          {
            id: "char-4",
            name: "老更夫",
            alias: "老吏夫",
            color: "#8C7853",
            gender: "男",
            age: "68",
            identity: "边镇敲更老人 / 隐世修士",
            power: "暗藏日曜境修为",
            appearance: "驼背，手持铜锣与破旧马灯，身上总有淡淡的松脂香。",
            story: "隐姓埋名二十年，只为守护当年星陨坠落在此的婴儿。"
          }
        ],
        relations: [
          { source: "char-1", target: "char-2", label: "亦敌亦友" },
          { source: "char-1", target: "char-3", label: "师尊/红颜" },
          { source: "char-1", target: "char-4", label: "养父" },
          { source: "char-2", target: "char-3", label: "戒备与利用" }
        ],
        outlines: [
          { id: "out-1", title: "第一卷：边镇星起", desc: "引出星陨异象与陈星阑的星瞳身世，老更夫传授基础星图。" },
          { id: "out-2", title: "第二卷：司天监入局", desc: "大人亲临小镇搜寻核心，陈星阑被迫入局周旋。" }
        ],
        chapters: [
          {
            id: "chap-1",
            title: "第1章 废墟里的星光",
            time: "10月10日 21:09",
            body: `更鼓声在寒风里敲了三下。\n\n陈星阑踩着碎瓦，在城北的焦黑废墟里翻找着。天幕漆黑如墨，没有半点云彩，唯有极北方的夜空深处，一抹苍青色的微光如同碎裂的玉石，忽明忽暗。\n\n“星陨之夜留下的铁片，哪怕只有指甲盖大，也能在杂货铺换两口热粥。”少年心里默念着，指尖下意识按了按左眼。\n\n那里微微有些发烫，像是埋着一颗将熄未熄的炭火。`,
            comments: [
              {
                id: "c-1",
                user: "绫小路清隆的能量棒",
                level: "Lv.6",
                isHot: true,
                time: "3小时前",
                ip: "浙江",
                content: "开篇节奏很稳！“更鼓声在寒风里敲了三下”一下子就把清冷荒凉的边镇废墟勾勒出来了。左眼的灼热感也是很经典的宿命伏笔，期待陈星阑第一次觉醒星瞳！"
              },
              {
                id: "c-2",
                user: "夜游神不睡觉",
                level: "Lv.16",
                isHot: false,
                time: "2小时前",
                ip: "江苏",
                content: "老更夫和废墟翻找的细节很抓人。这种末法灵断、只能借星辉残力的世界观很有厚重感，千万别崩战力，保持现在的文笔！"
              }
            ]
          },
          {
            id: "chap-2",
            title: "第2章 入监为质",
            time: "10月10日 22:15",
            body: `司天监的黑底朱雀马车停在镇口时，带起了一阵冰冷的铁锈味。\n\n老更夫将陈星阑拉到门槛后，枯瘦的手掌微不可察地颤了颤。“星阑，低头。无论那位大人问你什么，只说你是打小拾荒的，什么都没看见。”\n\n然而，当车帘掀开，那位面色阴沉如铁的锦衣特使目光扫过来的刹那，陈星阑只觉得左眼的星芒几乎要破眶而出。`,
            comments: [
              {
                id: "c-3",
                user: "智商在线的路人甲",
                level: "Lv.9",
                isHot: true,
                time: "1小时前",
                ip: "广东",
                content: "车帘掀开这一幕张力拉满了！大人明显是冲着星陨主体来的，陈星阑如果隐藏不住星芒，第一卷的大高潮马上就要爆发了！"
              }
            ]
          }
        ]
      }
    ]
  };

  // --- 状态与存储管理 ---
  const STORAGE_KEY = "ink_master_novel_db";
  let state = loadState();

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("读取本地缓存失败，使用默认数据", e);
    }
    return DEFAULT_DATA;
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("保存失败", e);
    }
  }

  function getCurrentBook() {
    return state.books.find(b => b.id === state.activeBookId) || state.books[0];
  }

  // --- 当前编辑章节跟踪 ---
  let currentEditingChapter = null;
  let activeLoreCategory = "all";

  // --- DOM 元素引用 ---
  const topTitle = document.getElementById("topTitle");
  const topSubtitle = document.getElementById("topSubtitle");
  const bookGrid = document.getElementById("bookGrid");
  const shelfSummary = document.getElementById("shelfSummary");
  const loreCardList = document.getElementById("loreCardList");
  const loreFilterTabs = document.getElementById("loreFilterTabs");
  const charCardList = document.getElementById("charCardList");
  const outlineList = document.getElementById("outlineList");
  const timelineList = document.getElementById("timelineList");
  const chapterItemsContainer = document.getElementById("chapterItemsContainer");
  const floatingAddBtn = document.getElementById("floatingAddBtn");
  const floatingAddText = document.getElementById("floatingAddText");

  // 章节写作页
  const chapterListMode = document.getElementById("chapterListMode");
  const chapterEditorMode = document.getElementById("chapterEditorMode");
  const currentEditingChapterTitle = document.getElementById("currentEditingChapterTitle");
  const chapterBodyInput = document.getElementById("chapterBodyInput");
  const commentsContainer = document.getElementById("commentsContainer");
  const reviewCountBadge = document.getElementById("reviewCountBadge");

  // --- 视图切换逻辑 ---
  let currentViewId = "viewChapters"; // 默认进入目录/章节视图
  const navItems = document.querySelectorAll(".nav-item");
  const viewSections = document.querySelectorAll(".view-section");

  navItems.forEach(item => {
    item.addEventListener("click", () => {
      const targetView = item.dataset.view;
      switchView(targetView);
    });
  });

  const btnShelfToggle = document.getElementById("btnShelfToggle");
  if (btnShelfToggle) {
    btnShelfToggle.addEventListener("click", () => {
      switchView("viewBookshelf");
    });
  }

  const topHeaderGroup = document.getElementById("topHeaderGroup");
  if (topHeaderGroup) {
    topHeaderGroup.addEventListener("click", () => {
      switchView("viewBookshelf");
    });
  }

  function switchView(viewId) {
    currentViewId = viewId;
    navItems.forEach(i => i.classList.toggle("active", i.dataset.view === viewId));
    viewSections.forEach(s => s.classList.toggle("active", s.id === viewId));

    // 如果离开了章节页，自动退回章节列表模式
    if (viewId !== "viewChapters") {
      chapterListMode.style.display = "block";
      chapterEditorMode.style.display = "none";
    }

    updateFloatingBtn();
    refreshCurrentView();
  }

  function updateFloatingBtn() {
    const book = getCurrentBook();
    if (!book) {
      floatingAddBtn.style.display = "none";
      return;
    }

    if (currentViewId === "viewSettings") {
      floatingAddBtn.style.display = "flex";
      floatingAddText.textContent = "新增设定";
    } else if (currentViewId === "viewCharacters") {
      floatingAddBtn.style.display = "flex";
      floatingAddText.textContent = "新增人物卡";
    } else if (currentViewId === "viewTimeline") {
      floatingAddBtn.style.display = "flex";
      floatingAddText.textContent = "新增时间节点";
    } else if (currentViewId === "viewOutline") {
      floatingAddBtn.style.display = "flex";
      floatingAddText.textContent = "新增大纲";
    } else if (currentViewId === "viewChapters" && chapterListMode.style.display !== "none") {
      floatingAddBtn.style.display = "flex";
      floatingAddText.textContent = "新建章节";
    } else {
      floatingAddBtn.style.display = "none";
    }
  }

  floatingAddBtn.addEventListener("click", () => {
    if (currentViewId === "viewSettings") {
      openModal("modalLore");
    } else if (currentViewId === "viewCharacters") {
      openModal("modalChar");
    } else if (currentViewId === "viewOutline") {
      const title = prompt("请输入大纲标题：", "第X卷：新篇章");
      if (title) {
        const book = getCurrentBook();
        book.outlines.push({ id: "out-" + Date.now(), title, desc: "大纲详细剧情走向..." });
        saveState();
        renderOutline();
      }
    } else if (currentViewId === "viewChapters") {
      const book = getCurrentBook();
      const num = book.chapters.length + 1;
      const newTitle = `第${num}章 新写一章`;
      const newChap = {
        id: "chap-" + Date.now(),
        title: newTitle,
        time: formatCurrentTime(),
        body: "",
        comments: []
      };
      book.chapters.push(newChap);
      saveState();
      renderChapters();
      openChapterEditor(newChap);
    }
  });

  // --- 全局渲染入口 ---
  function refreshCurrentView() {
    updateTopHeader();
    if (currentViewId === "viewBookshelf") renderBookshelf();
    if (currentViewId === "viewSettings") renderSettings();
    if (currentViewId === "viewCharacters") renderCharacters();
    if (currentViewId === "viewTimeline") renderTimeline();
    if (currentViewId === "viewOutline") renderOutline();
    if (currentViewId === "viewChapters") renderChapters();
  }

  function updateTopHeader() {
    const book = getCurrentBook();
    if (currentViewId === "viewBookshelf") {
      topTitle.innerHTML = "<span>墨匠·小说工坊</span>";
      const totalWords = state.books.reduce((sum, b) => sum + calcBookWords(b), 0);
      topSubtitle.textContent = `共 ${state.books.length} 部作品 · 累计 ${totalWords} 字 · 点击可切换`;
    } else if (book) {
      topTitle.innerHTML = `<span style="font-size: 15px; color: var(--accent); margin-right: 4px;">‹</span> <span>${escapeHtml(book.title)}</span>`;
      topSubtitle.textContent = `${book.tag || "通用"} · ${calcBookWords(book)} 字 · ${book.chapters.length} 章 · 点击返回书架`;
    }
  }

  function calcBookWords(book) {
    if (!book || !book.chapters) return 0;
    return book.chapters.reduce((sum, c) => sum + (c.body ? c.body.replace(/\s+/g, "").length : 0), 0);
  }

  function formatCurrentTime() {
    const now = new Date();
    return `${now.getMonth() + 1}月${now.getDate()}日 ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  }

  // ================= 1. 书架逻辑 =================
  function renderBookshelf() {
    bookGrid.innerHTML = "";
    state.books.forEach((book, idx) => {
      const words = calcBookWords(book);
      const card = document.createElement("div");
      card.className = "book-card";
      card.innerHTML = `
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <div class="book-tag" style="margin-bottom: 0;">${book.tag || "小说"}</div>
            <button class="icon-btn btn-delete-book" data-id="${book.id}" title="删除此作品" style="font-size: 13px; padding: 2px 5px; color: #B35436;">🗑️</button>
          </div>
          <div class="book-title">${escapeHtml(book.title)}</div>
        </div>
        <div>
          <div class="book-meta">${words} 字 · ${book.chapters.length} 章</div>
          <div class="book-time">${book.lastEditTime || "刚刚"}</div>
        </div>
      `;

      // 点击卡片进入作品
      card.addEventListener("click", (e) => {
        if (e.target.closest(".btn-delete-book")) return; // 点击删除按钮时不打开
        state.activeBookId = book.id;
        saveState();
        switchView("viewChapters");
      });

      // 删除单部作品逻辑
      const btnDel = card.querySelector(".btn-delete-book");
      btnDel.addEventListener("click", (e) => {
        e.stopPropagation();
        if (confirm(`确定要删除作品《${book.title}》吗？删除后此书的全部设定和章节都会移除（建议先导出存档备份）`)) {
          deleteBook(book.id);
        }
      });

      bookGrid.appendChild(card);
    });

    // 创建新作卡片
    const addCard = document.createElement("div");
    addCard.className = "add-book-card";
    addCard.innerHTML = `
      <div class="plus-icon">+</div>
      <div class="plus-label">创建新作</div>
    `;
    addCard.addEventListener("click", () => {
      openModal("modalBook");
    });
    bookGrid.appendChild(addCard);
  }

  function deleteBook(bookId) {
    state.books = state.books.filter(b => b.id !== bookId);
    if (state.books.length === 0) {
      state.activeBookId = null;
    } else if (state.activeBookId === bookId) {
      state.activeBookId = state.books[0].id;
    }
    saveState();
    refreshCurrentView();
  }

  // 保存新建作品
  document.getElementById("btnSaveBook").addEventListener("click", () => {
    const title = document.getElementById("bookInputTitle").value.trim();
    if (!title) return alert("请输入书名");
    const tag = document.getElementById("bookInputTag").value.trim() || "玄幻";
    const desc = document.getElementById("bookInputDesc").value.trim();

    const newBook = {
      id: "book-" + Date.now(),
      title,
      tag,
      desc,
      lastEditTime: formatCurrentTime(),
      lores: [],
      characters: [],
      relations: [],
      outlines: [],
      chapters: [
        {
          id: "chap-" + Date.now(),
          title: "第1章 序幕",
          time: formatCurrentTime(),
          body: "",
          comments: []
        }
      ]
    };

    state.books.push(newBook);
    state.activeBookId = newBook.id;
    saveState();
    closeModal("modalBook");
    switchView("viewChapters");
  });

  // ================= 2. 世界观与 Lore 逻辑 =================
  loreFilterTabs.querySelectorAll(".filter-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      loreFilterTabs.querySelectorAll(".filter-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      activeLoreCategory = pill.dataset.cat;
      renderSettings();
    });
  });

  function renderSettings() {
    const book = getCurrentBook();
    if (!book) return;
    loreCardList.innerHTML = "";

    const filtered = (book.lores || []).filter(l => {
      if (activeLoreCategory === "all") return true;
      return l.category === activeLoreCategory;
    });

    if (filtered.length === 0) {
      loreCardList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 40px 0; font-size: 13px;">暂无该分类设定，点击右下角按钮添加</div>`;
      return;
    }

    filtered.forEach(lore => {
      const card = document.createElement("div");
      card.className = "lore-card";
      const badges = (lore.tags || []).map(t => `<span class="lore-badge">${escapeHtml(t)}</span>`).join("");
      card.innerHTML = `
        <div class="lore-header">
          <div class="lore-title">${escapeHtml(lore.name)}</div>
          <span style="font-size: 11px; color: var(--accent); font-weight: 600;">${lore.category}</span>
        </div>
        <div class="lore-badges">${badges}</div>
        <div class="lore-desc">${escapeHtml(lore.content)}</div>
      `;
      loreCardList.appendChild(card);
    });
  }

  // 保存新增设定
  document.getElementById("btnSaveLore").addEventListener("click", () => {
    const book = getCurrentBook();
    const name = document.getElementById("loreInputName").value.trim();
    if (!name) return alert("请输入设定名称");
    const category = document.getElementById("loreInputCategory").value;
    const tagsStr = document.getElementById("loreInputTags").value.trim();
    const content = document.getElementById("loreInputContent").value.trim();
    const tags = tagsStr ? tagsStr.split(/\s+/) : [category];

    book.lores.push({
      id: "lore-" + Date.now(),
      name,
      category,
      tags,
      content
    });

    saveState();
    closeModal("modalLore");
    renderSettings();
  });

  // ================= 3. 人物卡与关系网逻辑 =================
  const btnCharListTab = document.getElementById("btnCharListTab");
  const btnCharGraphTab = document.getElementById("btnCharGraphTab");
  const charListContent = document.getElementById("charListContent");
  const charGraphContent = document.getElementById("charGraphContent");

  btnCharListTab.addEventListener("click", () => {
    btnCharListTab.classList.add("active");
    btnCharGraphTab.classList.remove("active");
    charListContent.style.display = "block";
    charGraphContent.style.display = "none";
  });

  btnCharGraphTab.addEventListener("click", () => {
    btnCharGraphTab.classList.add("active");
    btnCharListTab.classList.remove("active");
    charListContent.style.display = "none";
    charGraphContent.style.display = "block";
    renderRelationGraph();
  });

  function renderCharacters() {
    const book = getCurrentBook();
    if (!book) return;
    charCardList.innerHTML = "";

    (book.characters || []).forEach(ch => {
      const card = document.createElement("div");
      card.className = "char-card";
      const initial = ch.name ? ch.name.slice(0, 1) : "人";
      card.innerHTML = `
        <div class="char-avatar-box" style="background-color: ${ch.color || '#3B6998'};">
          ${initial}
        </div>
        <div class="char-info">
          <div class="char-name-row">
            <span class="char-name">${escapeHtml(ch.name)}</span>
            <span class="char-alias">${escapeHtml(ch.alias || '')}</span>
          </div>
          <div class="char-tags">${escapeHtml(ch.identity || '')} · ${escapeHtml(ch.gender || '')} ${ch.age ? ch.age + '岁' : ''}</div>
          <div class="char-desc">${escapeHtml(ch.power ? '【能力】' + ch.power + ' ' : '')}${escapeHtml(ch.story || ch.appearance || '')}</div>
        </div>
      `;
      charCardList.appendChild(card);
    });

    if (charGraphContent.style.display !== "none") {
      renderRelationGraph();
    }
  }

  // 保存人物卡
  document.getElementById("btnSaveChar").addEventListener("click", () => {
    const book = getCurrentBook();
    const name = document.getElementById("charInputName").value.trim();
    if (!name) return alert("请输入人物姓名");

    const newChar = {
      id: "char-" + Date.now(),
      name,
      color: document.getElementById("charInputColor").value,
      alias: document.getElementById("charInputAlias").value.trim(),
      gender: document.getElementById("charInputGender").value.trim(),
      age: document.getElementById("charInputAge").value.trim(),
      identity: document.getElementById("charInputIdentity").value.trim(),
      power: document.getElementById("charInputPower").value.trim(),
      appearance: document.getElementById("charInputAppearance").value.trim(),
      story: document.getElementById("charInputStory").value.trim()
    };

    book.characters.push(newChar);
    saveState();
    closeModal("modalChar");
    renderCharacters();
  });

  // 关系网 Canvas 渲染 (交互式拓扑图)
  function renderRelationGraph() {
    const book = getCurrentBook();
    const canvas = document.getElementById("relationCanvas");
    if (!canvas || !book) return;

    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const chars = book.characters || [];
    const relations = book.relations || [];

    if (chars.length === 0) {
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.fillStyle = "#A39B92";
      ctx.font = "13px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("暂无人物数据，请先添加角色", rect.width / 2, rect.height / 2);
      return;
    }

    // 围绕中心圆形分布节点
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const radius = Math.min(centerX, centerY) * 0.65;

    const nodePositions = {};
    chars.forEach((c, index) => {
      const angle = (index / chars.length) * 2 * Math.PI - Math.PI / 2;
      nodePositions[c.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        char: c
      };
    });

    ctx.clearRect(0, 0, rect.width, rect.height);

    // 绘制连线与关系标签
    relations.forEach(rel => {
      const p1 = nodePositions[rel.source];
      const p2 = nodePositions[rel.target];
      if (!p1 || !p2) return;

      ctx.beginPath();
      ctx.strokeStyle = "#D4CBBA";
      ctx.lineWidth = 1.8;
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      // 关系标签文字
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.fillRect(midX - 24, midY - 10, 48, 20);

      ctx.fillStyle = "#B35436";
      ctx.font = "11px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(rel.label || "关联", midX, midY);
    });

    // 绘制节点头像圆圈与名称
    chars.forEach(c => {
      const pos = nodePositions[c.id];
      if (!pos) return;

      // 节点底色
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 24, 0, 2 * Math.PI);
      ctx.fillStyle = c.color || "#3B6998";
      ctx.fill();
      ctx.strokeStyle = "#FFF";
      ctx.lineWidth = 3;
      ctx.stroke();

      // 头像文字
      ctx.fillStyle = "#FFF";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText((c.name || "人").slice(0, 1), pos.x, pos.y);

      // 人物名字在圆圈下方
      ctx.fillStyle = "#2D2926";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(c.name || "", pos.x, pos.y + 36);
    });
  }

  // ================= 4. 大纲逻辑 =================
  function renderOutline() {
    const book = getCurrentBook();
    if (!book) return;
    outlineList.innerHTML = "";

    (book.outlines || []).forEach(out => {
      const card = document.createElement("div");
      card.className = "lore-card";
      card.innerHTML = `
        <div class="lore-header">
          <div class="lore-title">${escapeHtml(out.title)}</div>
        </div>
        <div class="lore-desc">${escapeHtml(out.desc)}</div>
      `;
      outlineList.appendChild(card);
    });
  }

  // ================= 4.5 时间线逻辑 =================
  function renderTimeline() {
    const book = getCurrentBook();
    if (!book) return;
    timelineList.innerHTML = "";

    const timelines = book.timelines || [
      { time: "太古历 3000年", event: "天外星陨坠落边陲，灵脉全面断绝，上古修士建立九座观星台。" },
      { time: "大元历 18年", event: "司天监特使奉皇命清查遗落星核，陈星阑出生于星陨之夜。" },
      { time: "当前纪元 (16年后)", event: "陈星阑十六岁，在边镇焦黑废墟拾荒，星瞳初显异象。" }
    ];

    timelines.forEach(item => {
      const card = document.createElement("div");
      card.className = "lore-card";
      card.innerHTML = `
        <div class="lore-header">
          <div class="lore-title" style="color: var(--accent); font-size: 13px;">${escapeHtml(item.time)}</div>
        </div>
        <div class="lore-desc">${escapeHtml(item.event)}</div>
      `;
      timelineList.appendChild(card);
    });
  }

  // ================= 5. 章节与 RP Hub 风格评论区 =================
  function renderChapters() {
    const book = getCurrentBook();
    if (!book) return;
    chapterItemsContainer.innerHTML = "";

    (book.chapters || []).forEach((chap, idx) => {
      const item = document.createElement("div");
      item.className = "chapter-item";
      const wordCount = chap.body ? chap.body.replace(/\s+/g, "").length : 0;
      item.innerHTML = `
        <div>
          <div class="chapter-title">${escapeHtml(chap.title)}</div>
          <div class="chapter-meta">${wordCount} 字 · ${chap.time || ''}</div>
        </div>
        <div style="font-size: 13px; color: var(--accent);">›</div>
      `;
      item.addEventListener("click", () => {
        openChapterEditor(chap);
      });
      chapterItemsContainer.appendChild(item);
    });
  }

  function openChapterEditor(chap) {
    currentEditingChapter = chap;
    chapterListMode.style.display = "none";
    chapterEditorMode.style.display = "block";
    floatingAddBtn.style.display = "none";

    currentEditingChapterTitle.textContent = chap.title;
    chapterBodyInput.value = chap.body || "";
    renderComments(chap.comments || []);
  }

  document.getElementById("btnBackToChapters").addEventListener("click", () => {
    saveCurrentEditingChapter();
    chapterListMode.style.display = "block";
    chapterEditorMode.style.display = "none";
    updateFloatingBtn();
    renderChapters();
    updateTopHeader();
  });

  document.getElementById("btnSaveChapter").addEventListener("click", () => {
    saveCurrentEditingChapter();
    alert("章节已保存！");
  });

  function saveCurrentEditingChapter() {
    if (!currentEditingChapter) return;
    currentEditingChapter.body = chapterBodyInput.value;
    currentEditingChapter.time = formatCurrentTime();
    const book = getCurrentBook();
    if (book) book.lastEditTime = formatCurrentTime();
    saveState();
  }

  function renderComments(comments) {
    commentsContainer.innerHTML = "";
    reviewCountBadge.textContent = comments.length;

    if (comments.length === 0) {
      commentsContainer.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 18px 0; font-size: 12px;">暂无书评，点击上方「AI 生成本章书评」体验</div>`;
      return;
    }

    comments.forEach((c, index) => {
      const item = document.createElement("div");
      const isReply = !!c.replyTo;
      item.className = "comment-item" + (isReply ? " is-reply" : "");
      const firstChar = c.user ? c.user.slice(0, 1) : "友";

      let replyTag = "";
      if (isReply) {
        replyTag = `<span style="font-size: 11px; color: var(--accent); margin-right: 4px;">↳ 回复 @${escapeHtml(c.replyTo)}:</span>`;
      }

      item.innerHTML = `
        <div class="comment-avatar ${isReply ? 'reply-avatar' : ''}">${firstChar}</div>
        <div class="comment-body">
          <div class="comment-user-row">
            <span class="comment-username">${escapeHtml(c.user)}</span>
            <span class="comment-level">${c.level || 'Lv.8'}</span>
            ${c.isHot && !isReply ? '<span class="comment-hot">热评 ' + (index + 1) + 'L</span>' : ''}
          </div>
          <div class="comment-content">${replyTag}${escapeHtml(c.content)}</div>
          <div class="comment-footer">
            <span>${c.time || '刚刚'} · IP属地: ${c.ip || '未知'}</span>
            <span>👍 ${c.likes || Math.floor(Math.random() * 500 + 40)}</span>
          </div>
        </div>
      `;
      commentsContainer.appendChild(item);
    });
  }

  // --- AI 驱动：生成书评 ---
  document.getElementById("btnRefreshComments").addEventListener("click", async () => {
    if (!currentEditingChapter) return;
    const text = chapterBodyInput.value.trim();
    if (!text) return alert("请先在章节输入正文内容，AI 才能阅读并发表书评哦！");

    const btn = document.getElementById("btnRefreshComments");
    const originalText = btn.textContent;
    btn.textContent = "⏳ AI 读者正在热议中...";
    btn.disabled = true;

    try {
      const comments = await callAiForComments(text, currentEditingChapter.title);
      currentEditingChapter.comments = comments;
      saveState();
      renderComments(comments);
    } catch (err) {
      console.error(err);
      alert("AI 书评生成失败: " + err.message);
    } finally {
      btn.textContent = originalText;
      btn.disabled = false;
    }
  });

  // --- AI 驱动：提笔续写 ---
  document.getElementById("btnAiContinue").addEventListener("click", async () => {
    if (!currentEditingChapter) return;
    const curBody = chapterBodyInput.value.trim();
    const promptGuide = document.getElementById("nextPlotPrompt").value.trim();
    const lengthType = document.getElementById("genLengthSelect").value;

    const btn = document.getElementById("btnAiContinue");
    const originalText = btn.innerHTML;
    btn.innerHTML = "<span>墨水研磨中... ✍️</span>";
    btn.disabled = true;

    try {
      const nextContent = await callAiForContinuation(curBody, promptGuide, lengthType);
      chapterBodyInput.value = (curBody ? curBody + "\n\n" : "") + nextContent;
      saveCurrentEditingChapter();
      alert("续写成功！已追加至本章正文。");
    } catch (err) {
      console.error(err);
      alert("续写失败: " + err.message);
    } finally {
      btn.innerHTML = originalText;
      btn.disabled = false;
    }
  });

  // --- API 核心调用封装 (支持 DeepSeek / 硅基流动 / OpenAI 格式) ---
  async function callAiForComments(chapterText, chapterTitle) {
    const cfg = state.apiConfig || {};
    const book = getCurrentBook();

    const count = cfg.commentCount || 5;
    const len = cfg.commentLength || "medium";
    const style = cfg.commentStyle || "mixed";
    const allowReplies = cfg.allowReplies !== false;

    // 如果未配置 API Key，则使用内置的高拟真模拟读者算法（开箱可用）
    if (!cfg.apiKey) {
      return generateMockComments(chapterText, chapterTitle, book, count, len, style, allowReplies);
    }

    const lengthGuides = {
      short: "每条字数约 30-60 字（一针见血、高密度吐槽或赞叹）",
      medium: "每条字数约 80-150 字（深入剖析人物心理、细节伏笔、世界观逻辑）",
      long: "每条字数约 180-280 字（详实长评小作文、长篇论述与剧情推演）"
    };

    const styleGuides = {
      mixed: "评论风格多元：既有分析伏笔的考究党，也有幽默玩梗的吃瓜群众，还有激动尖叫催更的真爱粉。",
      toxic: "评论风格为毒舌考究党：眼光极其犀利挑剔，紧盯战力崩坏、人物降智或逻辑漏洞，言辞辛辣但言之有物。",
      hype: "评论风格为全员厨力狂欢：对角色和剧情极度热情、疯狂吹爆、感叹词连发、情绪极度饱满。",
      meme: "评论风格为贴吧/论坛抽象乐子人：大量运用网络流行梗、生草谐音、迫害调侃主角或反派、氛围轻松欢脱。"
    };

    const replyInstruction = allowReplies 
      ? "【重要互动要求】：生成的书评中，请随机挑选 1 到 2 条作为「楼中楼互动回复」（字段增加 replyTo: \"被回复者的用户名\"，内容针对该读者的观点进行附和、对线或反驳，如：'确实！'、'楼上你想多了吧' 等），模拟真实读者激烈讨论。"
      : "所有书评均为独立主评论，replyTo 字段填 null。";

    const systemPrompt = `你是一个活跃于轻小说/网络文学高端读者社区的读者群（类似起点热评区、刺猬猫间贴、RP Hub 社区）。
请阅读这章小说内容，结合世界观与人物设定，输出真实的章节书评。

【生成要求】：
1. 数量：严格生成 ${count} 条书评。
2. 长度：${lengthGuides[len] || lengthGuides.medium}。
3. 氛围设定：${styleGuides[style] || styleGuides.mixed}。
4. ${replyInstruction}
5. 必须输出合法 JSON 数组，严禁其他解释性文字，结构如下：
[
  { "user": "读者网名", "level": "Lv.11", "isHot": true, "time": "15分钟前", "ip": "浙江", "replyTo": null, "content": "书评内容..." },
  { "user": "对线网友B", "level": "Lv.14", "isHot": false, "time": "12分钟前", "ip": "江苏", "replyTo": "读者网名", "content": "楼上说得对！但是你忽略了一点..." }
]`;

    const userPrompt = `书名：《${book.title}》\n当前章节：${chapterTitle}\n正文片段：\n${chapterText.slice(0, 2200)}`;

    const res = await fetch(`${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model || "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.85
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const reply = data.choices[0].message.content;
    const jsonMatch = reply.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return generateMockComments(chapterText, chapterTitle, book, count, len, style, allowReplies);
  }
        ],
        temperature: 0.8
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    const reply = data.choices[0].message.content;
    const jsonMatch = reply.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return generateMockComments(chapterText, chapterTitle, book);
  }

  async function callAiForContinuation(contextText, userGuidance, lengthType) {
    const cfg = state.apiConfig || {};
    const book = getCurrentBook();

    if (!cfg.apiKey) {
      // 离线/无Key时的智能续写模板
      return `【提示：未配置 API Key，已启用本地预设续写示例】\n夜风掠过长廊，周围的动静戛然而止。黑暗中传来微弱的脚步声，每一步都踏得极稳，仿佛在计算着呼吸的节律。\n\n陈星阑屏住呼吸，悄悄将手中的铁片握得更紧了一分。他知道，今夜之后，整个局势将再无退路。`;
    }

    const wordTargets = { short: 300, medium: 800, long: 1500 };
    const targetWord = wordTargets[lengthType] || 800;

    const loreSummary = (book.lores || []).map(l => `${l.name}：${l.content}`).join("\n");
    const charSummary = (book.characters || []).map(c => `${c.name}（${c.identity}）：${c.power}`).join("\n");

    const systemPrompt = `你是一位才华横溢的网络小说作家。请根据作者给出的设定、前文脉络和剧情走向指导，进行沉浸式续写。
要求：文笔凝练，画面感强，保持人物性格一致，严格把控节奏，字数约 ${targetWord} 字左右。仅输出小说正文。

【世界观设定】：
${loreSummary}

【主要角色】：
${charSummary}`;

    const userPrompt = `【前文】：\n${contextText.slice(-1500)}\n\n【下一章走向指导】：${userGuidance || '顺承前文，制造剧情冲突与悬念'}`;

    const res = await fetch(`${cfg.baseUrl.replace(/\/+$/, '')}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${cfg.apiKey}`
      },
      body: JSON.stringify({
        model: cfg.model || "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.75
      })
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.choices[0].message.content.trim();
  }

  // 本地高拟真读者评论生成器 (支持动态条数、长短、风格及楼中楼互相回复)
  function generateMockComments(text, title, book, count, len, style, allowReplies) {
    const mockUsers = [
      { name: "夜游神不睡觉", level: "Lv.16", ip: "江苏" },
      { name: "智商在线的路人甲", level: "Lv.9", ip: "广东" },
      { name: "绫小路清隆的能量棒", level: "Lv.6", ip: "浙江" },
      { name: "考研人也要看小说", level: "Lv.11", ip: "湖北" },
      { name: "龙园翔的黑皮鞋", level: "Lv.14", ip: "上海" },
      { name: "抱走小天使帆波", level: "Lv.8", ip: "北京" },
      { name: "莫得感情的刷书机器", level: "Lv.15", ip: "四川" },
      { name: "路过的吃瓜群众A", level: "Lv.10", ip: "山东" },
      { name: "实力至上主义学者", level: "Lv.15", ip: "山东" },
      { name: "早睡早起身体好", level: "Lv.7", ip: "河南" },
      { name: "催更狂魔阿强", level: "Lv.12", ip: "陕西" },
      { name: "纯爱战神不请自来", level: "Lv.13", ip: "辽宁" }
    ];

    const targetCount = count || 5;
    const shuffled = [...mockUsers].sort(() => 0.5 - Math.random()).slice(0, targetCount);

    const comments = [];
    let previousUser = null;

    shuffled.forEach((u, i) => {
      // 如果开启互动，并且不是第一条，则有 35% 概率触发楼中楼回复
      const shouldReply = allowReplies && i > 0 && previousUser && (Math.random() < 0.45);

      let content = "";
      if (shouldReply) {
        if (style === "meme") {
          content = `确实！我刚才也想这么吐槽来着，这波操作直接封神！`;
        } else if (style === "toxic") {
          content = `同意！主角如果这时候还不警惕，那前面的高智商设定就崩了。`;
        } else {
          content = `赞同你说的这点！而且原著这里最大的看点就是双方信息差，主角这招简直精准拿捏！`;
        }
      } else {
        if (len === "short") {
          content = style === "meme" 
            ? `哈哈哈哈这章太草了，主角这波操作直接给对面CPU干烧了！`
            : `节奏起飞！结尾这个断章简直是要人命，速速更新！`;
        } else if (len === "long") {
          content = `认真读完《${book ? book.title : '本作'}》这章，细节处理非常耐人寻味。尤其是描写主角动作与心理博弈的那几句，完全不是无脑爽文套路，把两方势力的暗流涌动刻画得入木三分。从前文世界观铺垫来看，这一步棋既破了眼前的死局，又为后面更大的冲突埋下了线索，笔力相当扎实，期待下一卷展开！`;
        } else {
          content = `“${title}”这一章的氛围感渲染得极好！黄昏、冷暖对比和压抑的对峙感把博弈张力拉满了。感觉主角这一招不是单纯为了破局，而是想直接把对方阵营拉下水，作者文笔真有味道！`;
        }
      }

      const commentObj = {
        id: "mc-" + Date.now() + "-" + i,
        user: u.name,
        level: u.level,
        isHot: i === 0 && !shouldReply,
        time: `${(i + 1) * 3}分钟前`,
        ip: u.ip,
        replyTo: shouldReply ? previousUser : null,
        likes: Math.floor(Math.random() * 400 + (shouldReply ? 30 : 120)),
        content: content
      };

      if (!shouldReply) {
        previousUser = u.name;
      }
      comments.push(commentObj);
    });

    return comments;
  }

  // ================= 6. 导入整本小说 TXT (正则拆章) =================
  const btnImportTxt = document.getElementById("btnImportTxt");
  const txtFileInput = document.getElementById("txtFileInput");

  btnImportTxt.addEventListener("click", () => {
    txtFileInput.click();
  });

  txtFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const fullText = event.target.result;
      const fileName = file.name.replace(/\.[^/.]+$/, "");
      importNovelFromText(fileName, fullText);
    };
    reader.readAsText(file, "utf-8");
  });

  function importNovelFromText(bookTitle, text) {
    // 智能章节切分正则：匹配 "第X章" 或 "第X回" 或 "Chapter X"
    const chapterRegex = /(?:^|\n)\s*(第[0-9一二三四五六七八九十百千万]+[章回卷节部篇][^\n]*)/g;
    const matches = [...text.matchAll(chapterRegex)];

    const chapters = [];
    if (matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        const title = matches[i][1].trim();
        const start = matches[i].index + matches[i][0].length;
        const end = (i + 1 < matches.length) ? matches[i + 1].index : text.length;
        const body = text.slice(start, end).trim();

        chapters.push({
          id: "chap-" + Date.now() + "-" + i,
          title,
          time: formatCurrentTime(),
          body,
          comments: []
        });
      }
    } else {
      // 没匹配到标准章节则整合成第一章
      chapters.push({
        id: "chap-" + Date.now(),
        title: "第1章 全文导入",
        time: formatCurrentTime(),
        body: text.trim(),
        comments: []
      });
    }

    const newBook = {
      id: "book-" + Date.now(),
      title: bookTitle || "导入小说",
      tag: "导入书籍",
      desc: `从本地 TXT 导入，共 ${chapters.length} 章。`,
      lastEditTime: formatCurrentTime(),
      lores: [],
      characters: [],
      relations: [],
      outlines: [],
      chapters
    };

    state.books.push(newBook);
    state.activeBookId = newBook.id;
    saveState();
    alert(`成功导入《${newBook.title}》，已自动拆分 ${chapters.length} 个章节！`);
    switchView("viewChapters");
  }

  // 导出整本 TXT
  document.getElementById("btnExportBookTxt").addEventListener("click", () => {
    const book = getCurrentBook();
    if (!book) return;

    let content = `《${book.title}》\n\n`;
    (book.chapters || []).forEach(c => {
      content += `\n\n${c.title}\n\n${c.body || ''}\n`;
    });

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // 导出/备份所有书籍与设定 (JSON)
  document.getElementById("btnExport").addEventListener("click", () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `墨匠小说工坊_全量备份_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // ================= 7. API 与 AI 书评设置弹窗 =================
  document.getElementById("btnSettings").addEventListener("click", () => {
    const cfg = state.apiConfig || {};
    document.getElementById("apiBaseUrl").value = cfg.baseUrl || "https://api.deepseek.com/v1";
    document.getElementById("apiKey").value = cfg.apiKey || "";
    document.getElementById("apiModel").value = cfg.model || "deepseek-chat";
    document.getElementById("settingCommentCount").value = String(cfg.commentCount || 5);
    document.getElementById("settingCommentLength").value = cfg.commentLength || "medium";
    document.getElementById("settingCommentStyle").value = cfg.commentStyle || "mixed";
    document.getElementById("settingAllowReplies").checked = cfg.allowReplies !== false;
    openModal("modalSettings");
  });

  document.getElementById("btnSaveSettings").addEventListener("click", () => {
    state.apiConfig = {
      baseUrl: document.getElementById("apiBaseUrl").value.trim() || "https://api.deepseek.com/v1",
      apiKey: document.getElementById("apiKey").value.trim(),
      model: document.getElementById("apiModel").value.trim() || "deepseek-chat",
      commentCount: parseInt(document.getElementById("settingCommentCount").value, 10) || 5,
      commentLength: document.getElementById("settingCommentLength").value || "medium",
      commentStyle: document.getElementById("settingCommentStyle").value || "mixed",
      allowReplies: document.getElementById("settingAllowReplies").checked
    };
    saveState();
    closeModal("modalSettings");
    alert("AI 接口与书评偏好设置已保存！");
  });

  // ================= 8. 存档中心 (导入、导出与全量备份) =================
  const btnArchiveCenter = document.getElementById("btnArchiveCenter");
  const archiveFileInput = document.getElementById("archiveFileInput");

  if (btnArchiveCenter) {
    btnArchiveCenter.addEventListener("click", () => {
      openModal("modalArchive");
    });
  }

  // 导出全量存档
  document.getElementById("btnExportFullArchive").addEventListener("click", () => {
    const jsonStr = JSON.stringify(state, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `墨匠工坊_全量存档备份_${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);
    alert("全量存档已成功导出！请妥善保存此文件。");
  });

  // 触发导入存档选择
  document.getElementById("btnImportArchiveTrigger").addEventListener("click", () => {
    archiveFileInput.click();
  });

  // 处理导入存档
  archiveFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        if (!importedData.books || !Array.isArray(importedData.books)) {
          throw new Error("存档格式不正确：缺少有效书籍列表");
        }

        if (confirm(`即将导入存档（包含 ${importedData.books.length} 部作品），是否确认覆盖当前本地数据并恢复？`)) {
          state = importedData;
          saveState();
          closeModal("modalArchive");
          refreshCurrentView();
          alert("存档恢复成功！");
        }
      } catch (err) {
        alert("导入失败：无法解析该存档文件（" + err.message + "）");
      }
    };
    reader.readAsText(file, "utf-8");
  });

  // 一键重置清空为完全空白书架
  document.getElementById("btnResetToBlank").addEventListener("click", () => {
    if (confirm("确定要清空所有数据吗？这将会删除现有的示例小说（如星陨大陆）并重置为一个完全空白的书架！请确保已导出了重要备份。")) {
      state = {
        activeBookId: null,
        apiConfig: state.apiConfig || {
          baseUrl: "https://api.deepseek.com/v1",
          apiKey: "",
          model: "deepseek-chat",
          commentCount: 5,
          commentLength: "medium",
          commentStyle: "mixed",
          allowReplies: true
        },
        books: []
      };
      saveState();
      closeModal("modalArchive");
      refreshCurrentView();
      switchView("viewBookshelf");
      alert("已重置为空白工坊！现在你可以尽情创建或导入属于你自己的小说啦！");
    }
  });

  // ================= 工具函数 =================
  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("active");
  };

  window.switchView = switchView;

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  // --- 初始化运行 ---
  refreshCurrentView();

})();
