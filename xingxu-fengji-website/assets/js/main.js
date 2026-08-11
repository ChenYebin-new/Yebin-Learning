const products = {
  centrifugal: { name: '离心风机', scene: '厂房通风 · 除尘送风', summary: '适用于需要稳定送、排风的工业通风场景，可作为厂房通风与系统配套设备的展示方向。', features: ['适用于厂房、车间等常规通风需求', '可结合实际空间与通风目标进行选型沟通', '具体型号、风量与性能参数待企业资料确认'], image: 'assets/images/centrifugal-gallery-1.jpg', imageAlt: '星旭风机离心式风机整机实拍', gallery: [
    { src: 'assets/images/centrifugal-gallery-1.jpg', alt: '星旭风机离心式风机整机实拍' },
    { src: 'assets/images/centrifugal-gallery-2.jpg', alt: '星旭风机离心式风机组合设备实拍' },
    { src: 'assets/images/centrifugal-gallery-3.jpg', alt: '星旭风机离心式风机进风口近景实拍' },
    { src: 'assets/images/centrifugal-gallery-4.jpg', alt: '星旭风机大型离心式风机实拍' },
    { src: 'assets/images/centrifugal-gallery-5.jpg', alt: '星旭风机标准离心式风机实拍' },
    { src: 'assets/images/centrifugal-gallery-6.jpg', alt: '星旭风机蓝色离心式风机实拍' }
  ] },
  axial: { name: '轴流风机', scene: '车间送排风 · 局部通风', summary: '适用于空间送排风和局部通风需求，是工业场景中常见的通风设备方向。', features: ['适用于车间、仓储及局部通风场景', '便于围绕实际安装环境沟通产品方向', '具体型号、安装方式与参数待企业资料确认'] },
  smoke: { name: '排烟风机', scene: '排烟通风 · 应急排风', summary: '面向排烟与应急排风等应用场景，具体产品配置需根据实际项目需求确认。', features: ['适用于排烟、应急排风等使用场景', '可先沟通项目环境与基本通风需求', '实际产品规格与适用条件待企业资料确认'] },
  dust: { name: '除尘风机', scene: '除尘净化 · 工艺排风', summary: '用于除尘净化及工艺排风等方向，帮助客户从实际生产环境出发了解设备需求。', features: ['适用于除尘净化及工艺排风方向', '可结合粉尘、管路与空间情况沟通选型', '具体使用条件与性能参数待企业资料确认'] }
};

const cardsByType = [
  ['centrifugal', '离心风机', '稳定送排风，适配厂房通风与系统配套需求。'],
  ['axial', '轴流风机', '适用于车间送排风与常规局部通风场景。'],
  ['smoke', '排烟风机', '面向排烟与应急排风等应用方向。'],
  ['dust', '除尘风机', '服务于除尘净化与工艺排风需求。']
];
const cardsByScene = [
  ['centrifugal', '厂房通风', '围绕厂房空间与稳定送排风需求选择产品方向。'],
  ['dust', '除尘净化', '针对除尘与工艺排风需求沟通设备方案。'],
  ['smoke', '排烟通风', '用于排烟及应急排风等场景的产品方向。'],
  ['axial', '车间送排风', '服务车间与局部区域的日常通风需求。']
];

function renderProducts(mode = 'type') {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;
  const list = mode === 'scene' ? cardsByScene : cardsByType;
  grid.innerHTML = list.map(([key, title, desc], index) => { const image = products[key].image ? `<img class="card-photo" src="${products[key].image}" alt="${products[key].imageAlt}">` : ''; const note = image ? '离心式风机实拍' : '产品实拍待补充'; return `<article class="product-card"><div class="card-visual">${image}<span>${String(index + 1).padStart(2, '0')}</span><small>${note}</small></div><div class="product-card-body"><p>${mode === 'scene' ? '应用场景' : '风机类型'}</p><h3>${title}</h3><span class="line"></span><p class="description">${desc}</p><a href="product.html?product=${key}">查看详情 <b>→</b></a></div></article>`; }).join('');
}

