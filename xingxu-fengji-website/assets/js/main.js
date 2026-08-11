const products = {
  centrifugal: { name: '离心风机', scene: '厂房通风 · 除尘送风', summary: '适用于需要稳定送、排风的工业通风场景，可作为厂房通风与系统配套设备的展示方向。', features: ['适用于厂房、车间等常规通风需求', '可结合实际空间与通风目标进行选型沟通', '具体型号、风量与性能参数待企业资料确认'] },
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
  grid.innerHTML = list.map(([key, title, desc], index) => `<article class="product-card"><div class="card-visual"><span>${String(index + 1).padStart(2, '0')}</span><small>产品实拍待补充</small></div><div class="product-card-body"><p>${mode === 'scene' ? '应用场景' : '风机类型'}</p><h3>${title}</h3><span class="line"></span><p class="description">${desc}</p><a href="product.html?product=${key}">查看详情 <b>→</b></a></div></article>`).join('');
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

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(); initProductPage(); initWechatModal();
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  const toggle = document.querySelector('[data-menu-toggle]'); const nav = document.querySelector('[data-nav]');
  if (toggle && nav) { toggle.addEventListener('click', () => { const expanded = toggle.getAttribute('aria-expanded') === 'true'; toggle.setAttribute('aria-expanded', String(!expanded)); nav.classList.toggle('open', !expanded); }); nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => { toggle.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); })); }
  document.querySelectorAll('[data-filter-mode]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter-mode]').forEach(item => item.classList.toggle('active', item === button)); renderProducts(button.dataset.filterMode); }));
});
