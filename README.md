# 概览

如果你为公司写过 EDM (将 HTML 嵌入到邮件中的营销邮件)，那么你应该知道，EDM 只支持有限的 HTML 标签和 CSS 样式。为了保证兼容性，你不得不选择 `<table>` 代替 HTML5 的 `flex/grid` 来写布局，另外，你也不应该使用 `margin/padding` 样式。基本上你必须用二十年前的网页开发技术来写 EDM。

邮箱对 HTML 标准的落后支持带来的这种限制感觉像是突然被打断腿还要求你跑 1000 米，所以写 EDM 时会觉得非常抓狂。（我第一封 EDM 用纯 HTML 写了 6 个小时，写得简直快疯了...）

基于以上的情况，我开始想是否有比起直接撸 HTML 更好的方式来写 EDM？我尝试设计一个 React 组件来帮助我更高效地用 `<table>` 做布局。

本仓库的 `<Table />` React 组件就是设计成果，如果你也被写 EDM 折磨着的话，一定要试一下用 `<Table />`，**你可以在这里用上熟悉的 `grid`、`margin`、`padding`。**

# 前置条件

使用本仓库的组件之前，需要你对 **React** 的组件使用有所了解，并确保你的电脑已安装以下工具，

1.  NodeJS
2.  npm 或 yarn

# 如何使用

如果你已经满足以上的前置条件，现在我们可以来看一下如何使用 `<Table />` 组件了。

1.  克隆代码  
    克隆本仓库代码到你的电脑上，并用你喜欢的代码编辑器打开。
2.  安装依赖  
    在代码文件目录下运行以下命令：  
    `npm install` 或 `yarn install`
3.  运行开发服务器  
    安装完依赖后再运行以下命令：  
    `npm dev` 或 `yarn dev`  
    打开浏览器并输入地址 [http://localhost:3000](http://localhost:3000)  
    （Vite 的启动速度真的非常快！）
4.  设置网格布局和布局元素  
     `<Table />` 需要两个属性 `template` 和 `items`, 另外还有一个可选的属性 `debug`。

    - `template`
      - `type: string[]`
      - 布局的模板，参照 CSS 的 `grid-template-area` 而设计的。
    - `items`
      - `type: TableItem[]`
      - 定义 `template` 中布局的 `area` 插入元素及其他属性。
    - `debug`

      - `type: boolean`
      - 开启 debug 模式，显示网格的 border 可以帮助你快速找到出问题的单元格。

        以下的代码会得到一个如下的布局  
        | -----A----- |  
        | ----B--- | C |

    ```
      const template = [
        "a a a",
        "b b c"
      ]

      const items = [{
        area: "a",
        element: "A"
      },
      {
        area: "b",
        element: "B"
      },
      {
        area: "c",
        element: "C"
      }]

      export default function App(){
          return (
            <Table
              template={template}
              items={items} />
          )
      }
    ```

5.  为元素设置 `margin`、`padding`、`style`
    如果你对每个元素的布局还有更细致的要求，可以为他们设定 `margin` 或 `padding`：

    - `margin`
      - `type: number[]`
      - 类似 CSS 的 `margin`，数组的`[mt, mr, mb, ml]`分别代表上右下左方向的间隔大小。
    - `padding`
      - `type: number[]`
      - 类似 `margin`，唯一的不同在于 `padding` 产生的单元格会继承其中心单元格的样式（背景颜色等）。
    - `style`
      - `type: CSSProperties`
      - React 中的 CSS 样式对象，会应用到区域内的元素和 `padding` 上。

    ```
      const items: TableItems[] = [{
        area: "a",
        element: "A",
        margin: [0, 1, 2, 3],
        padding: [0, 1, 2, 3],
        style: {
          fontSize: "10px",
          backgroundColor: "#000"
        }
      }]
    ```

6.  保存代码并插入邮件  
    完成 EDM 的布局后，你只需要将浏览器预览的页面右键保存起来，即可获得需要的 HTML 代码。  
    如果你的 EDM 中还有图片的话，那么你可能还需要重新修改一下图片的路径。
7.  马上动手试试吧！  
    这就是组件的全部使用方法了，如果你是 React 的开发者，这简直没有学习障碍。相反，如果你不是，那可能还需要了解 React 的语法以及 CSS 的样式。  
    你也可以看一下示例中的[黄金矩形的布局代码](./src/examples/GoldenRectangle.tsx)  
    总之，先动手试试吧！

# 工作原理

`<Table />` 的工作原理其实非常简单，主要包括以下两步：

1.  解析模板  
    `Template` 类会将传入 `<Table />` 的 `template` 数组做解析，清理其中重复的行或列，并在需要的位置插入用作 `margin` 或 `padding` 的 `area`，最终再解析每个 `area` 的 `rowSpan` 和 `colSpan`。
    解析模板后能够得到一个二维的数组，数组中的每行对应的则是渲染时表格该行的单元格，此时的元素只有`area`、`rowSpan`、`colSpan`三个属性，有了这个二维数组，接下来渲染模板就非常方便了。
2.  渲染模板  
    渲染实际上是将解析后的模板逐行逐个单元格渲染，但是数组中的三个属性只告诉了每个单元格应该跨的行数和列数，并没有指出单元格中应该渲染什么，怎么办呢？  
    答案是通过传入 `<Table />` 的 `items` 来找到每个 `area` 对应需要插入单元格中的内容。具体实现是通过将 `items` 将表，渲染时通过查表找到对应的 `item` 并将其中的 `element` 插入单元格中，而其他的样式属性则应用到单元格上。  
    至此，一个和预期相同布局的表格就出现在眼前了！

# 相关资料

- [阮一峰老师的 EMD 编写指南](http://www.ruanyifeng.com/blog/2013/06/html_email.html)
- [React 官方入门指南](https://reactjs.org/tutorial/tutorial.html)
- [CSS 网格区域布局](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)
- [\<table\> 标签入门指南](https://developer.mozilla.org/zh-CN/docs/Learn/HTML/Tables/Basics)
- [Vite：体验超好的开发与构建工具](https://cn.vitejs.dev/)
