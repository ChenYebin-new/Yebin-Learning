const products = {
  centrifugal: {
    name: '离心风机', scene: '厂房通风 · 除尘送风', summary: '适用于需要稳定送、排风的工业通风场景，可作为厂房通风与系统配套设备的展示方向。',
    features: ['适用于厂房、车间等常规通风需求', '可结合实际空间与通风目标进行选型沟通', '具体型号、风量与性能参数待企业资料确认'],
    cardImage: 'assets/images/optimized/cards/centrifugal-card-v2.webp', imageAlt: '星旭风机离心式风机整机实拍',
    gallery: [
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-1-v2.webp', alt: '星旭风机离心式风机整机实拍' },
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-2-v2.webp', alt: '星旭风机离心式风机组合设备实拍' },
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-3-v2.webp', alt: '星旭风机离心式风机进风口近景实拍' },
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-4-v2.webp', alt: '星旭风机大型离心式风机实拍' },
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-5-v2.webp', alt: '星旭风机标准离心式风机实拍' },
      { src: 'assets/images/optimized/galleries/centrifugal/centrifugal-gallery-6-v2.webp', alt: '星旭风机蓝色离心式风机实拍' }
    ]
  },
  axial: {
    name: '轴流风机', scene: '车间送排风 · 局部通风', summary: '适用于空间送排风和局部通风需求，是工业场景中常见的通风设备方向。',
    features: ['适用于车间、仓储及局部通风场景', '便于围绕实际安装环境沟通产品方向', '具体型号、安装方式与参数待企业资料确认'],
    cardImage: 'assets/images/optimized/cards/axial-card-v2.webp', imageAlt: '星旭风机轴流风机实拍',
    gallery: [
      { src: 'assets/images/optimized/galleries/axial/axial-gallery-1-v2.webp', alt: '星旭风机轴流风机实拍一' },
      { src: 'assets/images/optimized/galleries/axial/axial-gallery-2-v2.webp', alt: '星旭风机轴流风机实拍二' },
      { src: 'assets/images/optimized/galleries/axial/axial-gallery-3-v2.webp', alt: '星旭风机轴流风机实拍三' },
      { src: 'assets/images/optimized/galleries/axial/axial-gallery-4-v2.webp', alt: '星旭风机轴流风机实拍四' },
      { src: 'assets/images/optimized/galleries/axial/axial-gallery-5-v2.webp', alt: '星旭风机轴流风机实拍五' }
    ]
  },
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

function watchImage(image, container, onReady) {
  let handled = false;
  const ready = () => {
    if (handled) return;
    handled = true;
    image.classList.add('is-loaded');
    container?.classList.remove('has-image-error');
    onReady?.();
  };
  const failed = () => {
    if (handled) return;
    handled = true;
    container?.classList.add('has-image-error');
  };
  image.addEventListener('load', ready, { once: true });
  image.addEventListener('error', failed, { once: true });
  if (image.complete) (image.naturalWidth ? ready : failed)();
}

function preloadImage(source, className) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => { image.className = `${className} is-loaded`; resolve(image); };
    image.onerror = reject;
    image.src = source;
  });
}

