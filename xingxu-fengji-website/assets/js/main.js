const PRODUCT_IMAGE_SIZES = '(max-width: 650px) calc(100vw - 32px), (max-width: 900px) 44vw, 440px';
const HERO_IMAGE_SIZES = '(max-width: 650px) calc(100vw - 72px), (max-width: 900px) 44vw, 500px';

const products = {
  centrifugal: {
    name: '离心风机',
    scene: '厂房通风 · 除尘送风',
    summary: '适用于需要稳定送、排风的工业通风场景，可作为厂房通风与系统配套设备的产品方向。',
    metaDescription: '查看星旭风机离心风机实拍、适用场景和产品资料状态，并通过电话或微信沟通选型。',
    features: ['适用于厂房、车间等常规通风需求', '可结合实际空间与通风目标进行选型沟通', '具体型号、风量与性能参数待企业资料确认'],
    cardImage: 'assets/images/optimized/cards/centrifugal-card-v2.webp',
    cardWidth: 605,
    cardHeight: 800,
    imageAlt: '星旭风机离心式风机整机实拍',
    gallery: [
      galleryImage('centrifugal', 1, 1080, '星旭风机离心式风机整机实拍'),
      galleryImage('centrifugal', 2, 1080, '星旭风机离心式风机组合设备实拍'),
      galleryImage('centrifugal', 3, 1080, '星旭风机离心式风机进风口近景实拍'),
      galleryImage('centrifugal', 4, 1080, '星旭风机大型离心式风机实拍'),
      galleryImage('centrifugal', 5, 1080, '星旭风机标准离心式风机实拍'),
      galleryImage('centrifugal', 6, 1080, '星旭风机蓝色离心式风机实拍')
    ]
  },
  axial: {
    name: '轴流风机',
    scene: '车间送排风 · 局部通风',
    summary: '适用于空间送排风和局部通风需求，是工业场景中常见的通风设备方向。',
    metaDescription: '查看星旭风机轴流风机实拍、适用场景和产品资料状态，并通过电话或微信沟通选型。',
    features: ['适用于车间、仓储及局部通风场景', '便于围绕实际安装环境沟通产品方向', '具体型号、安装方式与参数待企业资料确认'],
    cardImage: 'assets/images/optimized/cards/axial-card-v2.webp',
    cardWidth: 599,
    cardHeight: 800,
    imageAlt: '星旭风机轴流风机实拍',
    gallery: [
      galleryImage('axial', 1, 1080, '星旭风机轴流风机实拍一'),
      galleryImage('axial', 2, 1080, '星旭风机轴流风机实拍二'),
      galleryImage('axial', 3, 1177, '星旭风机轴流风机实拍三'),
      galleryImage('axial', 4, 1110, '星旭风机轴流风机实拍四'),
      galleryImage('axial', 5, 1242, '星旭风机轴流风机实拍五')
    ]
  },
  smoke: {
    name: '排烟风机',
    scene: '排烟通风 · 应急排风',
    summary: '面向排烟与应急排风等应用场景，具体产品配置需根据实际项目需求确认。',
    metaDescription: '了解星旭风机排烟风机应用方向和当前资料状态，并通过电话或微信沟通具体需求。',
    features: ['适用于排烟、应急排风等使用场景', '可先沟通项目环境与基本通风需求', '实际产品规格与适用条件待企业资料确认']
  },
  dust: {
    name: '除尘风机',
    scene: '除尘净化 · 工艺排风',
    summary: '用于除尘净化及工艺排风等方向，帮助客户从实际生产环境出发了解设备需求。',
    metaDescription: '了解星旭风机除尘风机应用方向和当前资料状态，并通过电话或微信沟通具体需求。',
    features: ['适用于除尘净化及工艺排风方向', '可结合粉尘、管路与空间情况沟通选型', '具体使用条件与性能参数待企业资料确认']
  }
};

const cardsByType = [
  ['centrifugal', '离心风机', '稳定送排风，适配厂房通风与系统配套需求。'],
  ['axial', '轴流风机', '适用于车间送排风与常规局部通风场景。'],
  ['smoke', '排烟风机', '面向排烟与应急排风等应用方向。'],
  ['dust', '除尘风机', '服务于除尘净化与工艺排风需求。']
];

