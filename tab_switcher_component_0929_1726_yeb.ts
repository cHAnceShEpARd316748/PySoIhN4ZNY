// 代码生成时间: 2025-09-29 17:26:37
import { Component } from '@angular/core';

/**
 * 标签页切换器组件
 * 用于在Angular应用中实现标签页的切换
 */
@Component({
  selector: 'app-tab-switcher',
  templateUrl: './tab-switcher.component.html',
  styleUrls: ['./tab-switcher.component.css']
})
export class TabSwitcherComponent {
  // 定义标签页数组，包含每个标签页的标题
  tabs: Array<{ title: string }> = [];

  // 当前激活的标签页索引
  activeTabIndex: number = 0;

  constructor() {
    // 初始化标签页
    this.initTabs();
  }

  /**
   * 初始化标签页
   */
  initTabs(): void {
    this.tabs = [
      { title: 'Tab 1' },
      { title: 'Tab 2' },
      { title: 'Tab 3' }
    ];
  }

  /**
   * 切换标签页
   * @param index 要切换到的标签页索引
   */
  switchTab(index: number): void {
    if (index >= 0 && index < this.tabs.length) {
      this.activeTabIndex = index;
    } else {
      // 错误处理：索引超出范围
      console.error('Invalid tab index:', index);
    }
  }
}