function renderProducts(mode = 'type') {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;
  const list = mode === 'scene' ? cardsByScene : cardsByType;
  grid.innerHTML = list.map(([key, title, desc], index) => {
    const product = products[key];
    const image = product.cardImage ? `<img class="card-photo" src="${product.cardImage}" alt="${product.imageAlt}" width="800" height="800" loading="lazy" decoding="async">` : '';
    const note = product.cardImage ? `${product.name}实拍` : '产品实拍待补充';
    return `<article class="product-card"><a class="product-card-link" href="product.html?product=${key}" aria-label="查看${title}详情"><div class="card-visual">${image}<span>${String(index + 1).padStart(2, '0')}</span><small>${note}</small></div><div class="product-card-body"><p>${mode === 'scene' ? '应用场景' : '风机类型'}</p><h3>${title}</h3><span class="line"></span><p class="description">${desc}</p><span class="product-card-cta">查看详情 <b>→</b></span></div></a></article>`;
  }).join('');
  grid.querySelectorAll('.card-photo').forEach(image => watchImage(image, image.closest('.card-visual')));
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
    imageSlot.innerHTML = '<div class="placeholder-photo"><span class="photo-icon">◈</span><strong>产品实拍</strong><small>产品图片待补充</small></div>';
    return;
  }

  let galleryIndex = 0;
  let nextReady = false;
  let isTransitioning = false;
  const gallery = product.gallery;
  imageSlot.innerHTML = `<button class="product-gallery" type="button" data-product-gallery aria-label="查看下一张${product.name}图片" aria-busy="true"><span class="product-gallery-next"></span><span class="product-gallery-main"><img class="product-photo" src="${gallery[0].src}" alt="${gallery[0].alt}" fetchpriority="high" decoding="async"></span><span class="gallery-count" aria-live="polite">1 / ${gallery.length}</span><span class="gallery-next"><span data-gallery-next-label>图片加载中</span><b>→</b></span></button>`;
  const galleryButton = imageSlot.querySelector('[data-product-gallery]');
  const mainLayer = galleryButton.querySelector('.product-gallery-main');
  const nextLayer = galleryButton.querySelector('.product-gallery-next');
  const galleryCount = galleryButton.querySelector('.gallery-count');
  const nextLabel = galleryButton.querySelector('[data-gallery-next-label]');
  let galleryImage = mainLayer.querySelector('img');

  const queueNext = () => {
    const nextIndex = (galleryIndex + 1) % gallery.length;
    nextReady = false;
    galleryButton.setAttribute('aria-busy', 'true');
    nextLabel.textContent = '图片加载中';
    nextLayer.classList.remove('is-ready', 'has-image-error');
    nextLayer.replaceChildren();
    preloadImage(gallery[nextIndex].src, 'product-photo').then(image => {
      image.alt = '';
      nextLayer.append(image);
      nextLayer.classList.add('is-ready');
      nextReady = true;
      galleryButton.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '点击查看下一张';
    }).catch(() => {
      nextLayer.classList.add('has-image-error');
      galleryButton.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '图片加载失败';
    });
  };

  watchImage(galleryImage, mainLayer, queueNext);
  galleryButton.addEventListener('click', () => {
    if (isTransitioning) return;
    if (!nextReady) { nextLabel.textContent = '图片加载中'; return; }
    isTransitioning = true;
    nextLayer.classList.add('is-rising');
    nextLayer.addEventListener('animationend', () => {
      galleryIndex = (galleryIndex + 1) % gallery.length;
      const currentImage = gallery[galleryIndex];
      const promotedImage = nextLayer.querySelector('img');
      promotedImage.alt = currentImage.alt;
      mainLayer.replaceChildren(promotedImage);
      galleryImage = promotedImage;
      galleryCount.textContent = `${galleryIndex + 1} / ${gallery.length}`;
      nextLayer.classList.remove('is-rising');
      queueNext();
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
    { src: 'assets/images/optimized/hero/storefront-gallery-1-v2.webp', alt: '星旭风机门店实景与店铺门头' },
    { src: 'assets/images/optimized/hero/storefront-gallery-2-v2.webp', alt: '星旭风机店内设备与货品陈列实拍' },
    { src: 'assets/images/optimized/hero/storefront-gallery-3-v2.webp', alt: '星旭风机店内面向门口的设备陈列实拍' }
  ];
  let currentIndex = 0;
  let nextReady = false;
  let isTransitioning = false;
  const mainLayer = galleryButton.querySelector('.hero-gallery-main');
  const nextLayer = galleryButton.querySelector('.hero-gallery-next');
  const caption = galleryButton.querySelector('[data-hero-gallery-caption]');
  const nextLabel = galleryButton.querySelector('[data-hero-gallery-next-label]');
  let mainImage = mainLayer.querySelector('img');

  const updateText = () => {
    caption.textContent = `门店实拍 · ${currentIndex + 1} / ${gallery.length}`;
    galleryButton.setAttribute('aria-label', `查看下一张星旭风机门店实拍，当前第 ${currentIndex + 1} 张，共 ${gallery.length} 张`);
  };
  const queueNext = () => {
    const nextIndex = (currentIndex + 1) % gallery.length;
    nextReady = false;
    galleryButton.setAttribute('aria-busy', 'true');
    nextLabel.textContent = '图片加载中';
    nextLayer.classList.remove('is-ready', 'has-image-error');
    nextLayer.replaceChildren();
    preloadImage(gallery[nextIndex].src, 'hero-gallery-photo').then(image => {
      image.alt = '';
      nextLayer.append(image);
      nextLayer.classList.add('is-ready');
      nextReady = true;
      galleryButton.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '点击查看下一张';
    }).catch(() => {
      nextLayer.classList.add('has-image-error');
      galleryButton.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '图片加载失败';
    });
  };

  updateText();
  watchImage(mainImage, mainLayer, queueNext);
  galleryButton.addEventListener('click', () => {
    if (isTransitioning) return;
    if (!nextReady) { nextLabel.textContent = '图片加载中'; return; }
    isTransitioning = true;
    nextLayer.classList.add('is-rising');
    nextLayer.addEventListener('animationend', () => {
      currentIndex = (currentIndex + 1) % gallery.length;
      const promotedImage = nextLayer.querySelector('img');
      promotedImage.alt = gallery[currentIndex].alt;
      mainLayer.replaceChildren(promotedImage);
      mainImage = promotedImage;
      nextLayer.classList.remove('is-rising');
      updateText();
      queueNext();
      isTransitioning = false;
    }, { once: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(); initProductPage(); initWechatModal(); initHeroGallery();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector('[data-menu-toggle]'); const nav = document.querySelector('[data-nav]');
  if (toggle && nav) { toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!expanded)); nav.classList.toggle('open', !expanded); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); })); }
  document.querySelectorAll('[data-filter-mode]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter-mode]').forEach(item => item.classList.toggle('active', item === button)); renderProducts(button.dataset.filterMode); }));
});
