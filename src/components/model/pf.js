import {Graph, Node, ObjectExt} from '@antv/x6'
import {createShape} from '@antv/x6/es/shape/basic/util'

export const Machine = createShape('machine', {
  width: 100,
  height: 50,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'line',
      selector: 'line1',
    },
    {
      tagName: 'line',
      selector: 'line2',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      width: 100,
      height: 50,
      fill: '#ffffff',
      stroke: '#0a0a0a',
      strokeWidth: 2
    },
    line1: {
      x1: 10,
      y1: 0,
      x2: 10,
      y2: 50,
      stroke: '#0a0a0a',
      strokeWidth: 2,
    },
    line2: {
      x1: 20,
      y1: 0,
      x2: 20,
      y2: 50,
      stroke: '#0a0a0a',
      strokeWidth: 2,
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      textAnchor: 'start',
      textVerticalAnchor: 'middle',
      refX: '35%',
      refY: '50%'
    },
    propHooks (metadata) {
      const {label, ...others} = metadata
      if (label) {
        ObjectExt.setByPath(others, 'attrs/text/text', label)
      }
      return others
    },
  }
})
export const DesignDomain = createShape('designDomain', {
  width: 100,
  height: 50,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'line',
      selector: 'line',
    },

    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      width: 100,
      height: 50,
      fill: '#ffffff',
      stroke: '#0a0a0a',
      strokeWidth: 2
    },
    line: {
      x1: 10,
      y1: 0,
      x2: 10,
      y2: 50,
      stroke: '#0a0a0a',
      strokeWidth: 2,
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      textAnchor: 'start',
      textVerticalAnchor: 'middle',
      refX: '35%',
      refY: '50%'
    },
    propHooks (metadata) {
      const {label, ...others} = metadata
      if (label) {
        ObjectExt.setByPath(others, 'attrs/text/text', label)
      }
      return others
    },
  }
})
export const Requirement = createShape('requirement', {
  width: 90,
  height: 60,
  markup: [
    {
      tagName: 'ellipse',
      selector: 'ellipse',
    },
    {
      tagName: 'text',
      selector: 'label',
    }],
  attrs: {
    ellipse: {
      rx: 45,
      ry: 30,
      cx: 45,
      cy: 30,
      strokeDasharray: "5,5",
      strokeWidth: 1.5,
      stroke: '#000000',
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      textAnchor: 'middle',
      textVerticalAnchor: 'middle',
    },
  },

  propHooks (metadata) {
    const {label, ...others} = metadata
    if (label) {
      ObjectExt.setByPath(others, 'attrs/text/text', label)
    }
    return others
  },
})
export const GivenDomain = createShape('givenDomain', {
  width: 100,
  height: 50,
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'line',
      selector: 'line1',
    },
    {
      tagName: 'line',
      selector: 'line2',
    },
    {
      tagName: 'text',
      selector: 'label',
    },
  ],
  attrs: {
    body: {
      width: 100,
      height: 50,
      fill: '#ffffff',
      stroke: '#0a0a0a',
      strokeWidth: 2
    },
    line1: {
      x1: 90,
      y1: 40,
      x2: 100,
      y2: 40,
      stroke: '#0a0a0a',
      strokeWidth: 2,
    },
    line2: {
      x1: 90,
      y1: 40,
      x2: 90,
      y2: 50,
      stroke: '#0a0a0a',
      strokeWidth: 2,
    },
    label: {
      fontSize: 10,
      fill: '#000000',
      textAnchor: 'start',
      textVerticalAnchor: 'middle',
      refX: '92%',
      refY: '92%'
    },
    propHooks (metadata) {
      const {label, ...others} = metadata
      if (label) {
        ObjectExt.setByPath(others, 'attrs/text/text', label)
      }
      return others
    },
  }
})
export const Entity = createShape('entity', {
  width: 90,
  height: 60,
  markup: [
    {
      tagName: 'ellipse',
      selector: 'ellipse',
    },
    {
      tagName: 'text',
      selector: 'label',
    }],
  attrs: {
    ellipse: {
      rx: 30,
      ry: 20,
      cx: 30,
      cy: 20,
      strokeWidth: 1.5,
      stroke: '#000000',
    },
    label: {
      fontSize: 14,
      fill: '#333333',
      textAnchor: 'start',
      textVerticalAnchor: 'middle',
      refX: '35%',
      refY: '50%'
    },
  },

  propHooks (metadata) {
    const {label, ...others} = metadata
    if (label) {
      ObjectExt.setByPath(others, 'attrs/text/text', label)
    }
    return others
  },
})

export const pfComponents = {
  machine: {
    name: 'machine',
    type: 'html',
    width: 100,
    height: 80,
    attrs: {
      rect: {fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6},
      text: {text: 'rect', fill: 'white'},
    },
  },
  requirement: {
    width: 70,
    height: 40,
    attrs: {
      rect: {fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6},
      text: {text: 'rect', fill: 'white'},
    },
  },
  design: {
    width: 70,
    height: 40,
    attrs: {
      rect: {fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6},
      text: {text: 'rect', fill: 'white'},
    },
  },
  givenDomain: {
    width: 70,
    height: 40,
    attrs: {
      rect: {fill: '#31D0C6', stroke: '#4B4A67', strokeWidth: 6},
      text: {text: 'rect', fill: 'white'},
    },
  }
}