const cardsByScene = [
  ['centrifugal', '厂房通风', '围绕厂房空间与稳定送排风需求选择产品方向。'],
  ['dust', '除尘净化', '针对除尘与工艺排风需求沟通设备方向。'],
  ['smoke', '排烟通风', '用于排烟及应急排风等场景的产品方向。'],
  ['axial', '车间送排风', '服务车间与局部区域的日常通风需求。']
];

function galleryImage(type, index, largeWidth, alt) {
  const folder = `assets/images/optimized/galleries/${type}`;
  const base = `${type}-gallery-${index}`;
  const small = `${folder}/${base}-720-v3.webp`;
  const large = `${folder}/${base}-v2.webp`;
  return { src: small, srcset: `${small} 720w, ${large} ${largeWidth}w`, sizes: PRODUCT_IMAGE_SIZES, alt };
}

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

function createResponsiveImage(item, className, decorative = false) {
  const image = new Image();
  image.className = className;
  image.decoding = 'async';
  image.alt = decorative ? '' : item.alt;
  if (item.srcset) image.srcset = item.srcset;
  if (item.sizes) image.sizes = item.sizes;
  image.src = item.src;
  return image;
}

function preloadImage(item, className) {
  return new Promise((resolve, reject) => {
    const image = createResponsiveImage(item, className, true);
    image.onload = () => { image.classList.add('is-loaded'); resolve(image); };
    image.onerror = reject;
    if (image.complete) (image.naturalWidth ? image.onload() : image.onerror());
  });
}

function renderProducts(mode = 'type') {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;
  const list = mode === 'scene' ? cardsByScene : cardsByType;
  grid.innerHTML = list.map(([key, title, description]) => {
    const product = products[key];
    const visual = product.cardImage
      ? `<div class="card-visual"><img class="card-photo" src="${product.cardImage}" alt="${product.imageAlt}" width="${product.cardWidth}" height="${product.cardHeight}" loading="lazy" decoding="async"><small>${product.name}实拍</small></div>`
      : `<div class="card-visual card-visual-placeholder"><strong>${product.name}</strong><small>实拍资料待补充</small></div>`;
    return `<article class="product-card"><a class="product-card-link" href="product.html?product=${key}" aria-label="查看${title}详情">${visual}<div class="product-card-body"><p>${mode === 'scene' ? '应用场景' : '风机类型'}</p><h3>${title}</h3><span class="line" aria-hidden="true"></span><p class="description">${description}</p><span class="product-card-cta">查看详情 <b aria-hidden="true">→</b></span></div></a></article>`;
  }).join('');
  grid.querySelectorAll('.card-photo').forEach(image => watchImage(image, image.closest('.card-visual')));
}

function setMeta(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute('content', value);
}

