/**
 * 全局动画配置和工具函数
 */

// 动画配置
export const AnimationConfig = {
  // 基础动画时长
  durations: {
    fast: 200,
    medium: 300,
    slow: 500,
    extraSlow: 800
  },
  
  // 缓动函数
  easings: {
    easeOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
  },
  
  // 延迟配置
  delays: {
    short: 100,
    medium: 200,
    long: 300
  }
};

// 动画观察器
export class AnimationObserver {
  constructor(options = {}) {
    this.options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    };
    
    this.observer = new IntersectionObserver(
      this.handleIntersection.bind(this),
      this.options
    );
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const element = entry.target;
        
        // 添加revealed类
        element.classList.add('revealed');
        
        // 触发自定义事件
        element.dispatchEvent(new CustomEvent('animate-in', {
          detail: { element }
        }));
        
        // 停止观察已经动画的元素
        this.observer.unobserve(element);
      }
    });
  }
  
  observe(element) {
    this.observer.observe(element);
  }
  
  disconnect() {
    this.observer.disconnect();
  }
}

// 滚动动画管理器
export class ScrollAnimationManager {
  constructor() {
    this.observer = new AnimationObserver();
    this.init();
  }
  
  init() {
    // 观察所有滚动动画元素
    document.querySelectorAll('.scroll-reveal').forEach(element => {
      this.observer.observe(element);
    });
    
    // 观察所有文本动画元素
    document.querySelectorAll('.text-reveal').forEach(element => {
      this.observer.observe(element);
    });
  }
  
  // 重新初始化（用于页面导航后）
  reinit() {
    this.observer.disconnect();
    this.observer = new AnimationObserver();
    this.init();
  }
}

// 页面加载动画管理器
export class PageLoadAnimationManager {
  constructor() {
    this.loadElements = [];
    this.isAnimating = false;
  }
  
  // 添加加载动画元素
  addElement(element, delay = 0) {
    this.loadElements.push({ element, delay });
  }
  
  // 开始加载动画
  startLoadAnimations() {
    if (this.isAnimating) return;
    
    this.isAnimating = true;
    
    this.loadElements.forEach(({ element, delay }) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, delay);
    });
    
    // 重置状态
    setTimeout(() => {
      this.isAnimating = false;
    }, 1000);
  }
  
  // 重置所有元素
  reset() {
    this.loadElements.forEach(({ element }) => {
      element.classList.remove('visible');
    });
    this.loadElements = [];
  }
}

// 交互动画工具
export class InteractionAnimations {
  // 波纹效果
  static createRipple(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(var(--color-accent), 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s ease-out;
      pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  // 浮动效果
  static addFloatAnimation(element, intensity = 10) {
    const keyframes = [
      { transform: 'translateY(0px)' },
      { transform: `translateY(-${intensity}px)` },
      { transform: 'translateY(0px)' }
    ];
    
    const options = {
      duration: 3000,
      iterations: Infinity,
      easing: 'ease-in-out'
    };
    
    return element.animate(keyframes, options);
  }
  
  // 脉冲效果
  static addPulseAnimation(element) {
    const keyframes = [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' }
    ];
    
    const options = {
      duration: 2000,
      iterations: Infinity,
      easing: 'ease-in-out'
    };
    
    return element.animate(keyframes, options);
  }
}

// 性能优化工具
export class AnimationPerformance {
  // 检测是否支持动画
  static isAnimationSupported() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  // 节流函数
  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // 防抖函数
  static debounce(func, delay) {
    let timeoutId;
    return function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
  }
  
  // 预加载动画
  static preloadAnimations() {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes preload-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      @keyframes preload-fade {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes preload-slide {
        from { transform: translateY(30px); }
        to { transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }
}

// 全局动画初始化
export function initGlobalAnimations() {
  // 预加载动画
  AnimationPerformance.preloadAnimations();
  
  // 检测动画支持
  if (!AnimationPerformance.isAnimationSupported()) {
    document.body.classList.add('no-animations');
    return;
  }
  
  // 初始化滚动动画
  const scrollManager = new ScrollAnimationManager();
  
  // 初始化页面加载动画
  const loadManager = new PageLoadAnimationManager();
  
  // 添加页面加载动画元素
  document.querySelectorAll('.animate-on-load').forEach((element, index) => {
    loadManager.addElement(element, index * 100);
  });
  
  // 开始加载动画
  loadManager.startLoadAnimations();
  
  // 添加交互动画
  document.querySelectorAll('.btn-animate').forEach(button => {
    button.addEventListener('click', (e) => {
      InteractionAnimations.createRipple(button, e);
    });
  });
  
  // 添加浮动动画
  document.querySelectorAll('.animate-float').forEach(element => {
    InteractionAnimations.addFloatAnimation(element);
  });
  
  // 添加脉冲动画
  document.querySelectorAll('.animate-pulse').forEach(element => {
    InteractionAnimations.addPulseAnimation(element);
  });
  
  // 导航切换时重新初始化
  document.addEventListener('astro:after-swap', () => {
    scrollManager.reinit();
    loadManager.reset();
  });
  
  // 暴露到全局
  window.AnimationManager = {
    scroll: scrollManager,
    load: loadManager,
    interactions: InteractionAnimations,
    performance: AnimationPerformance
  };
}

// 自动初始化
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalAnimations);
  } else {
    initGlobalAnimations();
  }
}