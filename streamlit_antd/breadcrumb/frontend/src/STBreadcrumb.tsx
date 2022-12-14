import {
  Streamlit,
  StreamlitComponentBase,
  withStreamlitConnection,
} from "streamlit-component-lib"
import React, { ReactNode } from "react"
import { Breadcrumb } from 'antd';
import { v4 as uuidv4 } from 'uuid';


interface Item {
  Label: string
}
interface Event {
  id: string
  payload: Item
}

interface State {
  clickedItem?: Item
}

class STBreadcrumb extends StreamlitComponentBase<State> {

  public render = (): ReactNode => {
    const items = this.props.args.items;
    const that = this;
    return (
      <Breadcrumb>
        {items.map(function(object: Item, i: any){
          return <Breadcrumb.Item>
            {(i !== items.length - 1) ?
              <a href="#" onClick={that.handleClick(object)}>{object.Label}</a>
              : <>{ object.Label }</>
            }
          </Breadcrumb.Item>
        })}
    </Breadcrumb>
    )
  }

  private handleClick(item: Item) {
    const that = this;
    return function() {
      console.log(item)
      const event: Event = {
        id: uuidv4(),
        payload: item
      }
      that.setState(
        prevState => ({ clickedItem: item}),
        () => Streamlit.setComponentValue(event)
      )
    }
  };
}

export default withStreamlitConnection(STBreadcrumb)