function initProductPage() {
  const name = document.querySelector('[data-product-name]');
  if (!name) return;

  const requestedKey = new URLSearchParams(window.location.search).get('product');
  if (requestedKey && !products[requestedKey]) {
    document.querySelectorAll('[data-product-content]').forEach(element => { element.hidden = true; });
    document.querySelector('[data-product-not-found]').hidden = false;
    document.title = '未找到产品｜星旭风机';
    setMeta('meta[name="description"]', '没有找到对应的星旭风机产品分类，请返回产品中心重新选择。');
    setMeta('meta[property="og:title"]', '未找到产品｜星旭风机');
    return;
  }

  const product = products[requestedKey || 'centrifugal'];
  document.title = `${product.name}｜星旭风机`;
  setMeta('meta[name="description"]', product.metaDescription);
  setMeta('meta[property="og:title"]', `${product.name}｜星旭风机`);
  setMeta('meta[property="og:description"]', product.metaDescription);
  document.querySelectorAll('[data-product-name]').forEach(element => { element.textContent = product.name; });
  document.querySelector('[data-product-scene]').textContent = product.scene;
  document.querySelector('[data-product-summary]').textContent = product.summary;
  document.querySelector('[data-product-features]').innerHTML = product.features.map(item => `<li>${item}</li>`).join('');
  document.querySelector('[data-product-photo-status]').textContent = product.gallery ? `已有 ${product.gallery.length} 张实拍` : '实拍资料待补充';

  const imageSlot = document.querySelector('[data-product-image]');
  if (!product.gallery) {
    imageSlot.innerHTML = `<div class="product-empty"><strong>${product.name}</strong><small>实拍资料待补充</small></div>`;
    return;
  }

  const first = product.gallery[0];
  imageSlot.innerHTML = `<button class="product-gallery" type="button" data-product-gallery aria-label="查看下一张${product.name}图片" aria-busy="true"><span class="product-gallery-next" aria-hidden="true"></span><span class="product-gallery-main"><img class="product-photo" src="${first.src}" srcset="${first.srcset}" sizes="${first.sizes}" alt="${first.alt}" fetchpriority="high" decoding="async"></span><span class="gallery-count" aria-hidden="true">1 / ${product.gallery.length}</span><span class="gallery-next" aria-hidden="true"><span data-gallery-next-label>图片加载中</span><b>→</b></span><span class="sr-only" aria-live="polite" data-gallery-live>当前为第 1 张图片，共 ${product.gallery.length} 张</span></button>`;
  initStackGallery({
    button: imageSlot.querySelector('[data-product-gallery]'),
    items: product.gallery,
    mainSelector: '.product-gallery-main',
    nextSelector: '.product-gallery-next',
    imageClass: 'product-photo',
    labelSelector: '[data-gallery-next-label]',
    onIndexChange(index, button) {
      button.querySelector('.gallery-count').textContent = `${index + 1} / ${product.gallery.length}`;
      button.querySelector('[data-gallery-live]').textContent = `当前为第 ${index + 1} 张${product.name}图片，共 ${product.gallery.length} 张`;
      button.setAttribute('aria-label', `查看下一张${product.name}图片，当前第 ${index + 1} 张，共 ${product.gallery.length} 张`);
    }
  });
}

function initStackGallery({ button, items, mainSelector, nextSelector, imageClass, labelSelector, onIndexChange }) {
  if (!button || items.length < 2) return;
  let index = 0;
  let nextReady = false;
  let transitioning = false;
  const mainLayer = button.querySelector(mainSelector);
  const nextLayer = button.querySelector(nextSelector);
  const nextLabel = button.querySelector(labelSelector);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const queueNext = () => {
    const nextIndex = (index + 1) % items.length;
    nextReady = false;
    button.setAttribute('aria-busy', 'true');
    nextLabel.textContent = '图片加载中';
    nextLayer.classList.remove('is-ready', 'is-rising', 'has-image-error');
    nextLayer.replaceChildren();
    preloadImage(items[nextIndex], imageClass).then(image => {
      nextLayer.append(image);
      nextLayer.classList.add('is-ready');
      nextReady = true;
      button.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '点击查看下一张';
    }).catch(() => {
      nextLayer.classList.add('has-image-error');
      button.setAttribute('aria-busy', 'false');
      nextLabel.textContent = '加载失败，点击重试';
    });
  };

  const promote = () => {
    if (transitioning) return;
    if (!nextReady) {
      if (nextLayer.classList.contains('has-image-error')) queueNext();
      else nextLabel.textContent = '图片加载中';
      return;
    }
    transitioning = true;
    let completed = false;
    let fallbackTimer;
    const finish = () => {
      if (completed) return;
      completed = true;
      clearTimeout(fallbackTimer);
      nextLayer.removeEventListener('animationend', finish);
      index = (index + 1) % items.length;
      const promotedImage = nextLayer.querySelector('img');
      promotedImage.alt = items[index].alt;
      mainLayer.replaceChildren(promotedImage);
      nextLayer.classList.remove('is-rising');
      onIndexChange(index, button);
      queueNext();
      transitioning = false;
    };

    if (reduceMotion.matches) {
      finish();
      return;
    }
    nextLayer.classList.add('is-rising');
    nextLayer.addEventListener('animationend', finish, { once: true });
    fallbackTimer = window.setTimeout(finish, 380);
  };

  const currentImage = mainLayer.querySelector('img');
  watchImage(currentImage, mainLayer, queueNext);
  button.addEventListener('click', promote);
}

