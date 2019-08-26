import { Menu, Icon, Button } from 'antd'
import React from 'react'
import WithCacheRoute from "../../../components/CacheRoute";


@WithCacheRoute('finishList')
class FinishList extends React.Component {
  state = {
    collapsed: false,
  };

  render() {
    return (
      <div>
        <input type="text"/>
      </div>
    );
  }
}

export default FinishList
