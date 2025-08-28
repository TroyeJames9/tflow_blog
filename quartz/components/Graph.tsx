import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/graph.inline"
import style from "./styles/graph.scss"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

export interface D3Config {
  drag: boolean
  zoom: boolean
  depth: number
  scale: number
  repelForce: number
  centerForce: number
  linkDistance: number
  fontSize: number
  opacityScale: number
  removeTags: string[]
  showTags: boolean
  focusOnHover?: boolean
  enableRadial?: boolean
}

interface GraphOptions {
  localGraph: Partial<D3Config> | undefined
  globalGraph: Partial<D3Config> | undefined
}

const defaultOptions: GraphOptions = {
  localGraph: {
    drag: true,
    zoom: true,
    depth: 1,
    scale: 1.1,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.5,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: false,
    enableRadial: false,
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.2,
    linkDistance: 30,
    fontSize: 0.3,
    opacityScale: 1,
    showTags: true,
    removeTags: [],
    focusOnHover: true,
    enableRadial: true,
  },
}

export default ((opts?: Partial<GraphOptions>) => {
  const Graph: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const localGraph = { ...defaultOptions.localGraph, ...opts?.localGraph }
    const globalGraph = { ...defaultOptions.globalGraph, ...opts?.globalGraph }
    return (
      <div class={classNames(displayClass, "graph")}>
        <h3>{i18n(cfg.locale).components.graph.title}</h3>
        <div class="graph-outer">
          <div class="graph-container" data-cfg={JSON.stringify(localGraph)}></div>
          <button class="local-enlarge-icon" aria-label="Enlarge Local Graph">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 55 55"
              fill="currentColor"
              xmlSpace="preserve"
            >
              <g transform="translate(15.5, 15.5) scale(2)">
                <path d="M7 7h10v10"></path>
                <path d="M7 17 17 7"></path>
              </g>
            </svg>
          </button>
          <button class="global-graph-icon" aria-label="Global Graph">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 55 55"
              fill="currentColor"
              xmlSpace="preserve"
            >
              <path d="M49,27c0-12.1-9.9-22-22-22S5,14.9,5,27s9.9,22,22,22S49,39.1,49,27z M14.8,27c-2.8-1-4.8-3.6-4.8-6.6
              c0-4,3.3-7.3,7.3-7.3c3,0,5.6,1.9,6.6,4.8h21.1c1.8,0,3.3,1.5,3.3,3.3c0,1.8-1.5,3.3-3.3,3.3H42.7c-1.1,2.7-3.7,4.6-6.7,4.6
              c-3,0-5.6-1.8-6.7-4.5H23.8C22.8,32.8,20.3,35,17.3,35c-3.9,0-7-3.1-7-7c0-2.1,0.9-3.9,2.3-5.2V27z M40,27.1c1.8,0,3.3,1.5,3.3,3.3
              c0,1.8-1.5,3.3-3.3,3.3c-1.8,0-3.3-1.5-3.3-3.3C36.7,28.6,38.2,27.1,40,27.1z M17.3,30.4c1.8,0,3.3-1.5,3.3-3.3
              c0-1.8-1.5-3.3-3.3-3.3c-1.8,0-3.3,1.5-3.3,3.3C14,28.9,15.5,30.4,17.3,30.4z"
              />
            </svg>
          </button>
        </div>
        <div class="local-enlarge-outer">
          <div class="local-enlarge-container" data-cfg={JSON.stringify(localGraph)}></div>
        </div>
        <div class="global-graph-outer">
          <div class="global-graph-container" data-cfg={JSON.stringify(globalGraph)}></div>
        </div>
      </div>
    )
  }

  Graph.css = style
  Graph.afterDOMLoaded = script

  return Graph
}) satisfies QuartzComponentConstructor