function initWechatModal() {
  const modal = document.querySelector('[data-wechat-modal]');
  if (!modal) return;
  const panel = modal.querySelector('.modal-panel');
  const qrImage = modal.querySelector('[data-qr-image]');
  const qrFrame = modal.querySelector('[data-qr-frame]');
  const qrStatus = modal.querySelector('[data-qr-status]');
  let trigger = null;
  let qrRequested = false;

  const loadQr = () => {
    if (qrRequested) return;
    qrRequested = true;
    qrStatus.setAttribute('aria-live', 'polite');
    qrImage.addEventListener('load', () => {
      qrImage.classList.add('is-loaded');
      qrFrame.classList.add('is-loaded');
      qrFrame.setAttribute('aria-busy', 'false');
      qrStatus.textContent = '二维码已加载';
    }, { once: true });
    qrImage.addEventListener('error', () => {
      qrFrame.classList.add('has-image-error');
      qrFrame.setAttribute('aria-busy', 'false');
      qrStatus.textContent = '二维码暂时无法加载，请改用电话咨询';
    }, { once: true });
    qrImage.src = qrImage.dataset.src;
  };

  const close = () => {
    if (modal.hidden) return;
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    trigger?.focus();
  };

  const open = event => {
    trigger = event.currentTarget;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    loadQr();
    modal.querySelector('.modal-close').focus();
  };

  document.querySelectorAll('[data-wechat-open]').forEach(button => button.addEventListener('click', open));
  modal.querySelectorAll('[data-wechat-close]').forEach(button => button.addEventListener('click', close));
  modal.addEventListener('keydown', event => {
    if (event.key === 'Escape') { close(); return; }
    if (event.key !== 'Tab') return;
    const focusable = [...panel.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])')].filter(element => !element.disabled);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
}

function initHeroGallery() {
  const button = document.querySelector('[data-hero-gallery]');
  if (!button) return;
  const items = [
    heroImage(1, 1600, '星旭风机门店实景与店铺门头'),
    heroImage(2, 1050, '星旭风机店内设备与货品陈列实拍'),
    heroImage(3, 1050, '星旭风机店内面向门口的设备陈列实拍')
  ];
  initStackGallery({
    button,
    items,
    mainSelector: '.hero-gallery-main',
    nextSelector: '.hero-gallery-next',
    imageClass: 'hero-gallery-photo',
    labelSelector: '[data-hero-gallery-next-label]',
    onIndexChange(index, galleryButton) {
      galleryButton.querySelector('[data-hero-gallery-caption]').textContent = `门店实拍 · ${index + 1} / ${items.length}`;
      galleryButton.querySelector('[data-hero-gallery-live]').textContent = `当前为第 ${index + 1} 张门店实拍，共 ${items.length} 张`;
      galleryButton.setAttribute('aria-label', `查看下一张星旭风机门店实拍，当前第 ${index + 1} 张，共 ${items.length} 张`);
    }
  });
}

function heroImage(index, largeWidth, alt) {
  const folder = 'assets/images/optimized/hero';
  const small = `${folder}/storefront-gallery-${index}-720-v3.webp`;
  const large = `${folder}/storefront-gallery-${index}-v2.webp`;
  return { src: small, srcset: `${small} 720w, ${large} ${largeWidth}w`, sizes: HERO_IMAGE_SIZES, alt };
}

function initMobileNavigation() {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '打开导航');
    nav.classList.remove('open');
  };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? '关闭导航' : '打开导航');
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { close(); toggle.focus(); } });
  window.addEventListener('resize', () => { if (window.innerWidth > 650) close(); });
}

function initProductFilters() {
  document.querySelectorAll('[data-filter-mode]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter-mode]').forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    renderProducts(button.dataset.filterMode);
  }));
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.card-photo').forEach(image => watchImage(image, image.closest('.card-visual')));
  initProductPage();
  initWechatModal();
  initHeroGallery();
  initMobileNavigation();
  initProductFilters();
  document.querySelectorAll('[data-year]').forEach(element => { element.textContent = new Date().getFullYear(); });
});