function initProductPage() {
  const name = document.querySelector('[data-product-name]');
  if (!name) return;
  const key = new URLSearchParams(window.location.search).get('product');
  const product = products[key] || products.centrifugal;
  document.title = `${product.name}｜星旭风机`;
  document.querySelectorAll('[data-product-name]').forEach(el => el.textContent = product.name);
  document.querySelector('[data-product-scene]').textContent = product.scene;
  document.querySelector('[data-product-summary]').textContent = product.summary;
  document.querySelector('[data-product-features]').innerHTML = product.features.map(item => `<li>${item}</li>`).join('');
  const imageSlot = document.querySelector('[data-product-image]');
  if (!imageSlot) return;
  if (!product.gallery) {
    imageSlot.innerHTML = product.image ? `<img class="product-photo" src="${product.image}" alt="${product.imageAlt}">` : `<div class="placeholder-photo"><span class="photo-icon">◎</span><strong>${product.name}实拍</strong><small>产品图片待补充</small></div>`;
    return;
  }
  let galleryIndex = 0;
  const gallery = product.gallery;
  imageSlot.innerHTML = `<button class="product-gallery" type="button" data-product-gallery aria-label="查看下一张离心风机图片"><span class="product-gallery-next"><img class="product-photo" src="${gallery[1].src}" alt=""></span><span class="product-gallery-main"><img class="product-photo" src="${gallery[0].src}" alt="${gallery[0].alt}"></span><span class="gallery-count" aria-live="polite">1 / ${gallery.length}</span><span class="gallery-next">点击查看下一张 <b>→</b></span></button>`;
  const galleryButton = imageSlot.querySelector('[data-product-gallery]');
  const galleryImage = galleryButton.querySelector('.product-gallery-main img');
  const nextLayer = galleryButton.querySelector('.product-gallery-next');
  const nextImage = nextLayer.querySelector('img');
  const galleryCount = galleryButton.querySelector('.gallery-count');
  let isTransitioning = false;
  galleryButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    nextLayer.classList.add('is-rising');
    nextLayer.addEventListener('animationend', () => {
      galleryIndex = (galleryIndex + 1) % gallery.length;
      const currentImage = gallery[galleryIndex];
      const followingImage = gallery[(galleryIndex + 1) % gallery.length];
      galleryImage.src = currentImage.src;
      galleryImage.alt = currentImage.alt;
      nextImage.src = followingImage.src;
      galleryCount.textContent = `${galleryIndex + 1} / ${gallery.length}`;
      nextLayer.classList.remove('is-rising');
      isTransitioning = false;
    }, { once: true });
  });
}

function initWechatModal() {
  const modal = document.querySelector('[data-wechat-modal]');
  if (!modal) return;
  const open = () => { modal.hidden = false; document.body.classList.add('modal-open'); modal.querySelector('.modal-close').focus(); };
  const close = () => { modal.hidden = true; document.body.classList.remove('modal-open'); };
  document.querySelectorAll('[data-wechat-open]').forEach(button => button.addEventListener('click', open));
  modal.querySelectorAll('[data-wechat-close]').forEach(button => button.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) close(); });
}

function initHeroGallery() {
  const galleryButton = document.querySelector('[data-hero-gallery]');
  if (!galleryButton) return;
  const gallery = [
    { src: 'assets/images/storefront-gallery-1.jpg', alt: '星旭风机门店实景与店铺门头' },
    { src: 'assets/images/storefront-gallery-2.jpg', alt: '星旭风机店内设备与货品陈列实拍' },
    { src: 'assets/images/storefront-gallery-3.jpg', alt: '星旭风机店内面向门口的设备陈列实拍' }
  ];
  const mainImage = galleryButton.querySelector('.hero-gallery-main img');
  const nextLayer = galleryButton.querySelector('.hero-gallery-next');
  const nextImage = nextLayer.querySelector('img');
  const caption = galleryButton.querySelector('[data-hero-gallery-caption]');
  let currentIndex = 0;
  let isTransitioning = false;
  const render = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    mainImage.src = gallery[currentIndex].src;
    mainImage.alt = gallery[currentIndex].alt;
    nextImage.src = gallery[nextIndex].src;
    caption.textContent = `门店实拍 · ${currentIndex + 1} / ${gallery.length}`;
    galleryButton.setAttribute('aria-label', `查看下一张星旭风机门店实拍，当前第 ${currentIndex + 1} 张，共 ${gallery.length} 张`);
  };
  galleryButton.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    nextLayer.classList.add('is-rising');
    nextLayer.addEventListener('animationend', () => {
      currentIndex = (currentIndex + 1) % gallery.length;
      render();
      nextLayer.classList.remove('is-rising');
      isTransitioning = false;
    }, { once: true });
  });
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(); initProductPage(); initWechatModal(); initHeroGallery();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector('[data-menu-toggle]'); const nav = document.querySelector('[data-nav]');
  if (toggle && nav) { toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!expanded)); nav.classList.toggle('open', !expanded); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); })); }
  document.querySelectorAll('[data-filter-mode]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter-mode]').forEach(item => item.classList.toggle('active', item === button)); renderProducts(button.dataset.filterMode); }));
});
